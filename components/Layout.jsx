import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>Rin's NextJS Store</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className='main-container'>
       {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default Layout