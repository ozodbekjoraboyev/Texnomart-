import React from 'react'
import Location01Icon from '../../assets/ikonkalar/Lokation'
import Call02Icon from '../../assets/ikonkalar/Phone'
import EarthIcon from '../../assets/ikonkalar/yerShari'
import Nav_top from './Nav_top'
import NavbarCard from './navbarCard'
import NavbarCenter from './NavbarCenter'

function NavLokation() {
  return (
   <>
    <div className="bg-[#333]  text-white px-2 p-2 ">
      <div className=" container m-auto w-full">
        <div className=" flex justify-between">
          <div className="flex gap-2 cursor-pointer">
            <Location01Icon style={{ color: "#ffffff" }} />
            <p className="font-bold">Tashkent</p>
            <div className="flex gap-3 font-semibold pl-20">
              <p>Bizning do'konlarimiz</p>
              <p className="pl-10">Yuridik shaxslar uchun</p>
              <p className="pl-10">To'lov usullari</p>
            </div>
          </div>
          <div className=" flex justify-between gap-5">
            <div className="flex gap-2 font-semibold cursor-pointer">
              <Call02Icon style={{ color: "#ffffff" }} />
              <p>+998 97 056 79 85</p>
            </div>
            <div>
              <div className=" border w-15 px-1 rounded-full flex gap-2 cursor-pointer">
                <EarthIcon style={{ color: "#ffffff" }} />
                <p>O'z</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarCenter />
      <Nav_top />
      <NavbarCard />

   </>
  )
}

export default NavLokation
