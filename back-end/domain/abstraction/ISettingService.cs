using domain.entities;

namespace domain.abstraction
{
    public interface IUserConfig
    {
        Task CreateDefaultConfig();
        Task<UserConfig> GetSettingAsync();
        Task UpdateAsync(UserConfig setting);
    }
}
