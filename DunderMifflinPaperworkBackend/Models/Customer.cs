using System.ComponentModel.DataAnnotations;

namespace DunderMifflinPaperworkBackend.Models;

public class Customer
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }
    
    public string Address { get; set; }
    
    [Phone]
    public string Phone { get; set; }
    
    [EmailAddress]
    public string Email { get; set; }
    

    public ICollection<Order> Orders { get; set; }
}
