using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Korisnik")]
    public class Korisnik
    {
        [Key]
        public int ID { get; set; }  

        [Required]
        [MaxLength (30)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(50)]

        public string Prezime { get; set; }

         [Phone]
        public string Telefon {get; set;}

         //Navigacioni property 
         [JsonIgnore]
        public virtual List<Iznajmljivanje> Iznajmljivanja {get;set;}

        [JsonIgnore]
        public virtual Agencija PripadaAgenciji {get; set;}

    }
}
