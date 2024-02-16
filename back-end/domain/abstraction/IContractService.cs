using domain.entities;

namespace domain.abstraction
{
    public interface IContractService
    {
        Task Create(Contract contract);
        IAsyncEnumerable<Contract> GetAll();
    }
}
