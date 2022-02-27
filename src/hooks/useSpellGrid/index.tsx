import { useState } from "react";

import { IonGrid, IonRow } from "@ionic/react";

import { Spell } from "../../components";

import game from "../../map";

const useSpellGrid = () => {

    const [grid, setGrid] = useState<any>(<IonGrid></IonGrid>);

    //le fonction sert à générer la grille de combat
    const buildGrid = (spellgrid: Array<Array<number>>, setCurrentAction: CallableFunction, setRangeOfEffect: CallableFunction) => {
        setGrid(
            <IonGrid>
                {spellgrid.map((row, index) => {
                    return (<IonRow key={`spell-row-${index}`}>{row.map((spell, index) => {
                        if (spell === -1) {
                            return (<Spell key={`spell-square-${index}`} />)
                        } else {
                            return (<Spell key={`spell-square-${index}`} spell={game.spells[spell]} setCurrentAction={setCurrentAction} setRangeOfEffect={setRangeOfEffect} />)
                        }
                        
                    })}</IonRow>)
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

export default useSpellGrid;