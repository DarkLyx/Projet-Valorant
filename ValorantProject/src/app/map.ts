import { Callout } from "./callout";

// Map = Comme MapInfo avec un peu moins d'informations car utile seulement pour la sélection de map et non aps pour le détail

export interface Map {
    id : string;
    name : string;
    image : string;
    callouts : Callout[];
}