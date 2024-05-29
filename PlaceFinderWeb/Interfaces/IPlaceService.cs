using PlaceFinderWeb.Models;

namespace PlaceFinderWeb.Interfaces;

public interface IPlaceService
{
   List<Place> ReadAll();
}