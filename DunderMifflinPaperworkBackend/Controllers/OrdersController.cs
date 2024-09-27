﻿using DunderMifflinPaperworkBackend.Data;
using DunderMifflinPaperworkBackend.DTOs;
using DunderMifflinPaperworkBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DunderMifflinPaperworkBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrdersController(ApplicationDbContext context)
    {
        _context = context;
        _context.Database.EnsureCreated();
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        return await _context.Orders.Include(o => o.OrderEntries).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(PostOrderDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Validate stock availability and other business rules here

        var order = new Order
        {
            OrderDate = dto.OrderDate,
            DeliveryDate = dto.DeliveryDate,
            Status = dto.Status,
            TotalAmount = dto.TotalAmount,
            CustomerId = dto.CustomerId
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, Order order)
    {
        if (id != order.Id)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Validate stock availability and other business rules here

        _context.Entry(order).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Orders.Any(e => e.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }
}