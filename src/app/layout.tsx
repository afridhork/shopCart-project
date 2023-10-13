'use client'

import Header from '@/components/Header/page'
import '../assets/style/globals.css'
import { Provider } from 'react-redux';
import store from '@/store/index';
import Footer from '@/components/Footer/page';

import 'react-loading-skeleton/dist/skeleton.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="dark">
        <Provider store={store}>
          <Header/>
          <div className="pt-[75px]">
            {children}
          </div>
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}

