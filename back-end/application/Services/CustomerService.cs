using domain.abstraction;
using Rent.Entities;

namespace application.Services
{
    public class CustomerService : ICustomerService
    {
        public Task Create(Customer customer)
        {
            return Task.CompletedTask;
        }
    }
}
