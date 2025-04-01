import { Callout } from "./callout";

export interface Map {
    id : string;
    name : string;
    image : string;
    callouts : Callout[];
}