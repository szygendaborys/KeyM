import PlayerSearch from "../../dataModel/searching/PlayerSearch";
import PlayerSearchModel from "../../models/PlayerSearchModel";

export default class PlayerSearchProvider {

    public async fetchData() {
        const playersInQueue:PlayerSearch[] = await PlayerSearchModel.findPlayersSearching();
    
        return {
            playersInQueue
        }
    }
}