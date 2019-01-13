import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div
    style={{
      margin: `0 auto`,
      maxWidth: 960,
      background: `white`,
      textAlign: `center`,
    }}
  >
    <div
      style={{
        padding: `1.45rem 1.0875rem`,
        borderBottom: `1px solid #eee`,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontWeight: 200,
        }}
      >
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
