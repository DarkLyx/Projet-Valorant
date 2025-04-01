import { Callout } from "./callout";

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