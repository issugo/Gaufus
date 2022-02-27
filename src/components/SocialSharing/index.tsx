import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";
import { shareSocial, logoReddit, logoFacebook, logoInstagram, logoTwitter, addCircle } from "ionicons/icons";
import { SocialSharing as SocialSharingCapacitor } from '@awesome-cordova-plugins/social-sharing';

import React from "react";


type PlayerShareProps = {
    uid?: string
}

const SocialSharing = (props: PlayerShareProps) => {

    const { uid } = props;

    const message: string = "come check my character in gaufus";
    const url: string = "https://gaufus-16bb0.web.app/" + uid;

    return (
        <IonFab style={{"marginLeft": "25px"}}>
            <IonFabButton>
                <IonIcon icon={shareSocial} />
            </IonFabButton>
            <IonFabList side="end">
                <IonFabButton onClick={() => {SocialSharingCapacitor.shareViaFacebook(message, undefined, url)}}><IonIcon icon={logoFacebook} /></IonFabButton>
                <IonFabButton onClick={() => {SocialSharingCapacitor.shareViaInstagram(message + " " + url, "")}}><IonIcon icon={logoInstagram} /></IonFabButton>
                <IonFabButton onClick={() => {SocialSharingCapacitor.shareViaTwitter(message + " " + url, "")}}><IonIcon icon={logoTwitter} /></IonFabButton>
                <IonFabButton onClick={() => {SocialSharingCapacitor.share(message, undefined, undefined, url)}}><IonIcon icon={addCircle} /></IonFabButton>
            </IonFabList>
        </IonFab>
    )

}

export default SocialSharing;