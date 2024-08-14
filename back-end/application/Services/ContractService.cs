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
        private readonly IUserService _userService;
        private readonly IUserConfigService _userConfigService;

        public ContractService(RsaDbContext rentDb, IUserService userService, IUserConfigService userConfigService)
        {
            _rentDb = rentDb;
            _userService = userService;
            _userConfigService = userConfigService;
        }

        public async Task<Contract> AddPaymentAsync(long contractID, Payment addPaymentDto)
        {
            var contract = _rentDb.Contracts.LoadWithAllChildren()
                                .Where(x => x.ID == contractID).FirstOrDefault();

            if (contract == null)
                throw new ExceptionBase(ExceptionCodes.ItemNotFound);

            contract.AddPyament(addPaymentDto, _userService.UserID);
            await _rentDb.SaveChangesAsync();

            return contract;
        }

        public async Task<Contract> Create(domain.entities.Contract contract)
        {
            contract.StoreID = _userService.StoreID;
            contract.CreatedByID = _userService.UserID;
            contract.ContractNumber = await _userConfigService.GetNextContractNo();
            _rentDb.Add(contract);
            await _rentDb.SaveChangesAsync();
            return contract;
        }

        public IAsyncEnumerable<domain.entities.Contract> GetAll()
        {
            return _rentDb.Contracts
                .Include(x => x.Customer)
                .Include(x => x.Payments)
                .Where(x => x.StoreID == _userService.StoreID)
                    .OrderByDescending(x => x.CreatedAt)
                .AsAsyncEnumerable();
        }

        public async Task<Contract> GetByIdAsync(int id)
        {
            var contract = await _rentDb
                .Contracts.LoadWithAllChildren().FirstOrDefaultAsync(x => x.ID == id);

            if (contract == null)
                throw new ExceptionBase(ExceptionCodes.ItemNotFound);

            if (contract.StoreID != _userService.StoreID)
            {
                throw new ExceptionBase(ExceptionCodes.NotAuthorized);
            }
            return contract;
        }

        public async Task<Contract> ReturnOneItem(long contractID, ReturnedItem returnedItem)
        {
            var contract = await _rentDb.Contracts
                .LoadWithAllChildren()
                .FirstOrDefaultAsync(x => x.ID == contractID);

            if (contract == null)
                throw new ExceptionBase(ExceptionCodes.ItemNotFound);

            contract.ReturnPartialItem(returnedItem, _userService.UserID);
            contract.UpdatedByID = _userService.UserID;

            await _rentDb.SaveChangesAsync();
            return contract;
        }

        public async Task<Contract> ChangeStatus(long contractID, ContractStatus contractStatus)
        {
            var contract = await _rentDb.Contracts
                    .LoadWithAllChildren()
                    .FirstOrDefaultAsync(x => x.ID == contractID);

            if (contract == null)
                throw new ExceptionBase(ExceptionCodes.ItemNotFound);

            contract.ChangeStatus(contractStatus);

            await _rentDb.SaveChangesAsync();
            return contract;
        }
    }

    public static class ContractExtensions
    {
        public static IQueryable<Contract> LoadWithAllChildren(this IQueryable<Contract> query)
        {
            return query
                .Include(x => x.Customer)
                .Include(x => x.Payments)
                    .ThenInclude(x => x.CreatedBy)
                .Include(x => x.Items)
                   .ThenInclude(x => x.Stuff)
                .Include(x => x.Items)
                   .ThenInclude(x => x.ReturnedItems)
                        .ThenInclude(x => x.CreatedBy)
                .Include(x => x.CreatedBy)
                .Include(x => x.UpdatedBy);

        }
    }
}
