using domain.abstraction;
using Microsoft.EntityFrameworkCore;
using persistance;
using Rent.Entities;

namespace application.Services
{
    public class CustomerService : ICustomerService
    {
        persistance.RsaDbContext _rentDb;

        public CustomerService(persistance.RsaDbContext rentDb)
        {
            _rentDb = rentDb;
        }

        public IAsyncEnumerable<Customer> GetAll()
        {
            return _rentDb.Customers.OrderByDescending(x => x.CreatedAt).AsAsyncEnumerable();
        }

        public async Task Create(Customer customer)
        {
            _rentDb.Customers.Add(customer);
            await _rentDb.SaveChangesAsync();
        }
    }
}
