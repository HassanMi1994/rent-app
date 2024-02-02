using domain.entities;
using Microsoft.EntityFrameworkCore;
using persistance.configurations;
using Rent.Entities;

namespace persistance
{
    public class RentDbContext : DbContext
    {
        public RentDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Stuff> Stuffs { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {

            var entries = ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entityEntry in entries)
            {
                if (entityEntry.State == EntityState.Modified)
                    entityEntry.Property(nameof(IBaseEntity.UpdatedAt)).CurrentValue = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                    entityEntry.Property(nameof(IBaseEntity.UpdatedAt)).CurrentValue = DateTime.UtcNow;

            }
            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.ApplyConfiguration(new BaseEntityConfiguration());
        }


    }
}
