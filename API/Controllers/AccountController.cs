
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
        public class AccountController : BaseApiController
        {
            private readonly DataContext _context;
            public AccountController(DataContext dataContext)
            {
                _context = dataContext;
            }

            [HttpPost]
            [Route("register")]
            public async Task<ActionResult<AppUser>> Register(RegisterDTO register)
            {
                if(await IsUSerExist(register.username)) return BadRequest("User already exist!");
                using var hmac = new HMACSHA512();
                var user = new AppUser
                {
                    UserName = register.username.ToLower(),
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.password)),
                    PasswordSalt = hmac.Key
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                return user;
            }

            [HttpPost]
            [Route("login")]
            public async Task<ActionResult<AppUser>> Login(LoginDTO login)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == login.username.ToLower());

                if(user == null) return Unauthorized("Invalid user!");

                using var hmac = new HMACSHA512(user.PasswordSalt);

                var computedhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.password));

                for(int i=0; i<computedhash.Length;i++)
                {
                    if(computedhash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
                }

                return user;
            }
            private async Task<bool> IsUSerExist(string username)
            {
                return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
            }
        }
}