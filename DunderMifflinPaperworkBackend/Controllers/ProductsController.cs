using DunderMifflinPaperworkBackend.Data;
using DunderMifflinPaperworkBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DunderMifflinPaperworkBackend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Paper>>> GetProducts()
    {
        return await _context.Papers.ToListAsync();
    }
}