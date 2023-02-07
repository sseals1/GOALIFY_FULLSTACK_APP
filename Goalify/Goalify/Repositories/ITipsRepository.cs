using Goalify.Models;
using System.Collections.Generic;

namespace Goalify.Repositories
{
    public interface ITipsRepository
    {
        List<Tips> GetAll();
    }
}