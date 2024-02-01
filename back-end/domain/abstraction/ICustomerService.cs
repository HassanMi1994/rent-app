using Rent.Entities;

namespace domain.abstraction
{
    public interface ICustomerService
    {
        Task Create(Customer customer);
        IAsyncEnumerable<Customer> GetAll();
    }
}
