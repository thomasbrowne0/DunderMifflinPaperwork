using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class PaperController(DunderMifflinContext context) : ControllerBase
{
    // Get all Papers
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Paper>>> GetPapers()
    {
        return await context.Papers.ToListAsync();
    }
    
    
    // Get Paper by ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Paper>> GetPaper(int id)
    {
        var paper = await context.Papers.FindAsync(id);

        if (paper == null)
        {
            return NotFound();
        }

        return paper;
    }
    
    
    // Create a new Paper
    [HttpPost]
    public async Task<ActionResult<Paper>> CreatePaper(Paper paper)
    {
        context.Papers.Add(paper);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPaper), new { id = paper.Id }, paper);
    }
    
    // Update Paper status
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdatePaperStatus(int id)
    {
        var paper = await context.Papers.FindAsync(id);

        if (paper == null)
        {
            return NotFound();
        }

        paper.Discontinued = !paper.Discontinued;
        await context.SaveChangesAsync();

        return NoContent();
    }
    
    
    // Add a stock to a Paper
    [HttpPut("{id}/addstock")]
    public async Task<IActionResult> AddStock(int id, [FromQuery] int stock)
    {
        var paper = await context.Papers.FindAsync(id);

        if (paper == null)
        {
            return NotFound();
        }

        paper.Stock += stock;
        await context.SaveChangesAsync();

        return NoContent();
    }
}