using domain.abstraction;
using domain.entities;
using Microsoft.EntityFrameworkCore;
using persistance;

namespace application.Services
{
    public class StuffService : IStuffService
    {
        private readonly RsaDbContext rentDbContext;
        private readonly IUserService _userService;

        public StuffService(RsaDbContext rentDbContext, IUserService userService)
        {
            this.rentDbContext = rentDbContext;
            _userService = userService;
        }

        public async Task Create(Stuff stuff)
        {
            stuff.StoreID = _userService.StoreID;
            rentDbContext.Stuffs.Add(stuff);
            await rentDbContext.SaveChangesAsync();
        }

        public IAsyncEnumerable<Stuff> GetAll()
        {
            return rentDbContext.Stuffs
                .Where(x => x.StoreID == _userService.StoreID)
                .OrderByDescending(x => x.CreatedAt)
                .AsAsyncEnumerable();
        }
    }
}
