using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace Models
{
    [Table("Automobil")]
    public class Automobil
    {
        [Key]
        public int ID { get; set; }  //primarni kljuc u bazi

        [MaxLength (8)]
        [Required]
        public string Tablice {get; set;}

        [MaxLength(15)]
        public  string Proizvodjac { get; set; }

        [Range(2000,2021)]
        public int GodinaProizvodnje{get;set;}
        
        [MaxLength(30)]
        [Required]
        public string Naziv { get; set; }

        [Required]
        public double PotrosnjaPoKm {get; set;}

        [Required]
        public double SnagaMotora{get; set;}

        [MaxLength(20)]
        public string Boja{get;set;}

    
        [Required]
        public double CenaPoDanuRSD {get;set;}

        //Navigacioni property
        [JsonIgnore]
        public virtual List<Iznajmljivanje> Iznajmljivanja {get;set;}

        [JsonIgnore]
        [Required]
        public Agencija AgencijaAutomobila {get; set;}
    }
}