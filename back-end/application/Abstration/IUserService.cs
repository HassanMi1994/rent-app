using application.Models.User;
using domain.entities;
using domain.enums;
using Microsoft.AspNetCore.Identity;

namespace domain.abstraction
{
    public interface IUserService
    {
        Task CreateStoreAsync(AddStoreDto addStoreDto);
        Task<UserInfoDto> GenerateJwtTokenAsync(string userName, string password);
        long UserID { get; }
        long StoreID { get; }
        ServiceType ServiceType{ get; }

        Dictionary<string, string> GetUserClaims();
        Task CreateNormalUserAsync(AddNormalUserDto normalUser);
        IAsyncEnumerable<User> GetAllUsers();
    }
}
