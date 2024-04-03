using domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace persistance.configurations
{
    internal class UserConfigConfiguration : IEntityTypeConfiguration<UserConfig>
    {
        public void Configure(EntityTypeBuilder<UserConfig> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
