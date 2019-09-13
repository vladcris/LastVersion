using AutoMapper;
using FeedbackV1.Dtos;
using FeedbackV1.Models;
using FeedbackV1.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FeedbackV1.Controllers
{     
    [Authorize] 
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {

            _config = config;
            _repo = repo;
             _mapper = mapper;
            
        }

        [AllowAnonymous]
        [HttpPost("register")]

        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //validate

            userForRegisterDto.Email = userForRegisterDto.Email.ToLower();

              if(await _repo.UserExists(userForRegisterDto.Email))
                 return BadRequest("Email already exists!");
            
            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserDto>(createdUser);


            return CreatedAtRoute("GetUser", new {controller = "User", id = createdUser.Id}, userToReturn);
        }

        [AllowAnonymous]
        [HttpPost("login")]

        public async Task<IActionResult> Login(UserForLoginDto userForRegisterDto)
        {
            var userFromRepo = await _repo.Login(userForRegisterDto.Email, userForRegisterDto.Password);

            if(userFromRepo == null)
            return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id),
                new Claim(ClaimTypes.Name, userFromRepo.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds

            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            // var user = new UserDto {
            //         ID = userFromRepo.Id,
            //         DEP_ID = userFromRepo.Dep_Id,
            //         Name = userFromRepo.Name,
            //         Email = userFromRepo.Email,
            //         Manager_ID = userFromRepo.Manager_ID,
            //         Role = userFromRepo.Id

            //     };

            return Ok(new {
                token = tokenHandler.WriteToken(token),
                    Id = userFromRepo.Id,
                    Dep_Id = userFromRepo.Dep_Id,
                    Name = userFromRepo.Name,
                    Email = userFromRepo.Email,
                    Manager_ID = userFromRepo.Manager_ID,
                    Role = userFromRepo.Role
                
            });

        }
        
    }
}

