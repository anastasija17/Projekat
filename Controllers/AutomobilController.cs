using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace RentaCar.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AutomobilController : ControllerBase
    {
        public RentaCarContext Context;
        

        public AutomobilController(RentaCarContext context)
        {
            Context = context;
        }
        [Route("PreuzmiDostupneAutomobile/{IdAgencije}/{DatumOd}/{DatumDo}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiDostupneAutomobile(int IdAgencije, DateTime DatumOd, DateTime DatumDo){
            try{
                var ag = await Context.Agencije.FindAsync(IdAgencije);
                if(ag == null)
                    throw new Exception("Nepostojeca Agencija");
                var automobili = await Context.Automobili.Include(a=> a.AgencijaAutomobila).Where(p=> p.AgencijaAutomobila.ID == IdAgencije)
                .ToListAsync();
                foreach(var auto in automobili.ToList()){
                    bool brisi = false;
                    var iznaj = await Context.Najmovi.Include(p=>p.Automobil).Where(p=> p.Automobil.ID == auto.ID).ToListAsync();
                    foreach(var izn in iznaj.ToList()) {
                        if((DatumOd >= izn.Datum_Iznajmljivanja && DatumOd <= izn.Datum_Vracanja) || (DatumDo >= izn.Datum_Iznajmljivanja && DatumDo <= izn.Datum_Vracanja)||
                        (izn.Datum_Iznajmljivanja >= DatumOd && izn.Datum_Iznajmljivanja <= DatumDo) || (izn.Datum_Vracanja >= DatumOd && izn.Datum_Vracanja <= DatumDo)){
                            brisi = true;
                        } 
                    }
                    if(brisi)
                        automobili.Remove(auto);
                }
                return Ok(automobili);
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }


        [Route("PreuzmiAutomobilIzAgencije/{IdAgencije}")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi(int IdAgencije)
        {
         try{
                var ag = await Context.Agencije.FindAsync(IdAgencije);
                if(ag == null)
                    throw new Exception("Nepostojeca Agencija");
                var automobili = await Context.Automobili.Include(a=> a.AgencijaAutomobila).Where(p=> p.AgencijaAutomobila.ID == IdAgencije)
                .Select(p=> new {p.ID, p.Proizvodjac, p.Naziv, p.GodinaProizvodnje,p.Boja,p.CenaPoDanuRSD}).ToListAsync();
                return Ok(automobili);
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiAutomobilIzAgencijeSve/{IdAgencije}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiAutomobilIzAgencijeSve(int IdAgencije)
        {
         try{
                var ag = await Context.Agencije.FindAsync(IdAgencije);
                if(ag == null)
                    throw new Exception("Nepostojeca Agencija");
                var automobili = await Context.Automobili.Include(a=> a.AgencijaAutomobila).Where(p=> p.AgencijaAutomobila.ID == IdAgencije)
                .ToListAsync();
                return Ok(automobili);
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajAutomobil/{Tablice}/{Proizvodjac}/{Godina}/{Potrosnja}/{Naziv}/{SnagaMotora}/{Boja}/{Cena}/{IDAgencije}")]
        [HttpPost]
        public async Task<ActionResult> DodajAutomobil(string Tablice,string Proizvodjac,int Godina,string Naziv,int SnagaMotora,string Boja,int Cena,float Potrosnja,int IDAgencije)
        {
              if(Godina<2000 ||Godina>2021)
              {
                  return BadRequest("Nevalidna godina proizvodnje!!!");
              }

              if(string.IsNullOrWhiteSpace(Proizvodjac))
              {
                  return BadRequest("Nevalidan proizodjac!!!");
              }

              if(string.IsNullOrWhiteSpace(Naziv))
              {
                  return BadRequest("Nevalidan naziv automobila!!!");
              }

              if((Tablice.Length<8 || Tablice.Length>8))
              {
                  return BadRequest("Nevalidna tablica!!!");
              }

              if(Cena<1000)
              {
                  return BadRequest("Nevalidna cena po danu iznajmljivanja!!!");
              }

              if(SnagaMotora<=0)
              {
                  return BadRequest("Nevalidna snaga motora!!!");
              }

              if(Potrosnja<=0)
              {
                  return BadRequest("Nevalidna potrosnaj goriva!!!");
              }
              if(string.IsNullOrWhiteSpace(Boja))
              {
                  return BadRequest("Nevalidna boja!!!");
              }


              try
              {
                var ag = await Context.Agencije.FindAsync(IDAgencije);
                if(ag == null)
                    throw new Exception("Ne postoji Agencija");
                var a=new Automobil();
                a.Naziv=Naziv;
                a.Tablice=Tablice;
                a.Boja=Boja;
                a.Proizvodjac=Proizvodjac;
                a.AgencijaAutomobila=ag;
                a.CenaPoDanuRSD=Cena;
                a.PotrosnjaPoKm=Potrosnja;
                a.GodinaProizvodnje=Godina;
                a.SnagaMotora=SnagaMotora;
                Context.Automobili.Add(a);


                await Context.SaveChangesAsync();
                return Ok($"Uspesno dodat automobil sa ID-jem {a.ID}!!!");
                
              }
              catch(Exception e)
              {
                  return BadRequest(e.Message);
              }
        }

    }
    
}