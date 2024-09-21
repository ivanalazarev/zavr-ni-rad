using System.ComponentModel.DataAnnotations;

namespace EdunovaAPP.Models
{
    public class Artikl 
    {
        [Key]
        public int? IdArtikl { get; set; }
        public int? Sifra { get; set; }
        public string? Naziv { get; set; }
        public string? Vrsta { get; set; }
    }
}
