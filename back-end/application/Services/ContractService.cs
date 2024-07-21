using domain.abstraction;
using domain.entities;
using domain.enums;
using domain.Exceptions;
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

        public async Task<Contract> AddPaymentAsync(long contractID, Payment addPyamentDto)
        {
            var contract = _rentDb.Contracts.LoadWithAllChildrens()
                                .Where(x => x.ID == contractID).FirstOrDefault();

            contract.AddPyament(addPyamentDto);
            await _rentDb.SaveChangesAsync();
            return contract;
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

        public async Task<Contract?> GetByIdAsync(int id)
        {
            return await _rentDb
                .Contracts
                .Include(x => x.Customer)
                .Include(x => x.Payments)
                .Include(x => x.Items)
                    .ThenInclude(x => x.Stuff)
                .Include(x => x.Items)
                    .ThenInclude(x => x.ReturnedItems)
                .FirstOrDefaultAsync(x => x.ID == id);
        }

        public async Task<Contract> ReturnOneItem(long contractID, ReturnedItem returnedItem)
        {
            var contract = await _rentDb.Contracts
                .LoadWithAllChildrens()
                .FirstOrDefaultAsync(x => x.ID == contractID);

            if (contract == null)
                throw new ExceptionBase(ExceptionCodes.ItemNotFound);

            contract.ReturnPartialItem(returnedItem);

            await _rentDb.SaveChangesAsync();
            return contract;
        }

        public async Task<Contract> ChangeStatus(long contractID, ContractStatus contractStatus)
        {
            var contract = await _rentDb.Contracts
                    .LoadWithAllChildrens()
                    .FirstOrDefaultAsync(x => x.ID == contractID);

            if (contract == null)
                throw new ExceptionBase(ExceptionCodes.ItemNotFound);

            contract.ChangeStatus(contractStatus);

            await _rentDb.SaveChangesAsync();
            return contract;
        }

    }

    public static class ContractExtentions
    {
        public static IQueryable<Contract> LoadWithAllChildrens(this IQueryable<Contract> query)
        {
            return query.Include(x => x.Customer)
                    .Include(x => x.Payments)
                    .Include(x => x.Items)
                        .ThenInclude(x => x.Stuff)
                    .Include(x => x.Items)
                        .ThenInclude(x => x.ReturnedItems);

        }
    }
}
