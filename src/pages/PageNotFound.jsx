import React from 'react'
import {Link} from "react-router-dom"


const PageNotFound = () => {
  return (
    <>
    <div className="pnf w-[100%]">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </>
  )
}

export default PageNotFound