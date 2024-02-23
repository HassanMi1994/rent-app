using domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace persistance.configurations
{
    public class HistoryConfiguration : IEntityTypeConfiguration<ContractItem>
    {
        public void Configure(EntityTypeBuilder<ContractItem> builder)
        {
            builder.HasIndex(x => x.Aggregate);
        }
    }
}
