import React from 'react';
import Routes from '../routes/Routes';
import Header from './Header';
import Footer from './Footer';

 const Layout = () => {
     return (
            <div>
                <Header />
                    <div className="container">
                        <div className="main">
                            <Routes />
                        </div>
                    </div>
                <Footer />
            </div>
     )
 };

 export default Layout;