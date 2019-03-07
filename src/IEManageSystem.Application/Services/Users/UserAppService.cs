using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Abp.Auditing;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using IEManageSystem.Dtos.Core;
using IEManageSystem.Dtos.Core.Users;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Entitys.Authorization.Users.Accounts;
using IEManageSystem.Help.Exceptions;
using IEManageSystem.Services.Users.Dto;
using Microsoft.AspNetCore.Authorization;

namespace IEManageSystem.Services.Users
{
    [Authorize]
    public class UserAppService : IEManageSystemAppServiceBase, IUserAppService
    {
        private IAbpSession _abpSession { get; set; }

        private IRepository<User> _userRepository { get; set; }

        private UserManager _userManager { get; set; }

        public UserAppService(
            IAbpSession abpSession,
            IRepository<User> userRepository,
            UserManager userManager
            )
        {
            _abpSession = abpSession;

            _userRepository = userRepository;

            _userManager = userManager;
        }

        public async Task<SetUserInfoOutput> SetUserInfo(SetUserInfoInput input)
        {
            var user = await _userRepository.FirstOrDefaultAsync((int)(_abpSession.UserId ?? 0));
            if (user == null)
            {
                throw new MessageException("未找到当前用户的信息");
            }

            if (!string.IsNullOrEmpty(input.Name)) {
                user.Name = input.Name;
            }

            if (!string.IsNullOrEmpty(input.EmailAddress))
            {
                user.EmailAddress = input.EmailAddress;
            }

            if (!string.IsNullOrEmpty(input.Phone))
            {
                user.Phone = input.Phone;
            }

            if (!string.IsNullOrEmpty(input.HeadSculpture))
            {
                user.SetHeadSculpture(input.HeadSculpture);
            }

            if (!string.IsNullOrEmpty(input.PersonSignature))
            {
                user.PersonSignature = input.PersonSignature;
            }

            if(!string.IsNullOrEmpty(input.RealName))
            {
                user.RealName = input.RealName;
            }

            if(!string.IsNullOrEmpty(input.IDNumber))
            {
                user.IDNumber = input.IDNumber;
            }

            if(!string.IsNullOrEmpty(input.Address))
            {
                user.Address = input.Address;
            }

            if (input.Sex != null)
            {
                user.Sex = input.Sex.Value;
            }

            if (input.BirthDate != null)
            {
                user.BirthDate = input.BirthDate.Value;
            }

            return new SetUserInfoOutput();
        }

        public async Task<GetUserInfoOutput> GetUserInfo(GetUserInfoInput input)
        {
            Expression<Func<User, object>>[] propertySelectors = new Expression<Func<User, object>>[] {
                e=>e.Account
            };
            var user = _userRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e=>e.Id == (int)(_abpSession.UserId ?? 0));

            if (user == null)
            {
                throw new MessageException("未找到当前用户的信息");
            }

            return new GetUserInfoOutput() { User = AutoMapper.Mapper.Map<UserDto>(user) };
        }

        public async Task<SetSafetyProblemOutput> SetSafetyProblem(SetSafetyProblemInput input)
        {
            Expression<Func<User, object>>[] propertySelectors = new Expression<Func<User, object>>[] {
                e=>e.Account
            };
            var user = _userRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == (int)(_abpSession.UserId ?? 0));

            if (user == null)
            {
                throw new MessageException("未找到当前用户的信息");
            }

            SafetyProblem safetyProblem = new SafetyProblem(input.Problem, input.Answer);

            user.Account.SafetyProblem = safetyProblem;

            return new SetSafetyProblemOutput();
        }

        public async Task<SetPassageOutput> SetPassage(SetPassageInput input)
        {
            var user = await _userRepository.FirstOrDefaultAsync((int)(_abpSession.UserId ?? 0));
            if (user == null)
            {
                throw new MessageException("未找到当前用户的信息");
            }

            bool pass = _userManager.ValidatePassword(user, input.OldPassword);
            if (pass == false) {
                throw new MessageException("旧密码错误");
            }

            _userManager.UpdatePassword(user, input.NewPassword);

            return new SetPassageOutput();
        }
    }
}
