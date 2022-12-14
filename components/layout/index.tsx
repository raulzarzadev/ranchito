import Head from 'next/head'
import React from 'react'
import Nav from './nav'
export interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="p-2 prose">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="Centraliza, organiza y administra tu granja de forma eficiente. Incrementa tus utilidades"
        />
        <meta
          name="keywords"
          content="farm, ranchito, granja, crianza de animales, borregos"
        />
        <title>Mi Ranchito</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/assets/icons/icon-48x48.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/assets/icons/icon-152x152.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/icons/icon-152x152.png"
        ></link>
        <meta name="theme-color" content="#C6B386" />
      </Head>

      <Nav />
      <main className="">{children}</main>
    </div>
  )
}

export default Layout
