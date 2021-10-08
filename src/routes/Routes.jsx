import React from 'react';
import {Route, Switch} from 'react-router-dom';
 import Home from '../pages/Home';
 import Cart from '../pages/Cart';
 import Catalog from '../pages/Catalog';
 import Product from '../pages/Product';
 import Accessories from '../pages/Accsessories';
 import Contact from '../pages/Contact'

 const Routes = () => {
     return (
         <div>
           <Switch>
            <Route  path="/cart" component = {Cart} />
            <Route  path="/catalog/:slug" component = {Product} />
            <Route  path="/catalog" component = {Catalog} />
            <Route  path="/contact" component = {Contact} />
            <Route  path="/aceessories" component = {Accessories} />
            <Route exact  path="/" component = {Home} />
           </Switch>
         </div>
     )
 };

 export default Routes;