using Microsoft.EntityFrameworkCore;
using Rent.Entities;

namespace persistance
{
    public class RentDbContext : DbContext
    {
        public RentDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
