import { Model } from 'mongoose';
import { prop, staticMethod, Typegoose } from 'typegoose';

export default class PlayerSearch extends Typegoose {

    @prop({ required: true, maxlength: 20 })
    username: string;

    @prop({ required: true, maxlength: 40 })
    socketId: string;

    @prop({ required: true, min: 2, max: 4})
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

    @staticMethod
    public static async findPlayersSearching<T>(this: Model<InstanceType<T | any>, {}> & T):Promise<PlayerSearch[]> {
        // @ts-ignore
        return this.find({},{_id:0}).lean().exec();
    }

    @staticMethod
    public static async addPlayerToQueue<T>(this: Model<InstanceType<T | any>, {}> & T, username:string, socketId:string, demandedPlayers:number) {
        await this.create(new PlayerSearch(username, socketId, demandedPlayers));
    }

    @staticMethod
    public static async removePlayersFromQueue<T>(this: Model<InstanceType<T | any>, {}> & T, socketIds:string[]) {
        await this.deleteMany({socketId:{$in:socketIds}});
    }
    
    // instance methods
    // public async setSpeciesAndSave(this: DocumentType<KittenClass>, species: string) {
    //     this.species = species;
    //     return await this.save();
    // }
}