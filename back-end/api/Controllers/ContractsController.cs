using api.Middleware;
using application.Models.Contract;
using domain.abstraction;
using domain.entities;
using domain.enums;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Auth(domain.enums.RoleType.Normal)]
    [Route("api/contracts")]
    [ApiController]
    public class ContractsController : Controller
    {
        private readonly IContractService _contractService;
        private readonly IUserService _userService;

        public ContractsController(IContractService contractService, IUserService userService)
        {
            this._contractService = contractService;
            this._userService = userService;
        }

        [HttpGet]
        public IAsyncEnumerable<Contract> GetAll()
        {
            return _contractService.GetAll();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateContractDto contract)
        {
            //todo: this should be moved to mapper!
            Contract cont = ConvertContractDtoToContract(contract);
            await _contractService.Create(cont);

            return Ok();
        }

        private Contract ConvertContractDtoToContract(CreateContractDto contract)
        {
            var aggrigate = Guid.NewGuid();
            var itemStatus = ItemStatus.Renting;
            if (_userService.ServiceType == domain.enums.ServiceType.Sell)
            {
                itemStatus = ItemStatus.Sold;
            };

            return new Contract
            {
                Date = contract.Date,
                Items = contract.Items.Select(item => new ContractItem
                {
                    Description = item.Description,
                    Aggregate = aggrigate,
                    PricePerDay = item.PricePerDay,
                    Quantity = item.Quantity,
                    RentDate = item.RentDate,
                    StuffID = item.StuffID,
                    Status = itemStatus
                }).ToList(),
                Payments = contract.Payments.Select(x => new Payment
                {
                    Amount = x.Amount,
                    PaymentType = x.PaymentType
                }).ToList(),
                Status = ContractStatus.Opened,
                HowManyDaysClaim = contract.HowManyDaysClaim,
                RentLocation = contract.RentLocation,
                TotalPricePerDay = contract.Items.Sum(x => x.PricePerDay * x.Quantity),
                CustomerID = contract.CustomerID,
            };
        }

        [HttpGet("{id}")]
        public async Task<Contract> GetByIdAsync(int id)
        {
            return await _contractService.GetByIdAsync(id);
        }

        [HttpPost("{id}/add-payment")]
        public async Task<IActionResult> AddPayment([FromRoute] long id, Payment payment)
        {
            await _contractService.AddPaymentAsync(id, payment);
            return Ok();
        }

        [HttpPost("{id}/return-item")]
        public async Task<IActionResult> ReturnContractItem([FromRoute] long id, ReturnedItem returnedItem)
        {
            var contract = await _contractService.ReturnOneItem(id, returnedItem);
            return Ok(contract);
        }
    }
}
