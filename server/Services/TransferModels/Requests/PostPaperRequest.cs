namespace Services.TransferModels.Requests;

public record PostPaperRequest(string Name, bool Discontinued, int Stock, double Price, string? PropertyName);