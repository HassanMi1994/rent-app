using domain.entities;

namespace domain.abstraction
{
    public interface IStuffService
    {
        Task Create(Stuff customer);
        IAsyncEnumerable<Stuff> GetAll();
    }
}
