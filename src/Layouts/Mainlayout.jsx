import React from 'react'
import { Outlet } from 'react-router'
import MyFooter from '../components/MyFooter'
import MyNav from '../components/MyNav'

export default function Mainlayout() {
  return (
    <>
    <MyNav />
      <Outlet />
      <MyFooter />
      
    </>
  )
}
