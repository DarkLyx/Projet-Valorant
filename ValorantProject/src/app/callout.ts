import { LocationMap } from "./location-map";

// Callout = C'est une zone spécial, qui est définie par un nom et une position (x,y) sur la map
// Ce sont les boutons rouges que vous pouvez voir sur la mini-map d'une carte (map)

export interface Callout {
    regionName: string;
    site: string;
    location: LocationMap[];
}