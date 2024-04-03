using domain.abstraction;
using domain.entities;
using Microsoft.EntityFrameworkCore;
using persistance;
using System.Runtime.InteropServices;
using System.Text.Json;

namespace application.Services
{
    public class UserConfigService : IUserConfigService
    {
        RentDbContext _rentDb;
        IUserService _userService;

        public UserConfigService(RentDbContext rentDb, IUserService userService)
        {
            _userService = userService;
            _rentDb = rentDb;
        }

        public async Task CreateDefaultConfig()
        {
            _rentDb.UserConfigs.Add(UserConfig.CreateDefaultConfig(_userService.Id));
            await _rentDb.SaveChangesAsync();
        }

        public async Task UpdateAsync(UserConfig config)
        {
            var userConfig = await GetSettingAsync();
            userConfig = config;
            userConfig.UpdatedAt = DateTime.Now;
            await _rentDb.SaveChangesAsync();
        }

        public async Task<UserConfig> GetSettingAsync()
        {
            var userConfig = await _rentDb.UserConfigs.FirstOrDefaultAsync(x => x.UserID == _userService.GetCurrentUserID());
            if (userConfig == null)
            {
                userConfig = UserConfig.CreateDefaultConfig(_userService.GetCurrentUserID());
                _rentDb.UserConfigs.Add(userConfig);
                await _rentDb.SaveChangesAsync();
            };
            return userConfig;
        }


        //public async Task UpdateAsync(UserConfig userConfig)
        //{
        //    var setting = GetSettingAsync();
        //    _rentDb.UserConfigs.Update(userConfig);
        //    await _rentDb.SaveChangesAsync();
        //}
    }
}
