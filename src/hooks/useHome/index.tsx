import { useState, useEffect } from "react";

import { App } from "@capacitor/app";
import { isPlatform } from '@ionic/react';

import {
    getAuth,
    onAuthStateChanged,
    User,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPhoneNumber
  } from "firebase/auth";

  import { initializeApp } from "firebase/app";
  import { getFirestore, doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore";


import { useIA } from "..";

import { AppState, CombatState, EnnemyType, PlayerClass } from "../../type";
import Joueur from "../../Joueur";
import IA from "../../IA";

import game from "../../map";

const provider = new GoogleAuthProvider();

const useHome = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyBNJmtzWQ_k8_Bt2g58ZRDnynKE0OnCmzM",
        authDomain: "gaufus-16bb0.firebaseapp.com",
        projectId: "gaufus-16bb0",
        storageBucket: "gaufus-16bb0.appspot.com",
        messagingSenderId: "263010042278",
        appId: "1:263010042278:web:3949a00a685189b4dd0f67",
        measurementId: "G-R7BPH78WHX"
      };

      const checkAuth = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (u) => {
          setUser(u);
        });
        console.log("user :", user);
      };

      const loggout = () => {
        const auth = getAuth();
        signOut(auth);
      };
  
      const connectionWithGoogle = () => {
        const auth = getAuth();
        //signInWithRedirect(auth, provider);
        signInWithRedirect(auth, provider)
          .then((u) => {
              alert(u);
          });
      };
  
      const connectionWithEmailPassword = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            setAppState("createPlayer");
          })
          .catch((err) => {
            if (err.message.includes("auth/user-not-found")) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        setAppState("createPlayer");
                    })
                    .catch((err) => {
                        setError(err);
                    });
            }
        });
      };

    useEffect(() => {
        initializeApp(firebaseConfig);
        checkAuth();
    }, [checkAuth]);

    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [username, setUsername] = useState<string>("");
    const [appState, setAppState] = useState<AppState>("null");
    const [chosenLevel, setChosenLevel] = useState<number>(-1);
    const [ennemyList, setEnnemyList] = useState<Array<IA>>([]);
    const [combatState, setCombatState] = useState<CombatState>("null");
    const [iaDead, setIaDead] = useState<number>(0);
    const [finishedLevels, setFinishedLevels] = useState<Array<number>>([]);

    const [player, setPlayer] = useState<Joueur>(new Joueur());

    const handleClose = () => {
        if(isPlatform('capacitor')) {
            App.exitApp();
        }
    }

    const handlePlay = () => {
        if(user) {
            /*const tempPlayer = localStorage.getItem("player")
            if (tempPlayer !== null) {
                setPlayer(JSON.parse(tempPlayer));
                setAppState("map");
            } else {
                setAppState("createPlayer");
            }*/
            setAppState("createPlayer");
        } else {
            setAppState("signin");
        }   
    }

    const handleLore = () => {
        setAppState("description");
    }

    const handleLevel = (setChosenLevel: CallableFunction, levelId: number, setAppState: CallableFunction) => {
        setEnnemyList([]);
        setIaDead(0);
        setChosenLevel(levelId);
        let tempArray: Array<IA> = [];
        player.setPosition(game.levels[levelId].depart?.x, game.levels[levelId].depart?.y);
        game.levels[levelId].ennemies.forEach((ennemy) => {
            let tempIA: IA = new IA(ennemy.type as EnnemyType, ennemy.hp, ennemy.x, ennemy.y);
            tempArray.push(tempIA);
        });
        setEnnemyList(tempArray);
        setCombatState("playerTurn");
        setAppState("combat");
    }

    const initPlayer = (classe: PlayerClass) => {
        player.initJoueur(classe);
        setAppState("map");
    }

    const saveGame = async () => {
        const db = getFirestore();
        try {
            if (user !== null && user !== undefined) {
                const docRef = await setDoc(doc(db, "players", user?.uid ), {
                    nickname: player.nickname,
                    classe: player.classe,
                    hp: player.hp,
                    mana: player.mana,
                    dexterite: player.dexterite,
                    level: player.level,
                    finishedLevels: JSON.stringify(finishedLevels)
                });
                console.log("Document written with ID: ", user?.uid);
            } else {
                const docRef = await addDoc(collection(db, "players"), {
                    nickname: player.nickname,
                    classe: player.classe,
                    hp: player.hp,
                    mana: player.mana,
                    dexterite: player.dexterite,
                    level: player.level,
                    finishedLevels: finishedLevels
                });
                console.log("Document written with ID: ", docRef.id);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const loadGame = async () => {
        if (user) {
            const db = getFirestore();
            const docRef = doc(db, "players", user?.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                player.classe = data.classe;
                player.initJoueur(player.classe);
                player.hp = data.hp;
                player.dexterite = data.dexterite;
                player.mana = data.mana;
                player.level = data.level;
                player.nickname = data.nickname;
                setFinishedLevels(JSON.parse(data.finishedLevels));
                console.log("player :", player);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
    }

    const getExternalPlayer = async (uid: string) => {
        const db = getFirestore();
        const tempPlayer: Joueur = new Joueur();
        const docRef = doc(db, "players", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            tempPlayer.classe = data.classe;
            tempPlayer.hp = data.hp;
            tempPlayer.dexterite = data.dexterite;
            tempPlayer.mana = data.mana;
            tempPlayer.level = data.level;
            tempPlayer.nickname = data.nickname;
            return tempPlayer;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    return {
        player,
        appState,
        setAppState,
        chosenLevel,
        setChosenLevel,
        handleClose,
        handlePlay,
        initPlayer,
        saveGame,
        loadGame,
        user,
        checkAuth,
        connectionWithGoogle,
        connectionWithEmailPassword,
        loggout,
        email,
        setEmail,
        password,
        setPassword,
        handleLevel,
        username,
        setUsername,
        ennemyList,
        combatState,
        setCombatState,
        finishedLevels,
        setFinishedLevels,
        handleLore,
        getExternalPlayer
    }

}

export default useHome;