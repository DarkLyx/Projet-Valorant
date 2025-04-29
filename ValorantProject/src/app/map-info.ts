import { Callout } from "./callout";

// MapInfo = C'est une carte du jeu, qui contient des informations sur la carte, comme son nom, son image, sa mini-map, etc.

export interface MapInfo {
    id : string;
    name : string;
    miniMap : string;
    banniereHorizontal : string;
    banniereVertical : string;
    background : string;
    image : string;
    callouts : Callout[];
}