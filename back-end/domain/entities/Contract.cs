using domain.enums;
using domain.Exceptions;
using Rent.Entities;

namespace domain.entities
{
    public class Contract : IBaseEntity
    {
        public int ID { get; set; }
        public long ContractNumber { get; set; }
        public ServiceType ContractType { get; set; }
        public int CustomerID { get; set; }
        public DateTime Date { get; set; }
        public string RentLocation { get; set; }
        public decimal TotalPricePerDay { get; set; }
        public decimal Remaining { get; set; }
        public ContractStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Customer Customer { get; set; }
        public long StoreID { get; set; }
        public Store Store { get; set; }

        //who is the item created by
        public long? CreatedByID { get; set; }
        public long? UpdatedByID { get; set; }
        public User? CreatedBy { get; set; }
        public User? UpdatedBy { get; set; }

        #region Calculated Fields
        public decimal TotalPaidAmount
        {
            get
            {
                return Payments?.Sum(x => x.Amount) ?? 0;
            }
        }

        public int RemainItemsToReturn
        {
            get
            {
                var sum = Items?.Sum(x => x.RemainingItems) ?? 0;
                return sum;
            }
        }

        public decimal TotalPriceForReturnedItems
        {
            get
            {
                var totalPrice = Items?.SelectMany(x => x.ReturnedItems)?.Sum(x => x.Price) ?? 0;
                return totalPrice;
            }
        }
        #endregion

        #region Children
        public required ICollection<ContractItem> Items { get; set; }
        public ICollection<Payment> Payments { get; set; }
        #endregion

        public decimal GetHowMuchMoneyShouldBePaid()
        {
            var allCost = Items.Sum(x => x.Quantity * x.PricePerDay);
            return allCost;
        }

        public void AddPyament(Payment payment, long paidBy)
        {
            CanChange();
            payment.DateTime = DateTime.UtcNow;
            payment.CreatedByID = paidBy;
            Payments.Add(payment);
            CheckForChangingStatus();
        }

        private void CanChange()
        {
            if (Status == ContractStatus.ClosedSuccessfuly)
            {
                throw new ExceptionBase(ExceptionCodes.ContractIsClosedSuccuessfulyCannotBeChanged);
            }
        }

        public void CheckForChangingStatus()
        {
            CanChange();
            if (Items.All(x => x.RemainingItems == 0))
            {
                if (TotalPaidAmount < TotalPriceForReturnedItems)
                {
                    Status = ContractStatus.ReturnedEverythingButShouldGiveMoney;
                }

                //todo: this should change! for example if customer paid more money, we should inform!
                if (TotalPaidAmount >= TotalPriceForReturnedItems)
                {
                    Status = ContractStatus.ReadyToBeClosed;
                }
            }
        }

        public void ReturnPartialItem(ReturnedItem returnedItem, long returnedBy)
        {
            CanChange();
            var item = Items.FirstOrDefault(x => x.ID == returnedItem.ContractItemID);
            if (item == null)
            {
                throw new ExceptionBase(ExceptionCodes.ItemNotFound, nameof(ContractItem));
            }

            if (item.ReturnedItems == null) { item.ReturnedItems = new List<ReturnedItem>(); }

            if (returnedItem.Quantity > item.RemainingItems)
            {
                throw new ExceptionBase(ExceptionCodes.ItemsToReturnAreMoreThanRemaining);
            }

            returnedItem.CreatedByID = returnedBy;

            item.ReturnedItems.Add(returnedItem);
            item.Stuff.Quantity += returnedItem.Quantity;
            //todo: add returned items to the available quantity of the stuff! very important>>>???!!!
            CheckForChangingStatus();
        }

        public void ChangeStatus(ContractStatus contractStatus)
        {
            //todo: check if we can change status(for example check if all items are returned if it is renting business!
            Status = contractStatus;
        }

        //todo: this option will be implemented in future releases!, and will be public!
        private void ReturnAllItems()
        {

        }
    }
}

