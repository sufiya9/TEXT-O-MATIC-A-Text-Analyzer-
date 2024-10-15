import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../main/Header'

const Admin = () => {
  return (
    <div>
      <Header />
      <Outlet/>
    </div>
  )
}

export default Admin