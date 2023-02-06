using Goalify.Models;
using System.Collections.Generic;

namespace Goalify.Repositories
{
    public interface IPrioritiesRepository
    {
        Priorities Get(Priorities priority);
        List<Priorities> GetAll();
        Priorities Get(int id);
        void Add(Priorities priority);
        void Update(Priorities priority);
        void Delete(int id);
    }
}