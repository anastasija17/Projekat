using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;


using Models;
namespace Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class KorisnikController : ControllerBase
    {

        public RentaCarContext Context;

        public KorisnikController(RentaCarContext context)
        {
            Context = context;
        }

        [Route("PreuzmiIzanajmljivanjaZaKorisnika/{IDKorisnika}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiIzanajmljivanjaZaKorisnika(int IDKorisnika){
            try{
                var korisnik = await Context.Korisnici.FindAsync(IDKorisnika);
                if(korisnik == null)
                    throw new Exception("Ne postoji taj korisnik!");
                var iznajmljivanja = await Context.Najmovi.Include(p=>p.Korisnik).Include(p=>p.Automobil).Where(p=>p.Korisnik.ID == IDKorisnika)
                .Select(p=>new {
                    id = p.ID,
                    nazivAutomobila = p.Automobil.Naziv,
                    tabliceAutomobila = p.Automobil.Tablice,
                    datumOd = p.Datum_Iznajmljivanja,
                    datumDo = p.Datum_Vracanja
                }).ToListAsync();

                return Ok(iznajmljivanja);
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajIznajmljivanjeZaKorisnika/{IDKorisnika}/{IDAutomobila}/{Datum1}/{Datum2}")]
        [HttpPost]
        public async Task<ActionResult> DodajIzanajmljivanjaZaKorisnika(int IDKorisnika,int IDAutomobila,DateTime Datum1,DateTime Datum2)
       {
           if(DateTime.Compare(Datum1,DateTime.Today)<0)
           {
                return BadRequest("Nevalidan unos datuma za pocetak iznajmljivanja!!!");
           }
           if(DateTime.Compare(Datum2,DateTime.Today)<0)
           {
              return BadRequest("Nevalidan unos datuma za kraj iznajmljivanja!!!"); 
           }
           if(Datum1 > Datum2){
               return BadRequest("Nevalidan unos datuma za kraj iznajmljivanja!!!"); 
           }
           try{
                    var auto=await Context.Automobili.FindAsync(IDAutomobila);
                    if(auto==null)
                    throw new Exception("Nepostojeci auto");
                    var korisnik=await Context.Korisnici.FindAsync(IDKorisnika);
                    if(korisnik==null)
                    throw new Exception("Nepostojeci korisnik");

                    var izn=new Iznajmljivanje();
                     izn.Datum_Iznajmljivanja=Datum1;
                     izn.Datum_Vracanja=Datum2;
                     izn.Korisnik=korisnik;
                     izn.Automobil=auto;
                Context.Najmovi.Add(izn);


                await Context.SaveChangesAsync();
                return Ok($"Uspesno dodato iznajmljivanje sa ID-jem {izn.ID}!!!");


           }
           catch(Exception e)
           {
               return BadRequest(e.Message);
           }

       }


        [Route("DodajKorisnika/{Ime}/{Prezime}/{Telefon}/{IDAgenicje}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj(string Ime,string Prezime,string Telefon, int IDAgenicje)
        {
            if (Ime.Length < 3)
            {
                return BadRequest("Nevalidan unos imena!!!");
            }

            if (Prezime.Length < 4)
            {
                return BadRequest("Nevalida unos prezimena!!!");
            }

            if (Telefon.ToString().Length < 10 && string.IsNullOrWhiteSpace(Telefon.ToString()))
            {
                return BadRequest("Nevalidan unos telefona!!!");
            }


            try
            {
                var ag = await Context.Agencije.FindAsync(IDAgenicje);
                if(ag == null)
                    throw new Exception("Ne postoji Agencija");
                var k=new Korisnik();
                k.Ime=Ime;
                k.Prezime=Prezime;
                k.Telefon=Telefon;
                k.PripadaAgenciji = ag;
                Context.Korisnici.Add(k);


                await Context.SaveChangesAsync();
                return Ok($"Uspesno dodat korisnik sa ID-jem {k.ID}!!!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("PromeniDatum/{IDIznajmljivanja}/{Datum}")]
        [HttpPut]
        public async Task<ActionResult> PromeniDatum(int IDIznajmljivanja, DateTime Datum){
            try{
                var izn = await Context.Najmovi.Where(p=> p.ID == IDIznajmljivanja).FirstAsync();
                if(izn == null)
                    throw new Exception("Ne postoji to iznajmljivanje!");
                izn.Datum_Vracanja = Datum;
                Context.Update(izn);
                await Context.SaveChangesAsync();
                return Ok("Promenljeno!");
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }



        [Route ("ObrisiKorisnika/{id}")]
        [HttpDelete]
         public async Task<ActionResult> IzbrisiKorisnika(int id)
        {
            if(id<=0)
            {
                return BadRequest("Pogresan ID!!!");
            }
            try
            { 
                var korisnik=await Context.Korisnici.FindAsync(id);
                if(korisnik == null)
                    throw new Exception("Ne postoji korisnik!");
                string  ime=korisnik.Ime;
                string prezime=korisnik.Prezime;
                Context.Korisnici.Remove(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno obrisan korisnik:{ime}{prezime}");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("ObrisiIznajmljivanje/{IDIznajmljivanja}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiIznajmljivanje(int IDIznajmljivanja)
        {
            try{
                var izn = await Context.Najmovi.Where(p=> p.ID == IDIznajmljivanja).Include(p=> p.Automobil).FirstAsync();
                if(izn == null)
                    throw new Exception("Ne postoji to iznajmljivanje!");
                Context.Najmovi.Remove(izn);
                await Context.SaveChangesAsync();
                return Ok("Izbrisano!");
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiKorisnikeIzAgencije/{IdAgencije}")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi(int IdAgencije)
        {
         try{
                var ag = await Context.Agencije.FindAsync(IdAgencije);
                if(ag == null)
                    throw new Exception("Nepostojeca Agencija");
                var korisnici = await Context.Korisnici.Include(a=> a.PripadaAgenciji).Where(p=> p.PripadaAgenciji.ID == IdAgencije)
                .Select(p=> new {p.ID, p.Ime, p.Prezime, p.Telefon,}).ToListAsync();
                return Ok(korisnici);
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    


    }
}
