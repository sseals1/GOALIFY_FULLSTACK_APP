using Goalify.Models;
using System.Collections.Generic;

namespace Goalify.Repositories
{
    public interface ICategoriesRepository
    {
        Categories Get(int id);
        List<Categories> GetAll();
        void Add(Categories category);
        void Update(Categories category);
        void Delete(int id);   
    }
}