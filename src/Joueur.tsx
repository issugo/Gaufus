import { Sens, PlayerClass } from "./type";

class Joueur {
    uid: number;
    nickname: string;
    classe: PlayerClass;
    sens: Sens;
    hp: number;
    mana: number;
    dexterite: number;
    spellgrid: Array<Array<number>>
    x: number;
    y: number;
    dead: boolean;
    level: number;

    constructor(_uid = 0, _nickname: string = "", _classe: PlayerClass = "noset", _sens: Sens = "up", _hp: number = 90, _mana: number = 90, _dexterite: number = 90, _x: number = 0, _y: number = 0, _dead: boolean = false, _spellgrid: Array<Array<number>> = [[0,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]], _level: number = 1) {
        this.uid = _uid;
        this.nickname = _nickname;
        this.classe = _classe;
        this.sens = _sens;
        this.hp = _hp;
        this.mana = _mana;
        this.dexterite = _dexterite;
        this.spellgrid = _spellgrid;
        this.x = _x;
        this.y = _y;
        this.dead = _dead;
        this.level = _level;
    }

    initJoueur(_classe: PlayerClass) {
        this.classe = _classe;
        switch(this.classe) {
            case "assassin":
                this.dexterite = 110;
                this.spellgrid = [
                    [0,3,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                ];
                break;
            case "guerrier":
                this.hp = 110;
                this.spellgrid = [
                    [0,1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                ]
                break;
            case "mage":
                this.mana = 110;
                this.spellgrid = [
                    [0,2,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                ]
                break;
        }
    }

    setNickname(_nickname: string) {
        this.nickname = _nickname;
    }

    moveUp() {
        this.y -= 1; 
        this.sens = "up";
    }

    moveDown() {
        this.y += 1;
        this.sens = "down";
    }

    moveLeft() {
        this.x -= 1;
        this.sens = "left";
    }

    moveRight() {
        this.x += 1;
        this.sens = "right";
    }

    takeDamage(_damage: number) {
        this.hp -= _damage;
        if (this.hp <= 0) {
            this.dead = true;
        }
    }

    levelUp() {
        this.level += 1;
    }

    setPosition(_x: number = 0, _y: number = 0) {
        this.x = _x;
        this.y = _y;
    }

}

export default Joueur;