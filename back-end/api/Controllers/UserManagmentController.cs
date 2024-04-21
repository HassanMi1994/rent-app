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
        public async Task<string> GetToken(string email, string password)
        {
            var token = await _userService.GenerateJwtTokenAsync(email, password);
            return token;
        }
    }
}
