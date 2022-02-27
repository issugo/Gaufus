import { useState } from "react";

import { IonGrid, IonRow } from "@ionic/react";

import { FightSquare } from "../../components";

import game from "../../map";
import Joueur from "../../Joueur";
import IA from "../../IA";

const useFightGrid = () => {

    const [grid, setGrid] = useState<any>(<IonGrid></IonGrid>);

    //le fonction sert à générer la grille de combat
    const buildGrid = (id: number, 
                        player: Joueur, 
                        rangeOfEffect: number,
                        setRangeOfEffect: CallableFunction,
                        currentAction: string, 
                        setCurrentAction: CallableFunction,
                        ennemyList: Array<IA>,
                        setCombatState: CallableFunction) => {
        setGrid(
            <IonGrid className={`grid-no-padding`}>
                {game.levels[id].map.map((row, index) => {
                    return (
                        <IonRow key={`fight-row-${index}`}>{row.map((zone, index2) => {
                            if (currentAction === "moveSelf") {
                                if((index > player.y && index <= player.y + rangeOfEffect) && (index2 === player.x)) {
                                    return (<FightSquare key={`fight-square-${index}-${index2}`} terrainType={game.terrainType[zone].name} actionnable callback={() => {player.moveDown(); setCurrentAction("null"); setCombatState("iaTurn");}}></FightSquare>)
                                } else if ((index < player.y && index >= player.y - rangeOfEffect) && (index2 === player.x)) {
                                    return (<FightSquare key={`fight-square-${index}-${index2}`} terrainType={game.terrainType[zone].name} actionnable callback={() => {player.moveUp(); setCurrentAction("null"); setCombatState("iaTurn");}}></FightSquare>)
                                } else if ((index2 > player.x && index2 <= player.x + rangeOfEffect) && (index === player.y)) {
                                    return (<FightSquare key={`fight-square-${index}-${index2}`} terrainType={game.terrainType[zone].name} actionnable callback={() => {player.moveRight(); setCurrentAction("null"); setCombatState("iaTurn");}}></FightSquare>)
                                } else if ((index2 < player.x && index2 >= player.x - rangeOfEffect) && (index === player.y)) {
                                    return (<FightSquare key={`fight-square-${index}-${index2}`} terrainType={game.terrainType[zone].name} actionnable callback={() => {player.moveLeft(); setCurrentAction("null"); setCombatState("iaTurn");}}></FightSquare>)
                                } else {
                                    return (<FightSquare key={`fight-square-${index}-${index2}`} terrainType={game.terrainType[zone].name}></FightSquare>)
                                }
                            } else if (currentAction === "damageEnnemy") {
                                let tempCallback: CallableFunction = () => {};
                                let ennemyHere: boolean = false;
                                ennemyList.forEach((ennemy) => {
                                    if ((ennemy.y === player.y && Math.abs(ennemy.x - player.x) <= rangeOfEffect) && (index === ennemy.y && index2 === ennemy.x)) {
                                        ennemyHere = true;
                                        tempCallback = () => {ennemy.takeDamage(10)};
                                    } else if ((ennemy.x === player.x && Math.abs(ennemy.y - player.y) <= rangeOfEffect) && (index === ennemy.y && index2 === ennemy.x)) {
                                        ennemyHere = true;
                                        tempCallback = () => {ennemy.takeDamage(10)};
                                    } else {
                                        return;
                                    }
                                })
                                if (ennemyHere) {
                                    return (<FightSquare key={`fight-square-${index}-${index2}`} terrainType={game.terrainType[zone].name} actionnable callback={() => {tempCallback(); setCurrentAction("null"); setCombatState("iaTurn"); console.log(ennemyList)}}></FightSquare>)
                                } else {
                                    return (<FightSquare key={`fight-square-${index}-${index2}`} terrainType={game.terrainType[zone].name}></FightSquare>)
                                }
                            } else {
                                return(
                                    <FightSquare key={`fight-square-${index}-${index2}`} terrainType={game.terrainType[zone].name}></FightSquare>
                                )
                            }
                        })}</IonRow>
                    )
                })}
            </IonGrid>
        )
    }

    return {
        grid,
        setGrid,
        buildGrid
    }

}

export default useFightGrid;