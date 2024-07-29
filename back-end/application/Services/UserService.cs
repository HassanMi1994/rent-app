
using application.Models.User;
using application.Security;
using domain.abstraction;
using domain.entities;
using domain.enums;
using domain.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using persistance;
using System.Extentions;

namespace application.Services
{
    public class AppClaims
    {
        public static string UserID = "UserID";
        public static string StoreID = "StoreID";
        public static string Email = "Email";
        public static string IsAdmin = "IsAdmin";
        public static string ServiceType = "ServiceType";
    }

    public class UserService : IUserService
    {
        public int Id => 1;//todo: should implement 
        private IHttpContextAccessor httpContextAccessor;

        public RsaDbContext _rsaDbContext { get; set; }
        private PasswordHasher<User> passwordHasher;

        public UserService(RsaDbContext rsaDbContext, IHttpContextAccessor contextAccessor)
        {
            _rsaDbContext = rsaDbContext;
            passwordHasher = new PasswordHasher<User>();
            this.httpContextAccessor = contextAccessor;
        }

        public async Task<object?> GetById(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task CreateStoreAsync(AddStoreDto addStoreDto)
        {
            var pass = addStoreDto.Password.GetStringSha256Hash();

            //todo: check if store exist
            //todo: check if user exist before!
            await ThrowIfUserExist(addStoreDto.Email);

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
                FullName = addStoreDto.FullName,
                Mobile = addStoreDto.Mobile,
                Password = pass,

            });


            await _rsaDbContext.Stores.AddAsync(store);
            await _rsaDbContext.SaveChangesAsync();
        }

        private async Task ThrowIfUserExist(string email)
        {
            bool isInvalidUserName = await _rsaDbContext.Users
                 .AnyAsync(x => x.Email.ToLower() == email.ToLower());

            if (isInvalidUserName)
            {
                throw new ExceptionBase(ExceptionCodes.UserAlreadyExist);
            }
        }

        public async Task CreateNormalUserAsync(AddNormalUserDto normalUser)
        {
            var pass = normalUser.Password.GetStringSha256Hash();
            await ThrowIfUserExist(normalUser.Email);

            _rsaDbContext.Users.Add(new User()
            {
                Email = normalUser.Email,
                IsAdmin = false,
                FullName = normalUser.FullName,
                Mobile = normalUser.Mobile,
                Password = pass,
                StoreID = StoreID
            });
            await _rsaDbContext.SaveChangesAsync();
        }

        public IAsyncEnumerable<User> GetAllUsers()
        {
            return _rsaDbContext.Users.Where(x => x.StoreID == StoreID)
                .Select(x => new User
                {
                    Email = x.Email,
                    FullName = x.FullName,
                    ID = x.ID,
                    IsAdmin = x.IsAdmin,
                    Mobile = x.Mobile,
                    StoreID = x.StoreID,
                })
                .AsAsyncEnumerable();
        }

        public async Task<UserInfoDto> GenerateJwtTokenAsync(string userName, string password)
        {
            var hashedPass = password.GetStringSha256Hash();

            var validUser = await _rsaDbContext.Users.Include(x => x.Store).FirstOrDefaultAsync(x => x.Email == userName && x.Password == hashedPass);
            if (validUser == null)
                throw new ExceptionBase(ExceptionCodes.NotAuthorized);

            var claims = new Dictionary<string, object>
            {
                {AppClaims.UserID, validUser.ID },
                {AppClaims.StoreID,validUser.StoreID },
                {AppClaims.Email,validUser.Email },
                {AppClaims.IsAdmin,validUser.IsAdmin },
                {AppClaims.ServiceType, (int)validUser.Store.ServiceType }
            };

            var token = Jwt.TokenGenerator(claims);
            return new UserInfoDto
            {
                Email = validUser.Email,
                IsAdmin = validUser.IsAdmin,
                JwtKey = token,
                StoreID = validUser.StoreID,
                StoreName = validUser.Store.Name,
                UserID = validUser.ID,
                FullName = validUser.FullName,
                ServiceType = validUser.Store.ServiceType
            };
        }

        public Dictionary<string, string> GetUserClaims()
        {
            var jwt = httpContextAccessor.HttpContext.Request.Headers["Authorization"];
            if (!string.IsNullOrEmpty(jwt))
            {
                var keyvalues = Jwt.GetClaimsFromJwt(jwt).Select(x => new KeyValuePair<string, string>(x.Type, x.Value));
                return new Dictionary<string, string>(keyvalues);
            }
            return new Dictionary<string, string>();
        }

        public long UserID =>
            long.Parse(GetUserClaims().First(x => x.Key == AppClaims.UserID).Value);

        public long StoreID =>
            long.Parse(GetUserClaims().First(x => x.Key == AppClaims.StoreID).Value);

        public ServiceType ServiceType =>
             (ServiceType)int.Parse(GetUserClaims().First(x => x.Key == AppClaims.ServiceType).Value);
    }
}