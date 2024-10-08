namespace Services.TransferModels.Response;

    public class GetCustomerOrdersDTO
    {
        public DateTime OrderDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public string Status { get; set; } = null!;
        public double TotalAmount { get; set; }
    }