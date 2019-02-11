using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Abp.Auditing;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using IEManageSystem.Dtos.Core;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Help.Exceptions;
using IEManageSystem.Services.Users.Dto;

namespace IEManageSystem.Services.Users
{
    public class UserAppService : IEManageSystemAppServiceBase, IUserAppService
    {
        private IAbpSession _AbpSession { get; set; }

        private IRepository<User> _UserRepository { get; set; }

        public UserAppService(
            IAbpSession abpSession,
            IRepository<User> userRepository
            )
        {
            _AbpSession = abpSession;

            _UserRepository = userRepository;
        }

        public async Task<SetUserInfoOutput> SetUserInfo(SetUserInfoInput input)
        {
            var user = await _UserRepository.FirstOrDefaultAsync((int)(_AbpSession.UserId ?? 0));
            if (user == null)
            {
                throw new MessageException("未找到当前用户的信息");
            }

            if (string.IsNullOrEmpty(input.Name)) {
                user.Name = input.Name;
            }

            if (string.IsNullOrEmpty(input.EmailAddress))
            {
                user.EmailAddress = input.EmailAddress;
            }

            if (string.IsNullOrEmpty(input.Phone))
            {
                user.Phone = input.Phone;
            }

            if (string.IsNullOrEmpty(input.HeadSculpture))
            {
                user.SetHeadSculpture(input.HeadSculpture);
            }

            return new SetUserInfoOutput();
        }

        public async Task<GetUserInfoOutput> GetUserInfo(GetUserInfoInput input)
        {
            var user = await _UserRepository.FirstOrDefaultAsync((int)(_AbpSession.UserId ?? 0));
            if (user == null)
            {
                throw new MessageException("未找到当前用户的信息");
            }

            return new GetUserInfoOutput() { User = AutoMapper.Mapper.Map<UserDto>(user) };
        }
    }
}
