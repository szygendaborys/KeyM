import { Model } from 'mongoose';
import { prop, Typegoose, arrayProp, ModelType } from 'typegoose';
import { Constants } from '../../utilities/Constants';

/*
*   The basic formula of finding players
*   Match .length ==== to 'x' players needed
*   If the game is a ranked game there would be additional fields: rank and iterations
*   Finding player would suggest to find the closest opponent to rank of this particular player
*   So a player's been added to player search queue
*   
*   CRON Job ran each 3 seconds finds group of players looking for a game (on decline or disconnect - remove this player from the queue)
*   
*   
*   
*   
*   
*   
*/

export default class PlayerSearch extends Typegoose {

    @prop({ required: true, maxlength: 20 })
    username: string;

    @prop({ required: true, maxlength: 40 })
    socketId: string;

    @prop({ required: true, enum: Constants.PlayerNumbers})
    demandedPlayers: number;

    @prop({ required: true, max: 4 })
    iterations: number; // TODO: For the further development of ranked feature

    constructor(username:string = '', socketId:string = '', demandedPlayers:number = 2) {
        super();
        this.username = username;
        this.socketId = socketId;
        this.demandedPlayers = demandedPlayers;
        this.iterations = 1;
    }

    public static async findPlayersSearching<T>(this: Model<InstanceType<T | any>, {}> & T) {
        return this.find({},{_id:0}).exec();
    }

    public static async addPlayerToQueue<T>(this: Model<InstanceType<T | any>, {}> & T, username:string, socketId:string, demandedPlayers:number) {
        this.create(new PlayerSearch(username, socketId, demandedPlayers));
    }

    public static async removePlayerFromQueue<T>(this: Model<InstanceType<T | any>, {}> & T, socketId:string) {
        this.deleteOne({socketId});
    }
    
    // instance methods
    // public async setSpeciesAndSave(this: DocumentType<KittenClass>, species: string) {
    //     this.species = species;
    //     return await this.save();
    // }
}