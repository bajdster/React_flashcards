import React from 'react'
import MainMenu from './MainMenu'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
        <MainMenu/>
        <Outlet/>
    </>
  )
}

export default RootLayout