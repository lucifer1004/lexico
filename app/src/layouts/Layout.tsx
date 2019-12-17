import React from 'react'
import {css} from 'emotion'
import Footer from '../components/Footer'
import Header from '../components/Header'

const LayoutStyle = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const ContentStyle = css`
  flex: 1;
`

const Layout = ({children}: {children: React.ReactNode}) => (
  <div className={LayoutStyle}>
    <Header />
    <div className={ContentStyle}>{children}</div>
    <Footer />
  </div>
)

Layout.displayName = 'Layout'

export default Layout
