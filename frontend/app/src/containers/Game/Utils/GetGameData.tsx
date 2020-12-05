const api = '/api/room/';
export const getGameData = async (roomId:string) => {
    return await fetch(api + roomId).then(async res => {
        if(!res.ok)
            throw res;

        return await res.json();
    }).catch(err => {
        console.error(err);
    })
}