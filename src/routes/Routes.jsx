import React from 'react';
import {Route, Switch} from 'react-router-dom';
 import Home from '../pages/Home';
 import Cart from '../pages/Cart';
 import Catalog from '../pages/Catalog';
 import Product from '../pages/Product';

 const Routes = () => {
     return (
         <div>
           <Switch>
            <Route  path="/cart" component = {Cart} />
            <Route  path="/catalog/:slug" component = {Product} />
            <Route  path="/catalog" component = {Catalog} />
            <Route exact  path="/" component = {Home} />
           </Switch>
         </div>
     )
 };

 export default Routes;