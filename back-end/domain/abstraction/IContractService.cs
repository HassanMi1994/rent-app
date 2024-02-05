using domain.entities;

namespace domain.abstraction
{
    public interface IContractService
    {
        Task Create(Contract customer);
        IAsyncEnumerable<Contract> GetAll();
    }
}
