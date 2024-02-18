using domain.abstraction;
using domain.entities;
using Microsoft.EntityFrameworkCore;
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
            return _rentDb.Contracts.Include(x => x.Customer).OrderByDescending(x => x.CreatedAt).AsAsyncEnumerable();
        }

        public async Task<Contract> GetByIdAsync(int id)
        {
            return await _rentDb
                .Contracts
                .Include(x => x.Customer)
                .Include(x => x.Items)
                    .ThenInclude(x => x.Stuff)
                .FirstOrDefaultAsync(x => x.ID == id);
        }

    }
}
