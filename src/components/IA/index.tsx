import React from "react";
import { IonImg, IonThumbnail } from "@ionic/react";

import { EnnemyType, Sens } from "../../type";

import "./ia.css";

type IAProps = {
    sens?: Sens | string,
    type?: EnnemyType | string,
    hp?: number,
    x?: number,
    y?: number
}

const IA = (props: IAProps) => {

    const {sens = "down", type = "male", hp = 50, x = 0, y = 0} = props

    return (
        <IonThumbnail className={`ia`} style={{top: `${y * 32}px`, left: `${x * 32}px`}}>
            {hp <= 0 && (
                <IonImg src={`assets/ennemy/tomb.png`}/>
            )}
            {hp > 0 && (
                <IonImg src={`assets/ennemy/${type}/${sens}-modified.png`}/>
            )}
            
        </IonThumbnail>
    )

}

export default IA;