using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
        public class TokenService : IToken
        {
            private readonly IConfiguration _config;
            private readonly SymmetricSecurityKey _key;
            public TokenService(IConfiguration config)
            {
                _config = config;
                _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            }
            public string CreateToken(AppUser user)
            {
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
                };

                var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

                var tokendescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddHours(1),
                    SigningCredentials = creds
                };

                var tokenhandler = new JwtSecurityTokenHandler();

                var token = tokenhandler.CreateToken(tokendescriptor);

                return tokenhandler.WriteToken(token);
            }
        }
}