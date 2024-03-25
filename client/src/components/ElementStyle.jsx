import Chevron from '../images/chevron.svg'
import * as path_module from 'path'
import Dir from '../images/Folder.svg'
import File from '../images/File.svg'
import Python from '../images/Python.svg'
import Js from '../images/js.png'
import Cpp from '../images/c-.png'
import Html from '../images/html-5.png'
import Css from '../images/css-3.png'
import Stop from '../images/StopFile.png'
import Picture from '../images/picture.png'
import Json from '../images/json.png'
import {useContext, useEffect} from "react";
import {PathContext} from "../contexts/PathContext";

const {
    ipcRenderer
} = window.require("electron");
export const ElementStyle = ({file, openDir}) => {
    const {path, setPath, openedFiles, setOpenedFiles} = useContext(PathContext)
    const renderIcon = (ext, name) => {
        if (ext === '.png' || ext === '.jpeg' || ext === '.svg' || ext === '.gif' || ext === '.raw' || ext === '.tiff' || ext === '.bmp' || ext === '.psd' || ext === '.raw' || ext === '.ico') {
            return (
                <img className="ml-[5px] h-[80%]" src={Picture}/>
            )
        } else if (ext === '.json') {
            return (
                <img className="ml-[5px] h-[80%]" src={Json}/>
            )
        } else if (name === '.gitignore') {
            return (
                <img className="ml-[5px] h-[80%]" src={Stop}/>
            )
        } else if (ext === '') {
            return (
                <img className="ml-[5px] h-[80%]" src={Dir}/>
            )
        } else if (ext === '.py') {
            return (
                <img className="ml-[5px] h-[80%]" src={Python}/>
            )
        } else if (ext === '.js') {
            return (
                <img className="ml-[5px] h-[80%]" src={Js}/>
            )
        } else if (ext === '.cpp') {
            return (
                <img className="ml-[5px] h-[80%]" src={Cpp}/>
            )
        } else if (ext === '.js') {
            return (
                <img className="ml-[5px] h-[80%]" src={Css}/>
            )
        } else if (ext === '.html' || ext === '.htm') {
            return (
                <img className="ml-[5px] h-[80%]" src={Html}/>
            )
        } else {
            return (
                <img className="ml-[5px] h-[80%]" src={File}/>
            )
        }
    }
    return (
        <div
            className="w-[90%] h-[20px] mt-[10px] flex items-center ml-[10px] cursor-default hover:bg-[#1D2C3E] rounded-[5px] ease-in-out duration-300"
            onClick={() => {
                if (file.isFile) {
                    ipcRenderer.send('set_file', file.path)
                    if (openedFiles.files.includes(file)) {
                        setOpenedFiles({
                            viewFile: openedFiles.files.find((val) => val === file),
                            files: openedFiles.files
                        })
                    } else {
                        setOpenedFiles({
                            viewFile: file,
                            files: [...openedFiles.files, file]
                        })
                    }
                }
            }}>
            {[...Array(file.margin)].map((x) => {
                return (
                    <div className="h-[100%] w-[1em] flex items-center justify-center">
                        <div className="w-[3px] h-[3px] rounded-full bg-white opacity-[0.3]"/>
                    </div>
                )
            })}
            {!file.isFile &&
                <img src={Chevron}
                     className="h-[80%] cursor-pointer ease-in-out duration-300 hover:opacity-[0.9] hover:h-[90%]"
                     style={{transform: `${file.closed ? "rotate(180deg)" : "rotate(270deg)"}`}}
                     onClick={() => openDir(file)}/>
            }
            {renderIcon(path_module.extname(file.path), file.name)}
            <p className="font-MainFont text-[#C0D1EC] text-xs ml-[5px]">{file.name}</p>
        </div>
    )
}