import { IonPage, IonRow, IonTitle, IonText, IonGrid, IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { shareSocial, logoFacebook, logoInstagram, logoTwitter, logoReddit } from "ionicons/icons";
import React from "react";

import Joueur from "../../Joueur";
import SocialSharing from "../SocialSharing";
import "./joueur_stats.css";

type PlayerStatsProps = {
    uid?: string,
    getExternalPlayer: CallableFunction
}

const JoueurStats = (props: PlayerStatsProps) => {

    const {uid, getExternalPlayer} = props;

    const player = getExternalPlayer(uid);
    return (
        <IonGrid className="thirdCard">
            {/* MAKE A BACK BUTTON HERE */}
            <IonRow className={`stat_row_head font`}>
                <IonTitle id="title" style={{"fontSize": "16px"}}>Vos Stats</IonTitle>
            </IonRow>
            <IonRow className={`stat_row`}>
                <IonTitle size="small" color="danger" className="title_desc">ATK</IonTitle>
                <IonText color="medium" className="txt_desc">{player.x} ET {player.y}</IonText>
            </IonRow>
            <IonRow className={`stat_row`}>
                <IonTitle size="small" color="danger" className="title_desc">HP</IonTitle>
                <IonText color="medium" className="txt_desc">{player.hp}</IonText>
            </IonRow>
            <IonRow className={`stat_row`}>
                <IonTitle size="small" color="danger" className="title_desc">MANA</IonTitle>
                <IonText color="medium" className="txt_desc">{player.mana}</IonText>
            </IonRow>
            <IonRow className={`stat_row`}>
                <IonTitle size="small" color="danger" className="title_desc">DXT</IonTitle>
                <IonText color="medium" className="txt_desc">{player.dexterite}</IonText>
            </IonRow>
            <IonRow className={`stat_row`}>
                <IonTitle size="small" color="danger" className="title_desc">ATK</IonTitle>
                <IonText color="medium" className="txt_desc">{player.x} ET {player.y}</IonText>
            </IonRow>
            <IonRow className={`stat_row`}>
                <IonTitle size="small" color="danger" className="title_desc">HP</IonTitle>
                <IonText color="medium" className="txt_desc">{player.hp}</IonText>
            </IonRow>
            <IonRow className={`stat_row`}>
                <IonTitle size="small" color="danger" className="title_desc">MANA</IonTitle>
                <IonText color="medium" className="txt_desc">{player.mana}</IonText>
            </IonRow>
            <IonRow className={`stat_row`}>
                <IonTitle size="small" color="danger" className="title_desc">DXT</IonTitle>
                <IonText color="medium" className="txt_desc">{player.dexterite}</IonText>
            </IonRow>
            <IonRow className={`stat_row`}>
                <SocialSharing uid={uid}/>
            </IonRow>
        </IonGrid>
    )

}

export default JoueurStats;