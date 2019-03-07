﻿using IdentityServer4.EntityFramework.DbContexts;
using IEManageSystem.IdentityServer.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Linq;
using Abp.EntityFrameworkCore;
using IEManageSystem.IdentityServerEF.EntityFramework;

namespace IEManageSystem.IdentityServerEF.Repositories
{
    public class IEIdentityServerRepository<TEntity> : IIEIdentityServerRepository<TEntity> where TEntity : class
    {
        private IDbContextProvider<IEConfigurationDbContext> _dbContextProvider { get; set; }

        private DbSet<TEntity> _entities => _dbContextProvider.GetDbContext().Set<TEntity>();

        public IEIdentityServerRepository(IDbContextProvider<IEConfigurationDbContext> dbContextProvider)
        {
            _dbContextProvider = dbContextProvider;
        }

        public TEntity FirstOrDefault(object id)
        {
            return _entities.Find(id);
        }

        public TEntity FirstOrDefault(Func<TEntity, bool> func)
        {
            return _entities.Where(func).FirstOrDefault();
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _entities;
        }

        public IEnumerable<TEntity> GetAllInclude(Expression<Func<TEntity, object>>[] propertySelectors)
        {
            IQueryable<TEntity> result = _entities;
            foreach (var item in propertySelectors) {
                result = result.Include(item);
            }

            return result;
        }

        public void Insert(TEntity entity)
        {
            _entities.Add(entity);
        }

        public void Modify(TEntity entity)
        {
            _entities.Update(entity);
        }

        public void Remove(TEntity entity)
        {
            _entities.Remove(entity);
        }
    }
}
