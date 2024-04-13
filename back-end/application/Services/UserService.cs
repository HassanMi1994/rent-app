
using application.Models.User;
using domain.abstraction;
using domain.entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using persistance;

namespace application.Services
{
    public class UserService : IUserService
    {
        public int Id => 1;//todo: should implement 
        public UserManager<User> UserManager { get; set; }
        public SignInManager<User> _signInManager { get; set; }
        public persistance.RsaDbContext _rsaDbContext { get; set; }
        private RoleManager<IdentityRole> _roleManager { get; set; }

        public UserService(UserManager<User> userManager, SignInManager<User> signInManager, RsaDbContext rsaDbContext, RoleManager<IdentityRole> roleManager)
        {
            UserManager = userManager;
            _signInManager = signInManager;
            _rsaDbContext = rsaDbContext;
            _roleManager = roleManager;
        }

        public async Task<object?> GetById(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task CreateStore(AddStoreDto addStoreDto)
        {
            var pass = addStoreDto.Password;
            try
            {
                _roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
                var newUser = new User()
                {
                    UserName = addStoreDto.Email,
                    Email = addStoreDto.Email,
                    IsAdmin = true,
                    PhoneNumber = addStoreDto.Mobile,
                    StoreName = addStoreDto.StoreName,
                    IsDemoAccount = false,
                    ServiceType = domain.enums.ServiceType.Sell,
                    NormalizedEmail = addStoreDto.Email,
                    NormalizedUserName = addStoreDto.Email,

                };
                await UserManager.CreateAsync(newUser, pass);
                //await _userStore.SetUserNameAsync(newUser, newUser.UserName, CancellationToken.None);

                //var result = await UserManager.CreateAsync(newUser, pass);
                //_con
                //if (result.Succeeded)
                //{

                //}

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

        }

        public int GetCurrentUserID()
        {
            return 1;
        }

    }
}