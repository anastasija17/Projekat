using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
namespace Models
{
    [Table("Iznajmljivanje")]
    public class Iznajmljivanje
    {
        [Key]
        public int ID { get; set; }

    
        public virtual Korisnik Korisnik {get;set;}

        public virtual Automobil Automobil{get;set;}

        [Required]
        public DateTime Datum_Iznajmljivanja { get; set; }

        
        public DateTime Datum_Vracanja {get ;set;}


    }

}