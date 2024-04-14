
using application.Models.User;
using application.Security;
using domain.abstraction;
using domain.entities;
using domain.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using persistance;
using System.Extentions;

namespace application.Services
{
    public class UserService : IUserService
    {
        public int Id => 1;//todo: should implement 

        public RsaDbContext _rsaDbContext { get; set; }
        private PasswordHasher<User> passwordHasher;

        public UserService(RsaDbContext rsaDbContext)
        {
            _rsaDbContext = rsaDbContext;
            passwordHasher = new PasswordHasher<User>();
        }

        public async Task<object?> GetById(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task CreateStore(AddStoreDto addStoreDto)
        {
            var pass = addStoreDto.Password.GetStringSha256Hash();

            //todo: check if store exisit
            //todo: check if user exisit before!

            var store = new Store()
            {
                Name = addStoreDto.StoreName,
                IsDemoStore = false,
                ServiceType = addStoreDto.ServiceType,
                Users = new List<User>()
            };
            store.Users.Add(new User()
            {
                Email = addStoreDto.Email,
                IsAdmin = true,
                Mobile = addStoreDto.Mobile,
                Password = pass,
            });


            await _rsaDbContext.Stores.AddAsync(store);
            await _rsaDbContext.SaveChangesAsync();
        }

        public async Task<string> GenerateJwtToken(string userName, string password)
        {
            var hashedPass = password.GetStringSha256Hash();

            var validUser = await _rsaDbContext.Users.FirstOrDefaultAsync(x => x.Email == userName && x.Password == hashedPass);
            if (validUser == null)
                throw new ExceptionBase(Exceptions.InvalidUserPass);

            var claims = new Dictionary<string, object>
            {
                {"UserID", validUser.ID },
                {"StoreID",validUser.StoreID },
                {"Email",validUser.Email },
                {"IsAdmin",validUser.IsAdmin }
            };

            return Jwt.TokenGenerator(claims);
        }

        public int GetCurrentUserID()
        {
            return 1;
        }
    }
}