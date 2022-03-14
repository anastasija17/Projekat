using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AgencijaController : ControllerBase
    {

        public RentaCarContext Context;

        public AgencijaController(RentaCarContext context)
        {
            Context = context;
        }
        [Route("PreuzmiAgencije")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiAgencije()
        {
            try{
            var agencija = await Context.Agencije.Select(p=>new {
                id = p.ID,
                naziv = p.Naziv,
                lokacija = p.Lokacija
            }).ToListAsync();
            return Ok(agencija);
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [EnableCors("CORS")]
        [Route ("DodajAgenciju")]
        [HttpPost]
        public async Task<ActionResult> DodajAgenciju([FromBody] Agencija agencija)
        {
            if(agencija.Naziv.Length<3)
            {
                return BadRequest("Nevalidan naziv agencije!!!");
            }
            if(agencija.Lokacija.Length<2)
            {
                return BadRequest("Nevalidna lokacija!!!");
            }

            try
              {

                  Context.Agencije.Add(agencija);
                  await Context.SaveChangesAsync();
                  return Ok($"Uspesno dodata agencija sa ID-jem: {agencija.ID}");
              }
              catch(Exception e)
              {
                  return BadRequest(e.Message);
              }
        }

        
        [Route ("ObrisiAgenciju")]
        [HttpDelete]
         public async Task<ActionResult> IzbrisiAgenciju(int id)
        {
            if(id<=0)
            {
                return BadRequest("Pogresan ID!!!");
            }
            try
            { 
                var agencija=await Context.Agencije.FindAsync(id);
                if(agencija == null)
                    return BadRequest("Ne postojeca agencija!");
                string naziv=agencija.Naziv;
                Context.Agencije.Remove(agencija);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno obrisana agencija:{naziv}");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}