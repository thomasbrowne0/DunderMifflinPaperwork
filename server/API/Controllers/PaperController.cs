using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.TransferModels.Requests;

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
    public async Task<ActionResult<Paper>> CreatePaper(PostPaperRequest request)
    {
        // Map paper
        var paper = new Paper
        {
            Name = request.Name,
            Discontinued = request.Discontinued,
            Stock = request.Stock,
            Price = request.Price
        };
        
        context.Papers.Add(paper);
        await context.SaveChangesAsync();

        // Check if PropertyName is provided
        if (!string.IsNullOrEmpty(request.PropertyName))
        {
            // Create the Property
            var property = new Property { PropertyName = request.PropertyName };
            context.Properties.Add(property);
            await context.SaveChangesAsync();
        }

        // context.PaperProperties.Add(new PaperProperty { PaperId = paper.Id, PropertyId = property.Id });


        //TODO: Maybe return back properties in the Response object as well as the paper
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
    
    // [HttpPost]
    // public async Task<ActionResult<Paper>> CreatePaper(Paper paper, [FromQuery] string propertyName)
    // {
    //     context.Papers.Add(paper);
    //     await context.SaveChangesAsync();
    //
    //     if (!string.IsNullOrEmpty(propertyName))
    //     {
    //         var property = new Property { PropertyName = propertyName };
    //         context.Properties.Add(property);
    //         await context.SaveChangesAsync();
    //
    //         var paperProperty = new PaperProperty { PaperId = paper.Id, PropertyId = property.Id };
    //         context.PaperProperties.Add(paperProperty);
    //         await context.SaveChangesAsync();
    //     }
    //
    //     return CreatedAtAction(nameof(GetPaper), new { id = paper.Id }, paper);
    // }
    
    
}