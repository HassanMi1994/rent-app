using domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace persistance.configurations
{
    public class ContractConfiguration : IEntityTypeConfiguration<Contract>
    {
        public void Configure(EntityTypeBuilder<Contract> builder)
        {
            builder.HasKey(x => x.ID);

            builder.HasOne(x => x.CreatedBy)
                 .WithMany()
                 .HasForeignKey(x => x.CreatedByID)
                 .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.UpdatedBy)
                 .WithMany()
                 .HasForeignKey(x => x.UpdatedByID)
                 .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
