using System.ComponentModel.DataAnnotations;

namespace DunderMifflinPaperwork.Models;

public class OrderEntry
{
    public int Id { get; set; }
    
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }

    public int ProductId { get; set; }
    public Paper Product { get; set; }

    public int OrderId { get; set; }
    public Order Order { get; set; }
}
