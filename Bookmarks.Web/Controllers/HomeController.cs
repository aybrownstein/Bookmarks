using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Bookmarks.Data;
using Bookmarks.Web.ViewModels;

namespace Bookmarks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HomeController : ControllerBase
    {
        private readonly string _connectionString;
        public HomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        private User GetCurrentUser()
        {
            var repo = new BookmarkRepository(_connectionString);
            var user = repo.GetByEmail(User.Identity.Name);
            return user;
        }

        [HttpPost]
        [Route("add")]
        public void Add(Bookmark bookmark)
        {
            var user = GetCurrentUser();
            var repo = new BookmarkRepository(_connectionString);
            bookmark.UserId = user.Id;
            repo.Add(bookmark);
        }

        [HttpGet]
        [Route("getmybookmarks")]
public List<Bookmark> GetMyBookmarks()
        {
            var user = GetCurrentUser();
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetBookmarks(user.Id);
        }

        [HttpPost]
        [Route("updatetitle")]
        public void UpdateTitle(UpdateTitleViewModel viewModel)
        {
            var user = GetCurrentUser();
            var repo = new BookmarkRepository(_connectionString);
            repo.UpdateBookmark(viewModel.Title, viewModel.BookmarId);
        }

        [HttpPost]
        [Route("delete")]
        public void Delet(DeleteViewModel viewModel)
        {
            var user = GetCurrentUser();
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(viewModel.BookmarkId);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("topfive")]
        public List<TopFive> GetTopFiveBookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetTopFive();
        }
    }
    
}
