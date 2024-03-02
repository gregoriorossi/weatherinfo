import { injectable } from "inversify";
import { IFavoriteLocation } from "../models/favorite-locations.models";
import { IFavoriteLocationsService } from "../models/services.models";
import { IWeatherInfoResponse } from "../models/weatherInfo.models";
import { CookieUtils } from "../utils/cookies.utils";
import { StringUtils } from "../utils/string.utils";



@injectable()
export class FavoriteLocationsService implements IFavoriteLocationsService {

    private static CookieName: string = "favoriteLocations";
    private static CookieExpirationDays: number = 5;

    GetFavoriteLocations = ():IFavoriteLocation[] => {
        const favoriteLocations = this.GetFavoriteLocationsFromCookie();
        return favoriteLocations;
    }

    SetFavoriteLocation(location: IWeatherInfoResponse): void {
        const key: string = this.BuildKey(location);
        
        const newLocation: IFavoriteLocation = {
            Name: location.name,
            Country: location.country,
            Lat: location.coordinates.lat,
            Lon: location.coordinates.lon,
            Key: key
        };

        
        const favoriteLocations: IFavoriteLocation[] = this.GetFavoriteLocationsFromCookie();
        favoriteLocations.push(newLocation);

        CookieUtils.SetCookie(FavoriteLocationsService.CookieName, JSON.stringify(favoriteLocations), FavoriteLocationsService.CookieExpirationDays);
    }

    DeleteFavoriteLocation(location: IWeatherInfoResponse): void {
        const favoriteLocations: IFavoriteLocation[] = this.GetFavoriteLocationsFromCookie();
        const key: string = this.BuildKey(location);

        const result = favoriteLocations.filter(x => x.Key !== key);
        CookieUtils.SetCookie(FavoriteLocationsService.CookieName, JSON.stringify(result), FavoriteLocationsService.CookieExpirationDays);
    }

    IsFavoriteLocation(location: IWeatherInfoResponse): boolean {
        const favoriteLocations: IFavoriteLocation[] = this.GetFavoriteLocationsFromCookie();
        const key: string = this.BuildKey(location);

        const result: number = favoriteLocations
            .map(x => x.Key)
            .indexOf(key);

        const isFavorite: boolean = result > -1;
        return isFavorite;
    }

    private BuildKey(location: IWeatherInfoResponse): string {
        return `${location.name}${location.country}`;
    }

    private GetFavoriteLocationsFromCookie = (): IFavoriteLocation[] => {
        const favoriteLocationsStr = CookieUtils.GetCookie(FavoriteLocationsService.CookieName);

        if (StringUtils.IsNullOrEmpty(favoriteLocationsStr)) {
            return [];
        }

        const favoriteLocations: IFavoriteLocation[] = JSON.parse(favoriteLocationsStr);
        return favoriteLocations;
    }
}