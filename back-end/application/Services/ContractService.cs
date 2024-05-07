using domain.abstraction;
using domain.entities;
using Microsoft.EntityFrameworkCore;
using persistance;

namespace application.Services
{
    public class ContractService : IContractService
    {
        persistance.RsaDbContext _rentDb;

        public ContractService()
        {
        }

        public ContractService(persistance.RsaDbContext rentDb)
        {
            _rentDb = rentDb;
        }

        public async Task AddPaymentAsync(long contractID, Payment addPyamentDto)
        {
            var contract = _rentDb.Contracts.Include(x => x.Payments)
                                .Where(x => x.ID == contractID).FirstOrDefault();

            contract.AddPyament(addPyamentDto);
            await _rentDb.SaveChangesAsync();
        }

        public async Task Create(domain.entities.Contract contract)
        {
            _rentDb.Add(contract);
            await _rentDb.SaveChangesAsync();
        }

        public IAsyncEnumerable<domain.entities.Contract> GetAll()
        {
            return _rentDb.Contracts.Include(x => x.Customer).Include(x => x.Payments)
                .OrderByDescending(x => x.CreatedAt).AsAsyncEnumerable();
        }

        public async Task<domain.entities.Contract> GetByIdAsync(int id)
        {
            return await _rentDb
                .Contracts
                .Include(x => x.Customer)
                .Include(x => x.Payments)
                .Include(x => x.Items)
                    .ThenInclude(x => x.Stuff)
                .FirstOrDefaultAsync(x => x.ID == id);
        }

    }
}
