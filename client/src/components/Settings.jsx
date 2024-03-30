import Logo from "../images/icon.png";
import Minus from '../images/minus.png'
import {useEffect} from "react";

const {
    ipcRenderer
} = window.require("electron");//
export const Settings = () => {
    useEffect(() => {
        document.title = "Nodule - Настройки"
    }, []);
    return (
        <div className="w-[100vw] h-[100vh] bg-[#2E3440]">
            <div id="NavBar" className="w-[100%] h-[20px] bg-[#20252F] flex">
                <img src={Logo} className="ml-[10px] scale-[0.8] opacity-[1] h-[100%]"/>
                <p className="font-MainFont text-white h-[100%] leading-[20px] ml-[10px] text-xs">Настройки</p>
                <img id="navElements" src={Minus}
                     className="scale-[0.8] h-[100%] ml-auto mr-[5px] cursor-pointer ease-in-out duration-300 hover:opacity-[0.9] hover:scale-[0.9]"
                     onClick={() => {
                         ipcRenderer.send('close_settings')
                     }}/>
            </div>
            <div className="w-[100%] h-[calc(100%-20px)] flex items-center">
                <div className="w-[20%] h-[90%] border-r-[2px] border-white">

                </div>
            </div>
        </div>
    )
}