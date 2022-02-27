import React from "react";

import { IonCol, IonThumbnail, IonImg, IonButton } from "@ionic/react";

import "./fightSquare.css";

type propsFightSquare = {
    terrainType: string,
    actionnable?: boolean,
    callback?: CallableFunction
}

const FightSquare = (props: propsFightSquare) => {

    const { terrainType, actionnable = false, callback } = props;

    return (
        <IonCol className={`grid-column-no-padding`}>
            <IonThumbnail className={actionnable ? "actionnable temp" : "temp"} onClick={() => {if (callback) {callback()}}}>
                <IonImg src={`assets/terrainTiles/${terrainType}.png`} />
            </IonThumbnail>
        </IonCol>
    )
}

export default FightSquare;