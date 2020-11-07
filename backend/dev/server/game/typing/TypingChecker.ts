import PointHandler from "../points/PointsHandler";

export default class TypingChecker {

    private _pointsHandler:PointHandler;

    private _gameText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    constructor(pointsHandler:PointHandler) {
        this._pointsHandler = pointsHandler;
    }

    public checkChar(char:string, at:number) {
        console.log(this._gameText.charAt(at))
        console.log(char);

        console.log(this._gameText.charAt(at) === char)
        return this._gameText.charAt(at) === char;
    }
}