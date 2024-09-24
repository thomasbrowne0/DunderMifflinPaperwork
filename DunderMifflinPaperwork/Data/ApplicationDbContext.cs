using DunderMifflinPaperwork.Models;
using Microsoft.EntityFrameworkCore;

namespace DunderMifflinPaperwork.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderEntry> OrderEntries { get; set; }
    public DbSet<Paper> Papers { get; set; }
    public DbSet<PaperProperty> PaperProperties { get; set; }
    public DbSet<Property> Properties { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Setup composite keys for PaperProperties
        modelBuilder.Entity<PaperProperty>()
            .HasKey(pp => new { pp.PaperId, pp.PropertyId });

        // Configure relationships
        modelBuilder.Entity<Order>()
            .HasOne(o => o.Customer)
            .WithMany(c => c.Orders)
            .HasForeignKey(o => o.CustomerId);

        modelBuilder.Entity<OrderEntry>()
            .HasOne(oe => oe.Product)
            .WithMany()
            .HasForeignKey(oe => oe.ProductId);

        modelBuilder.Entity<OrderEntry>()
            .HasOne(oe => oe.Order)
            .WithMany(o => o.OrderEntries)
            .HasForeignKey(oe => oe.OrderId);
    }
}
