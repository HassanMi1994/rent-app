using api.Middleware;
using domain.abstraction;
using domain.entities;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Auth(domain.enums.RoleType.Normal)]
    [Route("api/config")]
    [ApiController]
    public class UserConfigController : Controller
    {
        private readonly IUserConfigService _userConfig;

        public UserConfigController(IUserConfigService settingService)
        {
            _userConfig = settingService;
        }

        [HttpGet]
        public async Task<UserConfig> GetSettingAsync() => await _userConfig.GetSettingAsync();

        [Auth(domain.enums.RoleType.Admin)]
        [HttpPatch]
        public async Task UpdateSettingAsync([FromBody] UserConfig setting) => await _userConfig.UpdateAsync(setting);
    }
}