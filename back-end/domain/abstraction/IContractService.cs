using domain.entities;

namespace domain.abstraction
{
    public interface IContractService
    {
        Task Create(entities.Contract contract);
        IAsyncEnumerable<entities.Contract> GetAll();
        Task<entities.Contract> GetByIdAsync(int id);
    }
}
