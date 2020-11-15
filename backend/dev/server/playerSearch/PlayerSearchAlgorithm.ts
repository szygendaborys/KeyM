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
    private _dataProvider = new PlayerSearchProvider();
    
    public async initializeSearch() {
        setInterval(() => {
            if(this._hasFinishedPreviousSearch)
                this._search();
        }, this._delay);        
    }

    private async _search() {
        this._hasFinishedPreviousSearch = false;
        
        this._dataProvider.fetchData().then(data => {
            // games Map - create a game class
            const { playersInQueue } = data;


            for(const player of playersInQueue) {
                console.log("searching...");


            }

            this._hasFinishedPreviousSearch = true;
        })
    }
}