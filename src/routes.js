import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Register from './pages/Register/Register';
import Trade from './pages/Trade/Trade';
import Home from './pages/Home/Home';
import Update from './pages/Update/Update'

export default function Routes(){

    return (
   
        <Switch>
          <Route path="/" exact component={Register} />
          <Route path="/:id" exact component={Home} />
          <Route path="/:id/trade" exact component={Trade} />
          <Route path="/:id/update" exact component={Update} />
        </Switch>
     
    );
}