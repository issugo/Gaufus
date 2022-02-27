import { useState } from "react";
import { Ennemy, EnnemyType, Sens } from "../../type";

const useIA = () => {

    const [IA, setIA] = useState<Ennemy>({sens: "down", type: "male", hp: 50, x: 0, y: 0})

    const initIA = (sens: Sens, type: EnnemyType, hp: number, x: number, y: number) => {
        setIA({sens, type, hp, x, y})
    }     

    const initIACopy = (ia: Ennemy) => {
        setIA(ia)
    }

    const moveUp = (IA: Ennemy, setIA: CallableFunction) => {
        setIA({...IA, y: IA.y-1});
    }

    const moveDown = (IA: Ennemy, setIA: CallableFunction) => {
        setIA({...IA, y: IA.y+1});
    }

    const moveLeft = (IA: Ennemy, setIA: CallableFunction) => {
        setIA({...IA, x: IA.x-1});
    }

    const moveRight = (IA: Ennemy, setIA: CallableFunction) => {
        setIA({...IA, x: IA.x+1});
    }

    const takeDamage = (IA: Ennemy, setIA: CallableFunction, damage: number) => {
        setIA({...IA, hp: IA.hp-damage})
    }

    return {
        IA,
        setIA,
        moveUp,
        moveDown,
        moveRight,
        moveLeft,
        takeDamage
    }

}

export default useIA;