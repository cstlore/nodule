import Logo from '../images/icon.png'
import Settings from '../images/settings.png'
import {useEffect, useState} from "react";

const {
    ipcRenderer
} = window.require("electron");

export const NavBar = () => {
    const [time, setTime] = useState('')
    useEffect(() => {
        let date = new Date()
        const interval = setInterval(() => {
            setTime(`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`)
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);
    return (
        <div className="w-[100%] h-[20px] fixed flex mt-[5px]">
            <img src={Logo} className="ml-[40px] scale-[1.3]"/>
            <div
                className="w-[calc(calc(calc(100%-40px)-32.5px)-50px)] h-[20px] bg-[#26374A] ml-[20px] rounded-[20px] flex justify-end items-center">
                <img
                    className="w-[19px] mr-[30px] cursor-pointer ease-in-out duration-300 hover:opacity-[0.9] hover:scale-[0.9]"
                    src={Settings}/>
                <div
                    className="w-[15px] h-[15px] bg-[#248722] rounded-full mr-[30px] cursor-pointer ease-in-out duration-300 hover:opacity-[0.9] hover:scale-[0.9]"
                    onClick={() => {
                        ipcRenderer.send('hide')
                    }}/>
                <div
                    className="w-[15px] h-[15px] bg-[#AFB937] rounded-full mr-[30px] cursor-pointer ease-in-out duration-300 hover:opacity-[0.9] hover:scale-[0.9]"
                    onClick={() => {
                        ipcRenderer.send('open')
                    }}/>
                <div
                    className="w-[15px] h-[15px] bg-[#B12020] rounded-full mr-[10px] cursor-pointer ease-in-out duration-300 hover:opacity-[0.9] hover:scale-[0.9]"
                    onClick={() => {
                        ipcRenderer.send('close')
                    }}/>
                <p className="text-white font-MainFont mr-[10px]">{time}</p>
            </div>
        </div>
    )
}