module RedisAffixes {
    export enum Prefixes {
        ENGLISH = 'EN'
    };
    export enum Suffixes {
        PLAYER_POINTS = ':points',
        PLAYER_TEXT = ':text',
        PLAYERS = ':players',
    }
}

export default RedisAffixes;