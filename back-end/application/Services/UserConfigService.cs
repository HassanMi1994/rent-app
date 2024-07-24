using domain.abstraction;
using domain.entities;
using Microsoft.EntityFrameworkCore;
using persistance;

namespace application.Services
{
    public class UserConfigService : IUserConfigService
    {
        RsaDbContext _rentDb;
        IUserService _userService;

        public UserConfigService(persistance.RsaDbContext rentDb, IUserService userService)
        {
            _userService = userService;
            _rentDb = rentDb;
        }

        public async Task CreateDefaultConfig()
        {
            _rentDb.UserConfigs.Add(UserConfig.CreateDefaultConfig(_userService.UserID, _userService.StoreID));
            await _rentDb.SaveChangesAsync();
        }

        public async Task<UserConfig> UpdateAsync(UserConfig config)
        {
            var userConfig = await GetSettingAsync();
            var preservedContractNo = userConfig.ContractNoSeed;
            //userConfig = config;
            if (userConfig.CanChangeContractNo)
            {
                userConfig.ContractNoSeed = config.ContractNoSeed;
            }
            userConfig.CalendarType = config.CalendarType;
            userConfig.TaxPercent = config.TaxPercent;
            await _rentDb.SaveChangesAsync();
            return userConfig;
        }

        public async Task<UserConfig> GetSettingAsync()
        {
            var userConfig = await _rentDb.UserConfigs.FirstOrDefaultAsync(x => x.UserID == _userService.UserID);
            if (userConfig == null)
            {
                userConfig = UserConfig.CreateDefaultConfig(_userService.UserID, _userService.StoreID);
                _rentDb.UserConfigs.Add(userConfig);
                await _rentDb.SaveChangesAsync();
            };
            return userConfig;
        }

        public async Task<long> GetNextContractNo()
        {
            var config = await GetSettingAsync();
            var next = config.GetNextContractNo();
            return next;
        }

        //public async Task UpdateAsync(UserConfig userConfig)
        //{
        //    var setting = GetSettingAsync();
        //    _rentDb.UserConfigs.Update(userConfig);
        //    await _rentDb.SaveChangesAsync();
        //}
    }
}
