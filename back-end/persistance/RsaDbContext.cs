using domain.entities;
using Microsoft.EntityFrameworkCore;
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
        public DbSet<ReturnedItem> ReturnedItems { get; set; }
        public DbSet<History> Histories { get; set; }
        public DbSet<UserConfig> UserConfigs { get; set; }
        public DbSet<User> Users { get; set; }


        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entity in entries)
            {
                if (entity.State == EntityState.Modified)
                    if (entity.Properties.Where(x => x.Metadata.Name == nameof(IBaseEntity.UpdatedAt)).Count() == 1)
                        entity.Property(nameof(IBaseEntity.UpdatedAt)).CurrentValue = DateTime.Now;

                if (entity.State == EntityState.Added)
                    if (entity.Properties.Where(x => x.Metadata.Name == nameof(IBaseEntity.CreatedAt)).Count() == 1)
                        entity.Property(nameof(IBaseEntity.CreatedAt)).CurrentValue = DateTime.Now;
            }

            int count = await base.SaveChangesAsync(cancellationToken);
            return count;
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
