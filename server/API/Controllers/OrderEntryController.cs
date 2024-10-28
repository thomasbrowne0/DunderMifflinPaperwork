using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderEntryController(DunderMifflinContext context) : ControllerBase
{
    // Create a new OrderEntry
    [HttpPost]
    public async Task<ActionResult<OrderEntry>> CreateOrderEntry(OrderEntry orderEntry)
    {
        context.OrderEntries.Add(orderEntry);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrderEntry), new { id = orderEntry.Id }, orderEntry);
    }

    // Get OrderEntry by ID
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderEntry>> GetOrderEntry(int id)
    {
        var orderEntry = await context.OrderEntries.FindAsync(id);

        if (orderEntry == null)
        {
            return NotFound();
        }

        return orderEntry;
    }
}