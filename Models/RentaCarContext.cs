using Microsoft.EntityFrameworkCore;
 
namespace Models
{
    public class RentaCarContext:DbContext
    {
        public DbSet<Automobil> Automobili{ get; set; }
        public DbSet<Korisnik> Korisnici{ get; set; }
        public DbSet<Iznajmljivanje> Najmovi{ get;set;}

        public DbSet<Agencija> Agencije{ get; set; }

        public RentaCarContext(DbContextOptions options):base(options)
        {
                
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){

            modelBuilder.Entity<Agencija>().Property(p => p.ID).IsRequired();

            base.OnModelCreating(modelBuilder);
        }
   
    }
}