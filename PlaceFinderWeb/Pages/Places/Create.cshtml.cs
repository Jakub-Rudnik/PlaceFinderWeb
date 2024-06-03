using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PlaceFinderWeb.Models;
using PlaceFinderWeb.Persistence;

namespace PlaceFinderWeb.Pages.Places;

public class Create : PageModel
{
    private PlaceFinderDbContext _dbContext;
    private readonly IWebHostEnvironment _environment;
    
    public Create(PlaceFinderDbContext dbContext, IWebHostEnvironment environment)
    {
        _dbContext = dbContext;
        _environment = environment;
    }

    [BindProperty] public Place 
    Place { get; set; } = default!;
   
    [BindProperty, Display(Name = "Place Image")]
    public IFormFile PlaceImage { get; set; }
    
    public IActionResult OnGet()
    {
        return Page();
    }
    
    public async Task<IActionResult> OnPost()
    {
        
        ModelState.Remove("Place.ImageUrl");
        if (!ModelState.IsValid) 
        {
            return Page();
        }
            
        string uniqueFileName = DateTime.Now.ToString("yyyyMMddHHmmssfff") + "_" + PlaceImage.FileName;
        Place.ImageUrl = uniqueFileName;
       
        var imageFile = Path.Combine(_environment.WebRootPath, "images", "places", uniqueFileName);

        await using var fileStream = new FileStream(imageFile, FileMode.Create);
        await PlaceImage.CopyToAsync(fileStream);
        
        _dbContext.Places.Add(Place);
        await _dbContext.SaveChangesAsync();
            
        return RedirectToPage("/Index");
    }
}