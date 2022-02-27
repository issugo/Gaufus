import React from "react";

import { IonThumbnail, IonImg } from "@ionic/react";

import "./spell.css";
import { Spell as SpellType } from "../../type";

type SpellProps = {
    spell?: SpellType
    setCurrentAction?: CallableFunction,
    setRangeOfEffect?: CallableFunction
}

const Spell = (props: SpellProps) => {

    const { spell, setCurrentAction, setRangeOfEffect } = props;

    if(spell === undefined || setCurrentAction === undefined || setRangeOfEffect === undefined) {
        return (
            <button className="spell">
                <div className={`no-spell`}></div> 
            </button>
        )
    } else {
        return(
            <button className="spell" onClick={() => {console.log(spell);setCurrentAction(spell.actionType); setRangeOfEffect(spell.rangeOfEffect)}}>
                <IonThumbnail className="spell-image">
                    <IonImg src={`assets/spells/${spell.name}-modified.png`} alt={spell.alt}></IonImg>
                </IonThumbnail>
            </button>
        )
    }

    
}

export default Spell;