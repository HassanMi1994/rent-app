using domain.abstraction;
using Microsoft.EntityFrameworkCore;
using persistance;
using Rent.Entities;

namespace application.Services
{
    public class CustomerService : ICustomerService
    {
        persistance.RsaDbContext _rentDb;
        private readonly IUserService _userService;

        public CustomerService(persistance.RsaDbContext rentDb, IUserService userService)
        {
            _rentDb = rentDb;
            _userService = userService;
        }

        public async Task<List<Customer>> GetAll()
        {
            return await _rentDb.Customers
                .Where(x => x.StoreID == _userService.StoreID)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task Create(Customer customer)
        {
            customer.StoreID = _userService.StoreID;
            _rentDb.Customers.Add(customer);
            await _rentDb.SaveChangesAsync();
        }

        public async Task Update(Customer customer)
        {
            customer.StoreID = _userService.StoreID;
            var found = await _rentDb.Customers.Where(x => x.ID == customer.ID).FirstOrDefaultAsync();
            if (found is null)
            {
                throw new NullReferenceException();
            }

            found.Update(customer);
            await _rentDb.SaveChangesAsync();

        }
    }
}
