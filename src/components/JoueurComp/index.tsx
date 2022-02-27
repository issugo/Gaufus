import React, { IonImg, IonThumbnail } from "@ionic/react";

import Joueur from "../../Joueur";

import "./joueur.css";

type PlayerProps = {
    player: Joueur
}

const JoueurComp = (props: PlayerProps) => {

    const { player } = props;
    return (
        <IonThumbnail className={`joueur`} style={{top: `${player.y * 32}px`, left: `${player.x * 32}px`}}>
            <IonImg src={`assets/player/${player.classe}/${player.sens}-modified.png`} />
        </IonThumbnail>
    )

}

export default JoueurComp;