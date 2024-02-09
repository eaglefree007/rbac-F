import React, { useEffect } from 'react'

const ProtectedRoute = (props) => {
    const { Component } = props;
    useEffect(() => {
        let login_token = localStorage.getItem("token")
        if (!login_token) {
            Navigate("/login")
        }
        let role = localStorage.getItem('role')
    })
  return (
    <div>
      <Component />
    </div>
  )
}

export default ProtectedRoute
