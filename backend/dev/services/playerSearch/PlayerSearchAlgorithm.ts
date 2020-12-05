import { Constants } from "../../utilities/Constants";
import Game from "../game/Game";
import PlayerSearchDTO from "./PlayerSearchDTO";

export default abstract class PlayerSearchAlgorithm {

    protected _playersPool:Map<string, PlayerSearchDTO> = new Map();

    private _delay:number = 5000 // 5 sec delay iterations
    private _iterationsWithNotDeliveredSearch:number = 0;
    private _hasFinishedPreviousSearch:boolean = true;

    protected initSearch() {
        setInterval(() => {
            if(this._hasFinishedPreviousSearch) {
                try {
                    this._search();
                } catch (error) {
                    console.error("Error search");
                    console.error(error);
                    this._hasFinishedPreviousSearch = true;
                }
            } else this._iterationsWithNotDeliveredSearch++;

            if(this._iterationsWithNotDeliveredSearch > 5) this._hasFinishedPreviousSearch = true;
        }, this._delay);        
    }

    private _search() {
        const games:Game[] = [];
        this._hasFinishedPreviousSearch = false;
        this._iterationsWithNotDeliveredSearch = 0;

        const playerSocketsToRemove:string[] = [];
        for(const [socketId, player] of this._playersPool.entries()) {
            let gameInstance = games.find(game => game.demandedPlayers === player.demandedPlayers && !game.isFull);
            if(!gameInstance) {
                gameInstance = new Game(player.demandedPlayers, Constants.GameTypes.NORMAL);  
                games.push(gameInstance);
            }
            gameInstance.addPlayer(player);
    
            for(let i = 0; i < games.length; i++) {
                const gameInstance = games[i];
                if(gameInstance.isFull) {
                    playerSocketsToRemove.push(...gameInstance.socketIds);
                    gameInstance.startGame();
                    games.splice(i, 1);
                }
            }
        }

        // remove players that started the game from pool
        playerSocketsToRemove.map(socketId => this._playersPool.delete(socketId));
        console.log(this._playersPool.size)

        this._hasFinishedPreviousSearch = true;
    }

}