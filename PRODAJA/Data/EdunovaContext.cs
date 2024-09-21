using EdunovaAPP.Models;
using Microsoft.EntityFrameworkCore;

namespace EdunovaAPP.Data
{
    public class EdunovaContext:DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> opcije) : base(opcije) 
        {
        
        }


        public DbSet<Artikl> Artikli { get; set; }


    }
}
