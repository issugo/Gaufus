import { useEffect, useState } from "react";
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { App as CapacitorApp, URLOpenListenerEvent } from '@capacitor/app';

import { Home, GridExample } from './pages';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

  const [uid, setUid] = useState<string | undefined>(undefined);

  useEffect(() => {
    CapacitorApp.addListener("appUrlOpen", (event: URLOpenListenerEvent) => {
      // Example url: https://cours-ynov-175ee.web.app/123456
      // slug = /123456
      const slug = event.url.split(".app").pop();
      alert(slug?.replace("/", ""));
      setUid(slug?.replace("/", ""))
      // If no match, do nothing - let regular routing
      // logic take over
    });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Home uid={uid}/>
          </Route>
          <Route exact path="/grid" component={GridExample} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
