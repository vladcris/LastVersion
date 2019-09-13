
using System.Collections.Generic;
using System.Threading.Tasks;
using FeedbackV1.Models;

namespace FeedbackV1.Repositories
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string email, string password);
        Task<bool> UserExists(string email);


        // user apis

        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsersForTeam();
        Task<User> GetUser(string id);


    }
}