using domain.entities;

namespace domain.abstraction
{
    public interface IUserConfigService
    {
        Task CreateDefaultConfig();
        Task<long> GetNextContractNo();
        Task<UserConfig> GetSettingAsync();
        Task<UserConfig> UpdateAsync(UserConfig setting);
    }
}
