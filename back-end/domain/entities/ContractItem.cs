using domain.enums;
using Microsoft.VisualBasic;
using System.Text.Json;

namespace domain.entities
{
    public class ContractItem : IBaseEntity
    {
        public int ID { get; set; }
        public int ContractID { get; set; }
        public Guid Aggregate { get; set; }
        public int StuffID { get; set; }
        public int Quantity { get; set; }
        public int RemainingItems
        {
            get { return Quantity - ReturnedItems?.Sum(x => x.Quantity) ?? 0; }
        }
        public bool IsReadyToClose { get => RemainingItems == Quantity; }
        public DateTime RentDate { get; set; }
        public ItemStatus Status { get; set; }
        public DateTime? LastStatusChangedDate { get; set; }
        public decimal PricePerDay { get; set; }
        public string? Description { get; set; }
        public Stuff Stuff { get; set; }
        public Contract Contract { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public ICollection<History>? History { get; set; }
        public ICollection<ReturnedItem> ReturnedItems { get; set; } = new List<ReturnedItem>();

        public void AddHistory()
        {
            var hisory = new History
            {
                ID = ID,
                Aggregate = this.Aggregate,
                CreatedAt = DateTime.Now,
                Object = JsonSerializer.Serialize(this)
            };

            hisory.GetHashCode();
            History.Add(hisory);
        }
    }

}
