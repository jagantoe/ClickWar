import { Castle } from "./castle";
import { Fighter } from "./fighter";

export interface GameState {
    winner: string;
    redCastle: Castle;
    blueCastle: Castle;
    fighters: Fighter[];
}