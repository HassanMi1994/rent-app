using domain.abstraction;
using persistance;
using Rent.Entities;

namespace application.Services
{
    public class CustomerService : ICustomerService
    {
        RentDbContext _rentDb;

        public CustomerService(RentDbContext rentDb)
        {
            _rentDb = rentDb;
        }

        public async Task Create(Customer customer)
        {

            _rentDb.Customers.Add(customer);
            await _rentDb.SaveChangesAsync();
        }
    }
}
