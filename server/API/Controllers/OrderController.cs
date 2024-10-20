using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.TransferModels.Response;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController(DunderMifflinContext context) : ControllerBase
{
    // Get all Orders
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        return await context.Orders.ToListAsync();
    }
    
    // Get Order by ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await context.Orders.FindAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        return order;
    }
    
    // Create a new Order with multiple OrderEntries
    // [HttpPost]
    // public async Task<ActionResult<Order>> CreateOrder(Order order)
    // {
    //     context.Orders.Add(order);
    //     await context.SaveChangesAsync();
    //
    //     return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    // }
    
    // View Order history of a Customer
    [HttpGet("customer/{id}")]
    public async Task<ActionResult<IEnumerable<GetCustomerOrdersDTO>>> GetCustomerOrders(int id)
    {
        var customer = await context.Customers.FindAsync(id);

        if (customer == null)
        {
            return NotFound();
        }

        var orders = await context.Orders
            .Where(o => o.CustomerId == id)
            .Select(o => new GetCustomerOrdersDTO
            {
                OrderDate = o.OrderDate, // Assuming OrderDate is already DateTime
                DeliveryDate = o.DeliveryDate.HasValue ? o.DeliveryDate.Value.ToDateTime(TimeOnly.MinValue) : (DateTime?)null,
                Status = o.Status,
                TotalAmount = o.TotalAmount
            })
            .ToListAsync();

        return orders;
    }
    
    [HttpGet("history")]
    public async Task<ActionResult<IEnumerable<GetCustomerOrdersDTO>>> GetOrderHistory()
    {
        try
        {
            var orders = await context.Orders
                .Include(o => o.Customer)
                .Select(o => new GetCustomerOrdersDTO
                {
                    OrderDate = o.OrderDate,
                    DeliveryDate = o.DeliveryDate.HasValue ? o.DeliveryDate.Value.ToDateTime(TimeOnly.MinValue) : (DateTime?)null,
                    Status = o.Status,
                    TotalAmount = o.TotalAmount
                })
                .ToListAsync();

            return Ok(orders);
        }
        catch (Exception ex)
        {
            // Log the exception (you can use a logging framework)
            Console.Error.WriteLine($"Error fetching order history: {ex.Message}");

            // Return a 500 Internal Server Error with a meaningful message
            return StatusCode(500, "An error occurred while fetching the order history.");
        }
    }
    
    // Update Order status
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int id)
    {
        var order = await context.Orders.FindAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        order.Status = order.Status == "pending" ? "completed" : "pending";
        await context.SaveChangesAsync();

        return NoContent();
    }
}