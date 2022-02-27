import { EnnemyType, Sens } from "./type";

class IA {
    sens: Sens;
    type: EnnemyType;
    hp: number;
    maxHp: number;
    x: number;
    y: number;
    dead: boolean;

    constructor(_type: EnnemyType = "female", _hp: number = 50, _x: number = 0, _y: number = 0, _dead: boolean = false, _sens: Sens = "down") {
        this.sens = _sens;
        this.type = _type;
        this.hp = _hp;
        this.maxHp = _hp;
        this.x = _x;
        this.y = _y;
        this.dead = _dead;
        console.log("generated :", this)
    }

    moveUp() {
        if(!this.dead) {
            if (this.y > 0) {
                this.y -= 1; 
                this.sens = "up";
            }
        }
    }

    moveDown() {
        if(!this.dead) {
            if (this.y < 9) {
                this.y += 1;
                this.sens = "down";
            }
        }  
    }

    moveLeft() {
        if(!this.dead) {
            if (this.x > 0) {
                this.x -= 1;
                this.sens = "left";
            }
        }
    }

    moveRight() {
        if(!this.dead) {
            if (this.x < 9) {
                this.x += 1;
                this.sens = "right";
            }
        }
    }

    takeDamage(_damage: number) {
        this.hp -= _damage;
        if (this.hp <= 0) {
            this.dead = true;
        }
    }

}

export default IA;