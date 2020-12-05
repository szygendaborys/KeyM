
import * as express from "express";
import mongoose from "mongoose";
import Controller from "../interfaces/controller.interface";
import RoomManager from "../services/game/room/RoomManager";

export class RoomController implements Controller {
    public path: string = '/room';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(`${this.path}/:roomId`, this.getRoom);
    }
    
    private getRoom = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.roomId.toString());
            let data = {};

            if(id) {
                data = await new RoomManager(id).getAllPlayersData();
            }

            res.status(200).json({
                data
            })
        } catch (err) {
            if(!err.statusCode) 
                err.statusCode = 500;
            next(err);
        }
    };
}
