using domain.abstraction;
using domain.entities;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/contracts")]
    [ApiController]
    public class ContractsController : Controller
    {
        private readonly IContractService _contractService;

        public ContractsController(IContractService contractService)
        {
            this._contractService = contractService;
        }

        [HttpGet]
        public IAsyncEnumerable<Contract> GetAll()
        {
            return _contractService.GetAll();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Contract customer)
        {
            await _contractService.Create(customer);
            return Ok();
        }
    }
}
