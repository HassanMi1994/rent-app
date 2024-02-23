using domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace persistance.configurations
{
    public class ContractItemConfiguration : IEntityTypeConfiguration<ContractItem>
    {
        public void Configure(EntityTypeBuilder<ContractItem> builder)
        {
            builder.HasIndex(c => c.Aggregate);
        }
    }
}
