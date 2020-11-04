
import * as express from "express";
import { Constants } from "../../utilities/Constants";
import ErrorHandler from "../ErrorHandler";
import * as ERR_CODE from '../errorHandling/errorConstants';
import Controller from "../interfaces/controller.interface";

export class HomeController implements Controller {
    public path: string = '/home';
    public router = express.Router();
    public endOfTheWorld: Date = new Date(9999, 12, 31);

    // model inits
    // public static testModel = new Test(
    //     '', Constants.Tests.Test, new Date(), new Date(), true, 0, 0
    // ).getModelForClass(Test);

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.testRoute);
        // this.router.post(this.path, this.testtest);
    }
    
    private testRoute = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.status(200).json({
                message: 'All great mate!'
            })
        } catch (err) {
            if(!err.statusCode) 
                err.statusCode = 500;
            next(err);
        }
    };
}
