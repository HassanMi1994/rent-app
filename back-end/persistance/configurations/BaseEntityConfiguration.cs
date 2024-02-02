using domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace persistance.configurations
{
    internal class BaseEntityConfiguration : IEntityTypeConfiguration<IBaseEntity>
    {
        public void Configure(EntityTypeBuilder<IBaseEntity> builder)
        {
            builder.HasNoKey();
        }
    }
}
