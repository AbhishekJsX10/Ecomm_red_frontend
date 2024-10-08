
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import {Helmet} from "react-helmet"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({ children, title="Ecommerce Application", description="MERN STACK PROJECT", keywords="mern, react, node, mongodb" ,author="Abhishek" }) => {
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="author" content={author} />
        <title>{title}</title>
    </Helmet>
    <Header />
        <main className="bg-zinc-800 ">
          <ToastContainer/>
          {children}
        </main>
    <Footer />
    </>
  );
};

export default Layout;
