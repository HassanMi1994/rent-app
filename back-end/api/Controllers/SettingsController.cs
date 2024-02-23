using domain.abstraction;
using domain.entities;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/settings")]
    [ApiController]
    public class SettingsController : Controller
    {
        private readonly ISettingService settingService;

        public SettingsController(ISettingService settingService)
        {
            this.settingService = settingService;
        }

        [HttpGet]
        public async Task<UserSetting> GetSettingAsync() => await settingService.GetSettingAsync();


        [HttpPatch]
        public async Task UpdateSettingAsync([FromBody] UserSetting setting) => await settingService.UpdateAsync(setting);
    }
}
