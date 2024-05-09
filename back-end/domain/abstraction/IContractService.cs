using domain.entities;

namespace domain.abstraction
{
    public interface IContractService
    {
        Task AddPaymentAsync(long contractID, Payment addPyamentDto);
        Task Create(entities.Contract contract);
        IAsyncEnumerable<entities.Contract> GetAll();
        Task<entities.Contract> GetByIdAsync(int id);
        Task<Contract> ReturnOneItem(long contractID, ReturnedItem returnedItem);
    }
}
