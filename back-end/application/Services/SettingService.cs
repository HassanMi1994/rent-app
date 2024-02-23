using domain.abstraction;
using domain.entities;
using Microsoft.EntityFrameworkCore;
using persistance;

namespace application.Services
{
    public class SettingService : ISettingService
    {
        RentDbContext _rentDb;

        public SettingService(RentDbContext rentDb)
        {
            _rentDb = rentDb;
        }

        public async Task<UserSetting> GetSettingAsync()
        {
            return await _rentDb.Settings.FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(UserSetting setting)
        {
            var set = await GetSettingAsync();
            set = setting;
            await _rentDb.SaveChangesAsync();

        }
    }
}
