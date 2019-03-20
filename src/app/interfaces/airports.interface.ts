export interface IAirports {

    iataCode: String;
    name: string;
    seoName: string;
    coordinates: Coordinate;
    base: Boolean;
    countryCode: String;
    regionCode: String;
    cityCode: String;
    currencyCode: String;
    routes: [String];
    seasonalRoutes: [String];
    categories: [String];
    priority: Number;
}

class Coordinate {
    latitude: String;
    longitude: String;
}
