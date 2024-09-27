namespace DunderMifflinPaperworkBackend.DTOs;

public record PostOrderDTO(DateTime OrderDate, DateTime? DeliveryDate, string Status, double TotalAmount, int CustomerId);