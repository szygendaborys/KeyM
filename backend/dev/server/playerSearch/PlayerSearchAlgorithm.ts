import PlayerSearch from "../../dataModel/searching/PlayerSearch";
import PlayerSearchModel from "../../models/PlayerSearchModel";
import { Constants } from "../../utilities/Constants";
import Game from "../game/Game";
import PlayerSearchProvider from "./PlayerSearchProvider";

export default class PlayerSearchAlgorithm{
    
    private static _instance:PlayerSearchAlgorithm;

    public static getInstance() {
        if(!PlayerSearchAlgorithm._instance)
            PlayerSearchAlgorithm._instance = new PlayerSearchAlgorithm();

        return PlayerSearchAlgorithm._instance;
    }

    private _delay:number = 5000; //5 seconds
    private _hasFinishedPreviousSearch:boolean = true;
    private _iterationsWithNotDeliveredSearch:number = 0;
    private _dataProvider = new PlayerSearchProvider();

    public async initializeSearch() {
        setInterval(() => {
            if(this._hasFinishedPreviousSearch) {
                try {
                    this._search();
                } catch (error) {
                    console.error("Error");
                    console.error(error);
                    this._hasFinishedPreviousSearch = true;
                }
            } else this._iterationsWithNotDeliveredSearch++;

            if(this._iterationsWithNotDeliveredSearch > 5) this._hasFinishedPreviousSearch = true;
        }, this._delay);        
    }

    private async _search() {
        const games:Game[] = [];

        this._hasFinishedPreviousSearch = false;
        this._iterationsWithNotDeliveredSearch = 0;

        const playerSocketsToRemove:string[] = [];

        this._dataProvider.fetchData().then(data => {
            const { playersInQueue } = data;

            for(const player of playersInQueue) {
                let gameInstance = games.find(game => game.demandedPlayers === player.demandedPlayers && !game.isFull);

                if(!gameInstance) {
                    gameInstance = new Game(player.demandedPlayers, Constants.GameTypes.NORMAL);  
                    games.push(gameInstance);
                }

                gameInstance.addPlayer(player as PlayerSearch);
            }

            for(let i = 0; i < games.length; i++) {
                const gameInstance = games[i];
                if(gameInstance.isFull) {
                    playerSocketsToRemove.push(...gameInstance.socketIds);
                    gameInstance.startGame();
                    games.splice(i, 1);
                }
            }

            console.log(games);

            PlayerSearchModel.removePlayersFromQueue(playerSocketsToRemove).then(() => {
                this._hasFinishedPreviousSearch = true;
            });

        })
    }
}

