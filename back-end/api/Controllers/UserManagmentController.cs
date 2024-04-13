using application.Models.User;
using application.Services;
using domain.abstraction;
using domain.entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/user-managment")]
    [ApiController]
    public class UserManagmentController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserManagmentController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult AddUser(AddStoreDto user)
        {
            _userService.CreateStore(user);
            return Ok();
        }
    }
}
