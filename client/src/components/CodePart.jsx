import {useContext, useEffect, useState} from "react";
import {PathContext} from "../contexts/PathContext";
import Picture from "../images/picture.png";
import Json from "../images/json.png";
import Stop from "../images/StopFile.png";
import Dir from "../images/Folder.svg";
import Python from "../images/Python.svg";
import Js from "../images/js.png";
import Cpp from "../images/c-.png";
import Css from "../images/css-3.png";
import Html from "../images/html-5.png";
import File from "../images/File.svg";
import Close from '../images/close.png'
import * as path_module from "path";
import Editor from "@monaco-editor/react";

const {
    ipcRenderer
} = window.require("electron");

export const CodePart = () => {
    const {path, setPath, openedFiles, setOpenedFiles} = useContext(PathContext)
    const renderIcon = (ext, name) => {
        if (ext === '.png' || ext === '.jpeg' || ext === '.svg' || ext === '.gif' || ext === '.raw' || ext === '.tiff' || ext === '.bmp' || ext === '.psd' || ext === '.raw' || ext === '.ico') {
            return (
                <img className="ml-[5px] h-[80%] pr-[5px]" src={Picture}/>
            )
        } else if (ext === '.json') {
            return (
                <img className="ml-[5px] h-[80%] pr-[5px]" src={Json}/>
            )
        } else if (name === '.gitignore') {
            return (
                <img className="ml-[5px] h-[80%] pr-[5px]" src={Stop}/>
            )
        } else if (ext === '') {
            return (
                <img className="ml-[5px] h-[80%] pr-[5px]" src={Dir}/>
            )
        } else if (ext === '.py') {
            return (
                <img className="ml-[5px] h-[80%] pr-[5px]" src={Python}/>
            )
        } else if (ext === '.js') {
            return (
                <img className="ml-[5px] h-[80%] pr-[5px]" src={Js}/>
            )
        } else if (ext === '.cpp') {
            return (
                <img className="ml-[5px] h-[80%] pr-[5px]" src={Cpp}/>
            )
        } else if (ext === '.js') {
            return (
                <img className="ml-[5px] h-[80%] pr-[5px]" src={Css}/>
            )
        } else if (ext === '.html' || ext === '.htm') {
            return (
                <img className="ml-[5px] h-[80%] pr-[5px]" src={Html}/>
            )
        } else {
            return (
                <img className="ml-[5px] h-[80%] pr-[5px]" src={File}/>
            )
        }
    }
    return (
        <div className="w-[100%] h-[70%]">
            <div className="openedFiles w-[calc(100%+50px)] h-[25px] bg-[#122740] ml-[-20px]">
                <div
                    className="innerFiles w-[calc(100%-50px)] ml-[20px] h-[25px] whitespace-nowrap overflow-x-scroll overflow-y-hidden">
                    {openedFiles.files.map((file) => {
                        if (file.path === openedFiles.viewFile.path) {
                            return (
                                <div
                                    className="w-fit relative h-[100%] bg-[#273B53] mr-[20px] inline-block rounded-t-[10px] border-[#BAC0FD] ease-in-out duration-300 hover:border-white overflow-y-visible">
                                    <div
                                        className="flex bg-[#273B53] w-[100%] h-[100%] items-center rounded-t-[10px] cursor-default ease-in-out duration-300">
                                        {renderIcon(path_module.extname(file.path), file.name)}
                                        <p className="font-MainFont pr-[5px] h-[100%] text-sm text-white whitespace-nowrap leading-[25px]">{path_module.basename(file.path)}</p>
                                        <img
                                            className="h-[100%] scale-[0.6] ml-auto ease-in-out duration-300 hover:opacity-[0.5]"
                                            src={Close} onClick={(event) => {
                                            event.stopPropagation();
                                            for (let i = 0; i < openedFiles.files.length; i++) {
                                                if (openedFiles.files[i].path === file.path) {
                                                    let spliced = [...openedFiles.files]
                                                    spliced.splice(i, 1);
                                                    if (spliced.length > 0) {
                                                        setOpenedFiles({viewFile: spliced[0], files: spliced})
                                                    } else {
                                                        setOpenedFiles({viewFile: {}, files: []})
                                                    }
                                                }
                                            }
                                        }}/>
                                    </div>
                                    <div
                                        className="w-[104%] h-[2px] bg-[#3656FE] absolute top-0 left-0 mt-[23px] rounded-[50px] ml-[-2%]"/>
                                </div>)
                        } else {
                            return (
                                <div id="Elem"
                                     className="w-fit relative h-[100%] bg-[#273B53] mr-[20px] rounded-t-[10px] inline-block ease-in-out duration-300 hover:border-white"
                                     onClick={() => {
                                         console.log(1)
                                         ipcRenderer.send('set_file', file.path)
                                         setOpenedFiles({files: openedFiles.files, viewFile: file})
                                     }}>
                                    <div
                                        className="flex bg-[#273B53] w-[100%] h-[100%] rounded-t-[10px] items-center cursor-default ease-in-out duration-300">
                                        {renderIcon(path_module.extname(file.path), file.name)}
                                        <p className="font-MainFont pr-[5px] h-[100%] text-sm text-white whitespace-nowrap leading-[25px]">{path_module.basename(file.path)}</p>
                                        <img
                                            className="h-[100%] scale-[0.6] ml-auto ease-in-out duration-300 hover:opacity-[0.5]"
                                            src={Close} onClick={(event) => {
                                            event.stopPropagation();
                                            for (let i = 0; i < openedFiles.files.length; i++) {
                                                if (openedFiles.files[i].path === file.path) {
                                                    let spliced = [...openedFiles.files]
                                                    spliced.splice(i, 1);
                                                    setOpenedFiles({viewFile: openedFiles.viewFile, files: spliced})
                                                }
                                            }
                                        }}/>
                                    </div>
                                    <div id="ElemLine"
                                         className="w-[104%] h-[2px] bg-transparent ease-in-out duration-300 absolute top-0 left-0 mt-[23px] rounded-[50px] ml-[-2%]"/>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div className="w-[100%] h-[calc(100%-35px)] bg-[#08142D] mt-[10px] rounded-t-[10px]">
                <Editor
                    height='85vh'
                    width='100%'
                    language="javascript"
                    defaultValue='// some comment'
                />
            </div>
        </div>
    )
}