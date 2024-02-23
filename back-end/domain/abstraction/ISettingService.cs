using domain.entities;

namespace domain.abstraction
{
    public interface ISettingService
    {
        Task<UserSetting> GetSettingAsync();
        Task UpdateAsync(UserSetting setting);
    }
}
