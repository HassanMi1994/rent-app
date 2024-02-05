using domain.abstraction;
using domain.entities;
using persistance;

namespace application.Services
{
    public class ContractService : IContractService
    {
        RentDbContext _rentDb;

        public ContractService(RentDbContext rentDb)
        {
            _rentDb = rentDb;
        }

        public async Task Create(Contract contract)
        {
            _rentDb.Add(contract);
            await _rentDb.SaveChangesAsync();
        }

        public IAsyncEnumerable<Contract> GetAll()
        {
            return _rentDb.Contracts.AsAsyncEnumerable();
        }
    }
}
