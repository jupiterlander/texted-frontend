import React from 'react';
import Navbar from './navbar';

const Layout = ({ children }, ...rest) => {
    console.log("layout:", rest);
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default Layout;
