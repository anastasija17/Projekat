using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace Models
{
    [Table("Agencija")]
    public class Agencija
    {
        [Key]
        public int ID;

        [Required]
        [MaxLength(30)]
        public string Naziv {get; set;}

        [Required]
        [MaxLength]
        public string Lokacija {get; set;}

        [JsonIgnore]
        public virtual  List<Automobil> AutomobiliZaIznajmljivanje{ get; set; }
        [JsonIgnore]

        public virtual  List<Korisnik> KorisniciAgencije{ get; set; }


    }
    
}