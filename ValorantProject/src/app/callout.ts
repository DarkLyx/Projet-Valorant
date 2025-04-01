import { LocationMap } from "./location-map";

export interface Callout {
    regionName: string;
    site: string;
    location: LocationMap[];
}