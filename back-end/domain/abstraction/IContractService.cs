using domain.entities;
using domain.enums;

namespace domain.abstraction
{
    public interface IContractService
    {
        Task<Contract> AddPaymentAsync(long contractID, Payment addPyamentDto);
        Task<Contract> ChangeStatus(long contractID, ContractStatus contractStatus);
        Task<Contract> Create(entities.Contract contract);
        IAsyncEnumerable<entities.Contract> GetAll();
        Task<entities.Contract> GetByIdAsync(int id);
        Task<Contract> ReturnOneItem(long contractID, ReturnedItem returnedItem);
    }
}
