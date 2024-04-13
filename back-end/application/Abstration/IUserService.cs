using application.Models.User;
using Microsoft.AspNetCore.Identity;

namespace domain.abstraction
{
    public interface IUserService
    {
        Task CreateStore(AddStoreDto addStoreDto);
        int GetCurrentUserID();
    }
}
