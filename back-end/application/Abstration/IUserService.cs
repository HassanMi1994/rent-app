using application.Models.User;
using Microsoft.AspNetCore.Identity;

namespace domain.abstraction
{
    public interface IUserService
    {
        Task CreateStoreAsync(AddStoreDto addStoreDto);
        Task<UserInfoDto> GenerateJwtTokenAsync(string userName, string password);
        long UserID { get; }
        long StoreID { get; }

        Dictionary<string, string> GetUserClaims();
    }
}
