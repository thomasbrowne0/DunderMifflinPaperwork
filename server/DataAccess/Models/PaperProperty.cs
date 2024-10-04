﻿namespace DataAccess.Models;

public class PaperProperty
{
    public int PaperId { get; set; }
    public Paper Paper { get; set; } = null!;
    
    public int PropertyId { get; set; }
    public Property Property { get; set; } = null!;
}