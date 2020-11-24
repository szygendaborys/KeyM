import { prop, Typegoose, arrayProp } from '@hasezoey/typegoose';

export default class TestModel extends Typegoose {

    @prop({ required: true })
    userName: string;

    @prop({ required: true })
    password: string;

    @prop ({ required: false})
    passwordHistory: string[];

    @prop ({ required: false })
    passwordExpiration: Date;

    @prop({ required: true })
    email: string;

    @prop({ required: true })
    isActive: boolean;

    @prop({ required: true })
    isAdmin: boolean;

    @prop({required: false})
    phoneNumber:string;

    @prop({ required: false })
    resetToken: string | undefined;

    @prop({ required: false })
    resetTokenExpiration: Date | undefined;    

    constructor() {
        super();
        this.passwordHistory = [];
        this.passwordExpiration = new Date(9999, 12, 31);
        this.phoneNumber = "";
        this.userName = "";
        this.email = "";
        this.password = "";
        this.isAdmin = false;
        this.isActive = true;
        this.resetToken = "";
        this.resetTokenExpiration = new Date(1960, 1, 1);
               
    }
}