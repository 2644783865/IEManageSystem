﻿using IEManageSystem.Help.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class ContentPage : PageBase
    {
        public ContentPage(string name) : base(name)
        {
        }

        public void AddPageData(PageData pageData)
        {
            if (PageDatas.Any(item => item.Name == pageData.Name)) {
                throw new MessageException($"文章{pageData.Name}已存在，请重新命名");
            }

            PageDatas.Add(pageData);
        }

        public void SetPageDataName(int pageDataId, string Name)
        {
            var pageData = PageDatas.FirstOrDefault(e => e.Id == pageDataId);
            if (PageDatas.Any(item => item.Name == Name && item != pageData)) {
                throw new MessageException($"文章{pageData.Name}已存在，请重新命名");
            }

            pageData.Name = Name;
        }

        public void SetPageDataTitle(int pageDataId, string title)
        {
            var pageData = PageDatas.FirstOrDefault(e => e.Id == pageDataId);

            pageData.Title = title;
        }
    }
}
