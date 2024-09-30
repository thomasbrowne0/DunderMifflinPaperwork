using DunderMifflinPaperworkBackend.DTOs;
using DunderMifflinPaperworkBackend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using DunderMifflinPaperworkBackend.Data;

namespace DunderMifflinPaperworkBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private static List<Customer> customers = new List<Customer>();
        private static int nextId = 1;
        
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
            //_context.Database.EnsureCreated();
        }

        [HttpGet()]
        public ActionResult<IEnumerable<Customer>> GetCustomers()
        {
            var allcustomers = _context.Customers.ToList();
            return Ok(allcustomers);
        }

        [HttpGet("{id}")]
        public ActionResult<Customer> GetCustomer(int id)
        {
            var customer = customers.FirstOrDefault(c => c.Id == id);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        [HttpPost]
        public ActionResult<Customer> CreateCustomer(PostCustomerDTO createCustomerDTO)
        {
            var customer = new Customer
            {
                Id = nextId++,
                Name = createCustomerDTO.Name,
                Address = createCustomerDTO.Address,
                Phone = createCustomerDTO.Phone,
                Email = createCustomerDTO.Email
            };
            // customers.Add(customer);
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateCustomer(int id, PostCustomerDTO updateCustomerDTO)
        {
            var customer = customers.FirstOrDefault(c => c.Id == id);
            if (customer == null)
            {
                return NotFound();
            }
            customer.Name = updateCustomerDTO.Name;
            customer.Address = updateCustomerDTO.Address;
            customer.Phone = updateCustomerDTO.Phone;
            customer.Email = updateCustomerDTO.Email;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteCustomer(int id)
        {
            var customer = customers.FirstOrDefault(c => c.Id == id);
            if (customer == null)
            {
                return NotFound();
            }
            customers.Remove(customer);
            return NoContent();
        }
    }
}