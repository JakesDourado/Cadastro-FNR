import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Main from './page';
import Welcom from './page/Welcome';




export default function Routes(){
    return(
        <>
        <Switch>
            <Route path="/" exact component={Welcom}/>
        </Switch>
        </>
    )
}