using domain.abstraction;
using domain.entities;
using persistance;

namespace application.Services
{
    public class StuffService : IStuffService
    {
        private readonly RentDbContext rentDbContext;

        public StuffService(RentDbContext rentDbContext)
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
            return rentDbContext.Stuffs.AsAsyncEnumerable();
        }
    }
}
