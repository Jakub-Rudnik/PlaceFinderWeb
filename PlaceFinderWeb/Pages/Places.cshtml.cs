using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PlaceFinderWeb.Models;
using PlaceFinderWeb.Services;

namespace PlaceFinderWeb.Pages;

public class Places : PageModel
{
    private PlaceService _placeService;

    public Places(DatabaseContext context)
    {
        _placeService = new PlaceService(context);
    }
    
    public JsonResult OnGet()
    {
        return new JsonResult(_placeService.ReadAll());
    }
}