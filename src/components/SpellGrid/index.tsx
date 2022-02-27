import React, { useEffect } from "react";

import { useSpellGrid } from "../../hooks";

type SpellGridProps = {
    spellgrid: Array<Array<number>>,
    setCurrentAction: CallableFunction,
    setRangeOfEffect: CallableFunction
}

const SpellGrid = (props: SpellGridProps) => {

    const { spellgrid, setCurrentAction, setRangeOfEffect } = props;

    const {grid, buildGrid} = useSpellGrid();

    useEffect(() => {
        buildGrid(spellgrid, setCurrentAction, setRangeOfEffect);
    }, [])

    return (grid)
}

export default SpellGrid;