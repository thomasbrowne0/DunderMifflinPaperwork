namespace Services.TransferModels.Requests
{
    public class UpdatePaperRequest
    {
        public bool Discontinued { get; set; }
        public int Stock { get; set; }
    }
}