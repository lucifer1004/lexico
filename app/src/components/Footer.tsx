import React from 'react'
import {css} from 'emotion'

const FooterStyle = css`
  text-align: center;
  padding: 5px;
  background-color: gray;
`

const Footer = () => (
  <footer>
    <div className={FooterStyle}>Gabriel Wu 2019</div>
  </footer>
)

Footer.displayName = 'Footer'

export default Footer
