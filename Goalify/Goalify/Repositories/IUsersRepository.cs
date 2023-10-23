using Goalify.Models;
using System.Collections.Generic;

namespace Goalify.Repositories
{
    public interface IUsersRepository
    {
        void Add(Users user);
        void Delete(int Id);
        void Update(Users user);
        List<Users> GetAll();
        Users Get(string email);


    }

}