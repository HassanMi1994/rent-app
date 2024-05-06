using api.Middleware;
using application.Models.User;
using domain.abstraction;
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

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> GetToken(LoginUserDto loginUserDto)
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
