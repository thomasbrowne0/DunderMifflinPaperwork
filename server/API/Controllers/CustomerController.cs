using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

    [ApiController]
    [Route("[controller]")]
    public class CustomerController(DunderMifflinContext context) : ControllerBase
    {
        // Get all Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await context.Customers.ToListAsync();
        }

    }