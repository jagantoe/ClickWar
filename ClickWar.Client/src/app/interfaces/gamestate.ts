import { Castle } from "./castle";
import { Fighter } from "./fighter";

export interface GameState {
    redCastle: Castle;
    blueCastle: Castle;
    fighters: Fighter[];
}