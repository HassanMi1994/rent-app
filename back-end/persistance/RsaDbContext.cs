using domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using persistance.configurations;
using Rent.Entities;

namespace persistance
{
    public class RsaDbContext : DbContext
    {
        public RsaDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Store> Stores { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Stuff> Stuffs { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<ContractItem> ContractItems { get; set; }
        public DbSet<History> Histories { get; set; }
        public DbSet<UserConfig> UserConfigs { get; set; }
        public DbSet<User> Users { get; set; }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {

            var entries = ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entityEntry in entries)
            {
                if (entityEntry.State == EntityState.Modified)
                    if (entityEntry.GetType().GetProperty(nameof(IBaseEntity.UpdatedAt)) != null)
                        entityEntry.Property(nameof(IBaseEntity.UpdatedAt)).CurrentValue = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                    if (entityEntry.GetType().GetProperty(nameof(IBaseEntity.CreatedAt)) != null)
                        entityEntry.Property(nameof(IBaseEntity.CreatedAt)).CurrentValue = DateTime.UtcNow;

            }
            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new HistoryConfiguration());
            modelBuilder.ApplyConfiguration(new ContractItemConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfigConfiguration());
            modelBuilder.ApplyConfiguration(new StoreConfiguration());
        }
    }
}
