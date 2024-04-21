using domain.abstraction;
using domain.entities;
using Microsoft.EntityFrameworkCore;
using persistance;

namespace application.Services
{
    public class StuffService : IStuffService
    {
        private readonly RsaDbContext rentDbContext;

        public StuffService(RsaDbContext rentDbContext)
        {
            this.rentDbContext = rentDbContext;
        }

        public async Task Create(Stuff customer)
        {
            rentDbContext.Stuffs.Add(customer);
            await rentDbContext.SaveChangesAsync();
        }

        public IAsyncEnumerable<Stuff> GetAll()
        {
            return rentDbContext.Stuffs.OrderByDescending(x => x.CreatedAt).AsAsyncEnumerable();
        }
    }
}
