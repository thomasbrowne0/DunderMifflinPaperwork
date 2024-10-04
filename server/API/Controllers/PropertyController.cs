using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class PropertyController(DunderMifflinContext context) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Property>> CreateProperty(Property property)
    {
        context.Properties.Add(property);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProperty), new { id = property.Id }, property);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Property>> GetProperty(int id)
    {
        var property = await context.Properties.FindAsync(id);
        if (property == null)
        {
            return NotFound();
        }
        return property;
    }
}