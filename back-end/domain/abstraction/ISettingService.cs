using domain.entities;

namespace domain.abstraction
{
    public interface IUserConfigService
    {
        Task CreateDefaultConfig();
        Task<UserConfig> GetSettingAsync();
        Task UpdateAsync(UserConfig setting);
    }
}
