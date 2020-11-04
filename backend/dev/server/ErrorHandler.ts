import * as EN from './errorHandling/errorMessages';
import { Constants } from '../utilities/Constants';

export default class ErrorHandler extends Error {
    public statusCode: number;
    public message: string;
    public data?: string;
    private fileLangs: any;
    private errorFile: any;
    private pattern_x: any;
    constructor(statusCode: number, msgCode: string, lang:Constants.Languages = Constants.Languages.ENGLISH, params?:any) {
        super();
        this.statusCode = statusCode;
        this.fileLangs = {
            EN
        }
        this.errorFile = this.getFile(lang);
        if(params && params.x!=undefined)
        {
            this.pattern_x = params.x;
            params = undefined;
        }
        this.message = this.fetchErrorMessage(this.errorFile , msgCode, params);
        if(this.pattern_x!=undefined && this.message.includes("$x"))
        {
            //x-opcjonalny parametr który dla wyrażenia $x w tekście podstawi wartość liczbową
            this.message = this.message.replace('$x',this.pattern_x.toString());
        }
        console.error(this.message);
    }
    private fetchErrorMessage = (file:any, msgCode: string, params?: any) => !params ? file[msgCode] : file[msgCode](params);
    private getFile = (lang:string) => this.fileLangs[lang];
}