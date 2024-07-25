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

        public IAsyncEnumerable<Customer> GetAll()
        {
            return _rentDb.Customers
                .Where(x => x.StoreID == _userService.StoreID)
                .OrderByDescending(x => x.CreatedAt)
                .AsAsyncEnumerable();
        }

        public async Task Create(Customer customer)
        {
            customer.StoreID = _userService.StoreID;
            _rentDb.Customers.Add(customer);
            await _rentDb.SaveChangesAsync();
        }
    }
}
