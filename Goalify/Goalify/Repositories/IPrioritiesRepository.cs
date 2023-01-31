using Goalify.Models;
using System.Collections.Generic;

namespace Goalify.Repositories
{
    public interface IPrioritiesRepository
    {
        Priorities Get(Priorities priority);
        List<Priorities> GetAll();
    }
}