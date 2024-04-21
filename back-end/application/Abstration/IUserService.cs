using application.Models.User;
using Microsoft.AspNetCore.Identity;

namespace domain.abstraction
{
    public interface IUserService
    {
        Task CreateStoreAsync(AddStoreDto addStoreDto);
        Task<string> GenerateJwtTokenAsync(string userName, string password);
        int GetCurrentUserID();
    }
}
