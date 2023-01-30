using Goalify.Models;
using System.Collections.Generic;

namespace Goalify.Repositories
{
    public interface ICategoriesRepository
    {
        Categories Get(int id);
        List<Categories> GetAll();
    }
}