using api.Middleware;
using application.Models.Contract;
using domain.abstraction;
using domain.entities;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/contracts")]
    [Auth(domain.enums.RoleType.Admin)]
    [ApiController]
    public class ContractsController : Controller
    {
        private readonly IContractService _contractService;

        public ContractsController(IContractService contractService)
        {
            this._contractService = contractService;
        }

        [HttpGet]
        public IAsyncEnumerable<domain.entities.Contract> GetAll()
        {
            return _contractService.GetAll();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateContractDto contract)
        {
            //todo: this should be moved to mapper!
            domain.entities.Contract cont = ConvertContractDtoToContract(contract);
            await _contractService.Create(cont);

            return Ok();
        }

        private static domain.entities.Contract ConvertContractDtoToContract(CreateContractDto contract)
        {
            return new domain.entities.Contract
            {
                Date = contract.Date,
                Items = contract.Items.Select(item => new ContractItem
                {
                    Description = item.Description,
                    PricePerDay = item.PricePerDay,
                    Quantity = item.Quantity,
                    RentDate = item.RentDate,
                    StuffID = item.StuffID,

                }).ToList(),
                Status = domain.enums.ContractStatus.Opened,
                PrePaidMoney = contract.PrePaidMoney,
                HowManyDaysClaim = contract.HowManyDaysClaim,
                RentLocation = contract.RentLocation,
                TotalPricePerDay = contract.Items.Sum(x => x.PricePerDay * x.Quantity),
                CustomerID = contract.CustomerID,
            };
        }

        [HttpGet("{id}")]
        public async Task<domain.entities.Contract> GetByIdAsycn(int id)
        {
            return await _contractService.GetByIdAsync(id);
        }
    }
}
