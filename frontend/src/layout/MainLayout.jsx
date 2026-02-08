import { BottomNav } from "../pages/BottonNav";
import { Outlet } from "react-router-dom";
import React from 'react'

const MainLayout = () => {
  return (
    <>
      <Outlet/>
      <BottomNav/>
    </>
  )
}

export default MainLayout