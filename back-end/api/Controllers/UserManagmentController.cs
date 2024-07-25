using api.Middleware;
using application.Models.User;
using domain.abstraction;
using domain.entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserManagmentController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserManagmentController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("sign-up")]
        public async Task<IActionResult> AddUser(AddStoreDto user)
        {
            await _userService.CreateStoreAsync(user);
            return Ok();
        }

        [Auth(domain.enums.RoleType.Admin)]
        [HttpPost("add-user")]
        public async Task<IActionResult> AddNoramlUser(AddNormalUserDto user)
        {
            await _userService.CreateNormalUserAsync(user);
            return Ok();
        }

        [Auth(domain.enums.RoleType.Admin)]
        [HttpGet]
        public IAsyncEnumerable<User> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDto loginUserDto)
        {
            var token = await _userService.GenerateJwtTokenAsync(loginUserDto.Email, loginUserDto.Password);
            return Ok(token);
        }

        [HttpGet("UserCalaims")]
        [Auth(domain.enums.RoleType.Normal)]
        public async Task<IActionResult> GetUserClaims()
        {
            return Ok(_userService.GetUserClaims());
        }
    }
}
