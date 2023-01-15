using AutoMapper;
using Common.Entities;
using Common.Entities.Identity;
using Database.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Database.Entities.Base;

namespace BusinessLogic.Services
{
    public class AccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private IMapper _mapper;
        private ILogger _logger;

        private readonly ClaimsPrincipal _currentUser;

        public AccountService(UserManager<ApplicationUser> userManager, IMapper mapper, ILogger<AccountService> logger)
        {
            _userManager = userManager;
            _mapper = mapper;
            _logger = logger;
        }

        public AccountService(UserManager<ApplicationUser> userManager, IMapper mapper, ILogger<AccountService> logger, ClaimsPrincipal currentUser) 
            : this(userManager, mapper, logger)
        {
            _currentUser = currentUser;
        }

        public async Task<AccountInfo> GetAccountInfo()
        {
            return await GetAccountInfo(_currentUser);
        }

        public async Task<AccountInfo> GetAccountInfo(ClaimsPrincipal claims)
        {
            var dbUser = await _userManager.GetUserAsync(claims);
            if (dbUser == null)
            {
                throw new UnauthorizedAccessException();
            }
            var mappedUser = _mapper.Map<AccountInfo>(dbUser);

            return mappedUser;
        }

        public async Task<AccountInfo> UpdateAccountInfo(AccountInfo accountInfo)
        {
            var user = await _userManager.FindByIdAsync(accountInfo.Id);
            if (user == null)
            {
                throw new UnauthorizedAccessException();
            }
            if (accountInfo.Role != null && user.Role != accountInfo.Role)
            {
                await _userManager.RemoveFromRoleAsync(user, user.Role);
                await _userManager.AddToRoleAsync(user, accountInfo.Role);
            }
            _mapper.Map(accountInfo, user);
            await _userManager.UpdateAsync(user);

            return accountInfo;
        }

        public async Task<User> CreateNewUser(User user)
        {
            ApplicationUser appUser = new ApplicationUser(user);
            var res = await _userManager.CreateAsync(appUser, user.Password);

            if (res.Succeeded)
            {
                _logger.LogInformation("User was created", user);
            }
            else
            {
                _logger.LogError("User creation fail", user, res.Errors);
                throw new Exception("User creation fail");
            }

            return user;
        }

        public async Task<IEnumerable<Dropdown>> UsersByRole(string role)
        {
            var users = await _userManager.GetUsersInRoleAsync(role);
            if (users == null) return new List<Dropdown>();
            return users.Select(_mapper.Map<Dropdown>);
        }


    }
}
