using domain.entities;
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
        public DbSet<Stuff> Stuffs { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<ContractItem> RentedStuffs { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {

            var entries = ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entityEntry in entries)
            {

                if (entityEntry.State == EntityState.Modified)
                    if (entityEntry.Property(nameof(IBaseEntity.UpdatedAt)) is not null)
                        entityEntry.Property(nameof(IBaseEntity.UpdatedAt)).CurrentValue = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                    if (entityEntry.Property(nameof(IBaseEntity.CreatedAt)) is not null)
                        entityEntry.Property(nameof(IBaseEntity.CreatedAt)).CurrentValue = DateTime.UtcNow;

            }
            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.ApplyConfiguration(new BaseEntityConfiguration());
        }


    }
}
