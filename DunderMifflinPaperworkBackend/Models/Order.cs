using System.ComponentModel.DataAnnotations;

namespace DunderMifflinPaperworkBackend.Models;

public class Order
{
    public int Id { get; set; }
    
    [Required]
    public DateTime OrderDate { get; set; }
    
    public DateTime? DeliveryDate { get; set; }
    
    [Required]
    public string Status { get; set; }
    
    [Range(0, double.MaxValue)]
    public double TotalAmount { get; set; }
    
    
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public ICollection<OrderEntry> OrderEntries { get; set; }
}
