﻿using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.Repositorys
{
    public interface IEfRepository<TEntity, TPrimaryKey> : IRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        IQueryable<TEntity> ThenInclude<ThenType>(
            Expression<Func<TEntity, IEnumerable<ThenType>>> includePath,
            Expression<Func<ThenType, object>> thenIncludePath);
    }
}
