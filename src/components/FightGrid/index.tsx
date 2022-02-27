import React, { useEffect } from "react"

import { useFightGrid } from "../../hooks";
import Joueur from "../../Joueur";
import IA from "../../IA";
import { ActionType } from "../../type";

type propsFightGrid = {
    id: number,
    player: Joueur,
    rangeOfEffect: number,
    setRangeOfEffect: CallableFunction,
    currentAction: ActionType,
    setCurrentAction: CallableFunction,
    ennemyList: Array<IA>,
    setCombatState: CallableFunction
}

const FightGrid = (props: propsFightGrid) => {

    const { id, player, rangeOfEffect, setRangeOfEffect, currentAction, setCurrentAction, ennemyList, setCombatState } = props;
    const { grid, buildGrid } = useFightGrid();

    useEffect(() => {
        console.log("generate grid");
        buildGrid(id, player, rangeOfEffect, setRangeOfEffect, currentAction, setCurrentAction,ennemyList, setCombatState);
    }, [id, rangeOfEffect, currentAction])

    return (
        grid
    )

}

export default FightGrid;