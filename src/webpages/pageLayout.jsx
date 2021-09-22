import React from 'react';
import Navbar from './navbar';

const Layout = ({ children }, ...rest) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default Layout;
