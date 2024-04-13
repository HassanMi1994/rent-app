using domain.abstraction;
using domain.entities;
using Microsoft.EntityFrameworkCore;
using persistance;

namespace application.Services
{
    public class StuffService : IStuffService
    {
        private readonly persistance.RsaDbContext rentDbContext;

        public StuffService(persistance.RsaDbContext rentDbContext)
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
