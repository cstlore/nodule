import {NavBar} from "./components/NavBar"
import {Usage} from "./components/Usage";
import {Directories} from "./components/Directories";
import {CodePart} from "./components/CodePart";
import {Terminal} from "./components/Terminal";
import {AiComponent} from "./components/AiComponent";
import {useContext, useEffect} from "react";
import {PathContext} from "./contexts/PathContext";
import * as path_module from "path"

const {
    ipcRenderer
} = window.require("electron");

function App() {
    const {path, setPath, settings, setSettings} = useContext(PathContext)
    useEffect(() => {
        ipcRenderer.on('set_settings', (err, data) => {
            setSettings(JSON.parse(data))
        })
    }, [])
    return (
        <div className="App w-screen h-screen bg-[#20252F]">
            <NavBar/>
            <div className="w-[100vw] h-[100vh] pt-[40px] flex">
                <div className="pl-[20px] w-[15%] h-[97%]">
                    <div className="bg-[#273B53] w-[100%] h-[50%] rounded-tl-[20px]">
                        <p className="font-MainFont text-center text-[#C0D1EC] h-[25px]">Файлы</p>
                        <div className="bg-[#2E3440] w-[100%] h-[20px]">
                            <p className="font-MainFont text-center text-white text-sm shadow-[0px_4px_4px_0px_#00000040]">{
                                path ? path_module.basename(path) : "Нет проекта"
                            }</p>
                        </div>
                        <Directories/>
                    </div>
                    <div className="bg-[#273B53] w-[100%] h-[48%] mt-[2%] rounded-b-[20px]">
                        <div className="bg-[#2E3440] w-[100%] h-[20px]">
                            <p className="font-MainFont text-center text-[#C0D1EC] text-sm shadow-[0px_4px_4px_0px_#00000040]">Загруженность</p>
                        </div>
                    </div>
                </div>
                <div className="ml-[20px] w-[50%] h-[97%]">
                    <CodePart/>
                    <Terminal/>
                </div>
                <div className="ml-[20px] w-[30%] h-[95%] z-[1000000000]">
                    <AiComponent/>
                </div>
            </div>
        </div>
    );
}

export default App;
