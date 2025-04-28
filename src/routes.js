import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Welcom from './page/Welcome';
import Product from './page/Product';
import Category from './page/Category';

export default function Routes(){
    return(
        <>
        <Switch>
            <Route path="/" exact component={Welcom}/>
            <Route path="/produto" component={Product}/>
            <Route path="/categoria" component={Category}/>
        </Switch>
        </>
    )
}