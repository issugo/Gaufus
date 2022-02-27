export type AppState = "null" | "signin" | "createPlayer" | "map" | "stats" | "combat" | "description";
export type CombatState = "null" | "playerTurn" | "iaTurn" | "finished";

export type PlayerClass = "guerrier" | "mage" | "assassin" | "noset";
export type Sens =  "left" | "right" | "up" | "down";
export type Position = {x: number, y: number};

export type Player = {
    nickname: string,
    classe: PlayerClass,
    hp: number,
    mana: number,
    dexterite: number,
    level: number,
    spellgrid: Array<Array<number>>,
    sens: Sens,
    position: Position
}

export type ActionType = "null" | "moveSelf" | "moveEnnemy" | "damageSelf" | "damageEnnemy" | "heal";

export type Spell = {
    id: number,
    name: string,
    alt: string,
    actionType: ActionType | string,
    rangeOfEffect: number
}

export type EnnemyType = "male" | "female"

export type Ennemy = {
    sens: Sens | string,
    type: EnnemyType | string,
    hp: number,
    x: number,
    y: number
}