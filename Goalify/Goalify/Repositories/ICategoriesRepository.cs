using Goalify.Models;
using System.Collections.Generic;

namespace Goalify.Repositories
{
    public interface ICategoriesRepository
    {
        Categories Get(int id);
        List<Categories> GetAll();
        Categories Add(Categories category);
        Categories Update(Categories category);
        Categories Delete(int id);   
    }
}