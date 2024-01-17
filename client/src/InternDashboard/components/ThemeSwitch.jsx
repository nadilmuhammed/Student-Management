import React, { useEffect, useState } from 'react'
import { FaMoon } from "react-icons/fa"
import { BsSunFill } from "react-icons/bs"

function ThemeSwitch() {

    const [ theme, setTheme] = useState(null)

    useEffect(()=>{
        if(window.matchMedia("prefer-color-scheme: dark").matches)
        setTheme('dark')
    else{
        setTheme('light')
    }
    },[])

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add('dark')
            }else{
                document.documentElement.classList.remove('dark')

        }
    },[theme])

    const handleThemeSwitch = ()=>{
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

  return (
    <div>
        <button onClick={handleThemeSwitch}
        className='dark:bg-slate-700 bg-gray-100 p-2 rounded-full text-yellow-500 dark:text-slate-400 '>
            {theme === 'dark' ? <FaMoon/> : <BsSunFill/>}
        </button>
    </div>
  )
}

export default ThemeSwitch