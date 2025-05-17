using api.Middleware;
using domain.abstraction;
using domain.entities;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Auth(domain.enums.RoleType.Normal)]
    [Route("api/stuff")]
    public class StuffController : ControllerBase
    {

        IStuffService _stuffService;
        public StuffController(IStuffService customerService)
        {
            _stuffService = customerService;
        }

        [HttpGet]
        public IAsyncEnumerable<Stuff> GetAll()
        {
            return _stuffService.GetAll();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Stuff stuff)
        {
            await _stuffService.Create(stuff);
            return Ok();
        }


    }
}
