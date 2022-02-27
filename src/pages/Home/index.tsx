import React, { useEffect, useState } from "react";

import { 
    IonButton, 
    IonButtons, 
    IonCol, 
    IonContent, 
    IonGrid,
    IonInput, 
    IonPage, 
    IonRow,
    IonTitle, 
    IonItem, 
    isPlatform,
    IonCard,
    IonIcon,
    IonFabButton,
    IonLabel,
    IonText,
    IonImg
} from '@ionic/react';
import { initializeApp } from "firebase/app";
import { gameControllerOutline, logoGoogle, closeOutline, arrowBack } from "ionicons/icons";

import { FightGrid, SpellGrid, JoueurComp, IA, JoueurStats } from "../../components";
import { useHome } from "../../hooks";
import { ActionType } from "../../type";

import game from "../../map";

import "./Home.css";
import "./map.css";

type HomeProps = {
    uid: string | undefined
}


const Home = (props: HomeProps) => {

    const { uid } = props;

    const { player, appState, setAppState, handleClose, handlePlay, initPlayer, user, connectionWithGoogle, connectionWithEmailPassword, checkAuth, email, setEmail, password, setPassword, chosenLevel, setChosenLevel, handleLevel, username, setUsername, ennemyList, combatState, setCombatState, finishedLevels, setFinishedLevels, handleLore, loadGame, saveGame, getExternalPlayer } = useHome();

    const firebaseConfig = {
        apiKey: "AIzaSyBNJmtzWQ_k8_Bt2g58ZRDnynKE0OnCmzM",
        authDomain: "gaufus-16bb0.firebaseapp.com",
        projectId: "gaufus-16bb0",
        storageBucket: "gaufus-16bb0.appspot.com",
        messagingSenderId: "263010042278",
        appId: "1:263010042278:web:3949a00a685189b4dd0f67",
        measurementId: "G-R7BPH78WHX"
      };

    useEffect(() => {
        initializeApp(firebaseConfig);
        checkAuth();
        loadGame();
    }, [checkAuth]);

    useEffect(() => {
        if(combatState === "iaTurn") {
            let ennemiesDead: number = 0;
            ennemyList.forEach((ennemy) => {
                if(!ennemy.dead) {
                    let action = Math.floor(Math.random() * 5);
                    switch (action) {
                        case 0:
                            if(!(player.x === ennemy.x && player.y === ennemy.y - 1)) {
                                ennemy.moveUp();
                            }
                            break;
                        case 1:
                            if(!(player.x === ennemy.x + 1 && player.y === ennemy.y)) {
                                ennemy.moveRight();
                            }
                            break;
                        case 2:
                            if(!(player.x === ennemy.x && player.y === ennemy.y + 1)) {
                                ennemy.moveDown();
                            }
                            break;
                        case 3:
                            if(!(player.x === ennemy.x - 1 && player.y === ennemy.y)) {
                                ennemy.moveLeft();
                            }
                            break;
                        case 4:
                            break;
                    }
                } else {
                    ennemiesDead++;
                }
                
            });
            if(ennemiesDead === ennemyList.length) {
                if(finishedLevels.indexOf(chosenLevel) === -1) {
                    setFinishedLevels(Array.from(finishedLevels.concat(chosenLevel)));
                }
                setCombatState("finished");
            } else {
                setCombatState("playerTurn");
            }
        }
        if(combatState === "finished") {
            setAppState("map");
            setCombatState("null");
            saveGame();
        }
    }, [combatState])

    const [currentAction, setCurrentAction] = useState<ActionType>("null");
    const [rangeOfEffect, setRangeOfEffect] = useState<number>(0);

    useEffect(() => {
        if (uid !== undefined && uid !== user?.uid) {
            setAppState("stats");
        }
    }, [uid])

    /*useEffect(() => {
        console.log("currentAction :", currentAction);
        console.log("rangeOfEffect :", rangeOfEffect);
    }, [currentAction, rangeOfEffect])*/

    return (
        <IonPage>
            <IonContent fullscreen>
                {appState === "null" && (
                    <div className="homepage">
                        <IonGrid>
                            <IonCard className="mainCard">
                                <IonRow className={`homepage_row_head`}>
                                    <IonIcon className="logo" icon={gameControllerOutline} />
                                </IonRow>
                                <IonRow className={`homepage_row_head font`}>
                                    <IonTitle size="large" className="title" color="secondary" style={{"alignItems": "center", "position": "unset"}}>Gaufus</IonTitle>
                                </IonRow>
                                <IonRow className={`homepage_row`}>
                                    <IonButton className={`homepage-button font`} color="primary" onClick={() => {handlePlay()}}>Jouer</IonButton>
                                </IonRow>
                                <IonRow className={`homepage_row`}>
                                    <IonButton className={`homepage-button font`} color="warning" onClick={() => {handleLore()}}>Description</IonButton>
                                </IonRow>
                                <IonRow className={`homepage_row`}>
                                    
                                </IonRow>
                                <IonRow className={`homepage_row`}> 
                                    {isPlatform("capacitor") && (
                                        <IonFabButton className={`close_button`} color="danger" onClick={() => {handleClose()}} closeIcon="close">
                                            <IonIcon icon={closeOutline}></IonIcon>
                                        </IonFabButton>
                                    )}
                                    {!isPlatform("capacitor") && (
                                        <IonFabButton className={`close_button hidden`} color="danger" onClick={() => {handleClose()}} closeIcon="close" disabled>
                                            <IonIcon icon={closeOutline}></IonIcon>
                                        </IonFabButton>
                                    )}
                                </IonRow>
                            </IonCard>
                        </IonGrid>
                    </div>
                )}
                {appState === "description" && (
                    <div className="homepage">
                        <IonGrid>
                            <IonCard className="secondCard">
                                <IonButton className="backButton" onClick={() => {setAppState("null")}} >
                                    <IonIcon icon={arrowBack}></IonIcon>
                                </IonButton>
                                <IonRow className={`homepage_row_head`}>
                                    <IonIcon className="logo" icon={gameControllerOutline}></IonIcon>
                                </IonRow>
                                <IonRow className={`homepage_row_head font`}>
                                    <IonTitle size="large" color="secondary" style={{"textAlign": "center", "position": "unset"}}>Bienvenue sur GAUFUS</IonTitle>
                                </IonRow>
                                <IonRow className={`homepage_row_desc`}>
                                    <IonTitle size="small" color="warning" style={{"textAlign": "center", "position": "unset"}}>But du jeu</IonTitle>
                                    <IonText color="light" className="txt_desc">LOREM IPSUM DOLOR SIT AMET.</IonText>
                                </IonRow>
                                <IonRow className={`homepage_row_desc`}>
                                    <IonTitle size="small" color="warning" style={{"textAlign": "center", "position": "unset"}}>L'univers</IonTitle>
                                    <IonText color="light" className="txt_desc">LOREM IPSUM DOLOR SIT AMET.</IonText>
                                </IonRow>
                                <IonRow className={`homepage_row_desc`}>
                                    <IonTitle size="small" color="warning" style={{"textAlign": "center", "position": "unset"}}>Contenu</IonTitle>
                                    <IonText color="light" className="txt_desc">LOREM IPSUM DOLOR SIT AMET.</IonText>
                                </IonRow>
                                <IonRow className={`homepage_row_desc`}>
                                    <IonTitle size="small" color="warning" style={{"textAlign": "center", "position": "unset"}}>Qui sommes nous ?</IonTitle>
                                    <IonText color="light" className="txt_desc">LOREM IPSUM DOLOR SIT AMET.</IonText>
                                </IonRow>
                            </IonCard>
                        </IonGrid>
                    </div>
                )}
                {appState === "signin" && (
                    <div className="homepage">
                        <IonGrid>
                            <IonCard className="mainCard">
                                <IonRow className={`homepage_row_head`}>
                                    <IonIcon className="logo" icon={gameControllerOutline}></IonIcon>
                                </IonRow>
                                <IonRow className={`homepage_row_head font`}>
                                    <IonTitle size="large" className="title" color="secondary" style={{"alignItems": "center", "position": "unset"}}>Connexion</IonTitle>
                                </IonRow>
                                <IonRow className={`homepage_row`}>
                                    <IonItem className={`outline`} color="medium">
                                        <IonLabel>Nom :</IonLabel>
                                        <IonInput type="text" placeholder="" value={username} onIonChange={(e: any)=>
                                            setUsername(e.target.value)}></IonInput>
                                    </IonItem>
                                </IonRow>
                                <IonRow className={`homepage_row`}>
                                    <IonItem className={`outline`} color="medium">
                                        <IonLabel>Email :</IonLabel>
                                        <IonInput type="email" placeholder="" autocomplete="email" value={email} onIonChange={(e:
                                            any)=> setEmail(e.target.value)}></IonInput>
                                    </IonItem>
                                </IonRow>
                                <IonRow className={`homepage_row`}>
                                    <IonItem className={`outline`} color="medium">
                                        <IonLabel>Mot de passe :</IonLabel> 
                                        <IonInput type="password" placeholder="" value={password} autocomplete="new-password"
                                            onIonChange={(e: any)=> setPassword(e.target.value)}></IonInput>
                                    </IonItem>
                                </IonRow>
                                <IonRow className={`homepage_row`}>
                                    <IonButton className={`login-button font`} expand="block" shape="round" fill="solid"
                                        onClick={()=> {connectionWithEmailPassword(email, password)}}>Inscription
                                    </IonButton>
                                </IonRow>
                                <IonRow className={`homepage_row`}>
                                    <IonLabel className="label">Ou se connecter avec</IonLabel>
                                </IonRow>
                                <IonRow className={`homepage_row`}>
                                    <IonButton shape="round" onClick={()=> {connectionWithGoogle()}} >
                                        <IonIcon slot="start" icon={logoGoogle}></IonIcon>
                                        Google
                                    </IonButton>
                                </IonRow>
                            </IonCard>
                        </IonGrid>
                    </div>
                )}
                {appState === "createPlayer" && (
                    <div className={`homepage`}>
                        <IonGrid>
                            <IonCard className="mainCard">
                                <IonRow className={`homepage_row_head font`}>
                                    <IonTitle size="large" className="title" color="secondary" style={{"alignItems": "center", "position": "unset"}}>CHOOSE YOUR</IonTitle>
                                    <IonTitle size="large" className="title" color="secondary" style={{"alignItems": "center", "position": "unset"}}>CLASS :</IonTitle>
                                </IonRow>
                                <IonRow className={`homepage_row class_tab`}>
                                    <IonCol>
                                        <IonCard className="player_class">
                                            <IonImg src={`assets/player/guerrier/down-modified.png`} className="player_class_img"></IonImg>
                                            <IonTitle>Guerrier :</IonTitle>
                                            <IonLabel className="player_class_label">HP : 110</IonLabel>
                                            <IonLabel className="player_class_label">MP : 90</IonLabel>
                                            <IonLabel className="player_class_label">DXT : 90</IonLabel>
                                            <IonButton className="player_class_button" color="danger" onClick={() => {initPlayer("guerrier")}}>Confirmer</IonButton>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                                <IonRow className={`homepage_row class_tab`}>
                                    <IonCol>
                                        <IonCard className="player_class">
                                            <IonImg src={`assets/player/mage/down-modified.png`} className="player_class_img"></IonImg>
                                            <IonTitle>Mage :</IonTitle>
                                            <IonLabel className="player_class_label">HP : 90</IonLabel>
                                            <IonLabel className="player_class_label">MP : 110</IonLabel>
                                            <IonLabel className="player_class_label">DXT : 90</IonLabel>
                                            <IonButton className="player_class_button" color="primary" onClick={() => {initPlayer("mage")}}>Confirmer</IonButton>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                                <IonRow className={`homepage_row class_tab`}>
                                <IonCol>
                                        <IonCard className="player_class">
                                            <IonImg src={`assets/player/assassin/down-modified.png`} className="player_class_img"></IonImg>
                                            <IonTitle>Assassin :</IonTitle>
                                            <IonLabel className="player_class_label">HP : 90</IonLabel>
                                            <IonLabel className="player_class_label">MP : 90</IonLabel>
                                            <IonLabel className="player_class_label">DXT : 110</IonLabel>
                                            <IonButton className="player_class_button" color="light" onClick={() => {initPlayer("assassin")}}>Confirmer</IonButton>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                            </IonCard>
                        </IonGrid>
                    </div>
                )}  
                {appState === "map" && (
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" className={`map grid-column-no-padding`}>
                                <IonContent>
                                    <IonGrid>
                                    {game.levels.map((level, index) => {
                                        let finished: string = "unset";
                                        if(finishedLevels.indexOf(level.id) !== -1) {
                                            finished = "green";
                                        }
                                        return (
                                            <IonRow key={`niveau-${index}`} style={{border: "solid 1px black", backgroundColor: finished}} onClick={() => {
                                                handleLevel(setChosenLevel, level.id, setAppState);
                                                }}>
                                                <IonCol size="12">
                                                    Region : {level.region} : {level.name}
                                                </IonCol>
                                            </IonRow>
                                        )
                                    })}
                                    </IonGrid>
                                    
                                </IonContent>
                            </IonCol>
                        </IonRow>
                        <IonRow onClick={() => {setAppState("stats")}}>
                            <IonCol>HP :</IonCol>
                            <IonCol>MANA :</IonCol>
                            <IonCol>DEXT :</IonCol>
                            <IonCol>LEVEL :</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>{player.hp}</IonCol>
                            <IonCol>{player.mana}</IonCol>
                            <IonCol>{player.dexterite}</IonCol>
                            <IonCol>{player.level}</IonCol>
                        </IonRow>
                    </IonGrid>
                )}
                {appState === "stats" && (
                    <div className="statpage">
                        <IonPage>
                            <JoueurStats uid={uid || user?.uid} getExternalPlayer={getExternalPlayer}></JoueurStats>
                        </IonPage>
                    </div>
                )}
                {appState === "combat" && (
                    <IonContent fullscreen className="app">
                        <IonGrid>
                            <IonRow>
                                <IonCol></IonCol>
                                <IonCol className={`grid-column-no-padding`} size="auto">
                                    <JoueurComp player={player} />
                                    {ennemyList.map((ennemy, index) => {
                                        return(<IA key={`ennemy-${index}`} type={ennemy.type} sens={ennemy.sens} hp={ennemy.hp} x={ennemy.x} y={ennemy.y} />)
                                    })}
                                    <FightGrid 
                                        id={chosenLevel} 
                                        player={player} 
                                        currentAction={currentAction}
                                        setCurrentAction={setCurrentAction}
                                        rangeOfEffect={rangeOfEffect} 
                                        setRangeOfEffect={setRangeOfEffect}
                                        ennemyList={ennemyList}
                                        setCombatState={setCombatState} />
                                </IonCol>
                                <IonCol></IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonGrid>
                            {ennemyList.map((ennemy, index) => {
                                return(
                                    <IonRow key={`ennemy-${index}`}>
                                        <IonCol>Ennemy {index+1} : {ennemy.hp}/{ennemy.maxHp}</IonCol>
                                    </IonRow>
                                )
                            })}
                        </IonGrid>
                        <IonGrid className="stats">
                            <IonRow>
                                <IonCol className="stat">perso</IonCol>
                                <IonCol className="stat">stats</IonCol>
                                <IonCol className="stat">stats avancés</IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol></IonCol>
                                <IonCol>
                                    <IonRow>HP : {player.hp}</IonRow>
                                    <IonRow>MANA : {player.mana}</IonRow>
                                    <IonRow>DEXTERITE : {player.dexterite}</IonRow>
                                    <IonRow>LEVEL : {player.level}</IonRow>
                                </IonCol>
                                <IonCol></IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonGrid>
                            <IonRow>
                                <IonCol></IonCol>
                                <IonCol size="auto">
                                    <SpellGrid spellgrid={player.spellgrid} setCurrentAction={setCurrentAction} setRangeOfEffect={setRangeOfEffect} />
                                </IonCol>
                                <IonCol></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                )}
            </IonContent>
        </IonPage>
    )
}

export default Home;
