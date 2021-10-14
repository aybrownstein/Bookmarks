using System;
using Microsoft.EntityFrameworkCore;

namespace Bookmarks.Data
{
    public class BookmarkContext : DbContext
    {
        private readonly string _connectionString;

        public BookmarkContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TopFive>().HasNoKey().ToView("view_that_doesn't_exist");
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }

        public DbSet<TopFive> Tops { get; set; }
    }
}

