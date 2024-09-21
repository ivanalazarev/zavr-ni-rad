using EdunovaAPP.Data;
using EdunovaAPP.Models;
using Microsoft.AspNetCore.Mvc;

namespace EdunovaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ArtiklController : ControllerBase
    {
        // dependency injection
        // 1. definirati privatno svojstvo
        private readonly EdunovaContext _context;

        // dependecy injection
        // 2. proslijediš instancu kroz konstruktor
        public ArtiklController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Artikli);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Artikli.Find(sifra));
        }



        [HttpPost]
        public IActionResult Post(Artikl smjer)
        {
            _context.Artikli.Add(smjer);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, smjer);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Artikl artikal) 
        {
            var artikalBaza = _context.Artikli.Find(sifra);

            // za sada ručno, kasnije mapper
            artikalBaza.Naziv = artikal.Naziv;
            artikalBaza.Sifra = artikal.Sifra;
            artikalBaza.Vrsta = artikal.Vrsta;


            _context.Artikli.Update(artikalBaza);
            _context.SaveChanges();

            return Ok(new {poruka = "Uspješno promjenjeno"});
        
        }



        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var smjerBaza = _context.Artikli.Find(sifra);

            _context.Artikli.Remove(smjerBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno obrisano" });

        }


    }
}
