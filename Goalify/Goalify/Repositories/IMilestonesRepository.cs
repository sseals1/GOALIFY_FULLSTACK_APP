using Goalify.Models;
using System.Collections.Generic;

namespace Goalify.Repositories
{
    public interface IMilestonesRepository
    {
        void Add(Milestones milestone);
        void Delete(int id);
        Milestones Get(int id);
        List<Milestones> GetAll();
        void Update(Milestones milestone);
    }
}