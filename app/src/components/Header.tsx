import React from 'react'
import {css} from 'emotion'
import {Link} from '@reach/router'

const HeaderStyle = css`
  text-align: center;
  padding: 20px;
  font-size: 1.25rem;
  a {
    color: black;
    text-decoration: none;
  }
`

const Header = () => (
  <header>
    <div className={HeaderStyle}>
      <Link to="/">
        <h1>My Dict</h1>
      </Link>
    </div>
  </header>
)

Header.displayName = 'Header'

export default Header
