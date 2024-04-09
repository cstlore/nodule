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
import {motion} from "framer-motion"
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Editor from '../styles/editor.json';

const images_map = [Json, Python, Js, Cpp, Css, Html]
const {
    ipcRenderer
} = window.require("electron");
let editor = null

export const CodePart = () => {
    const {path, setPath, openedFiles, setOpenedFiles} = useContext(PathContext)
    const [image, setImage] = useState(Picture);
    const [imageIndex, setImageIndex] = useState(0);
    const [wasSaved, setWasSaved] = useState(true)
    useEffect(() => {
        if (document.querySelector("#logo")) {
            let interval = null;
            interval = setInterval(() => {
                if (document.querySelector("#logo")) {
                    let image = images_map[imageIndex];
                    const attr = document.querySelector("#logo");
                    attr.src = image;
                    // update the img index to state
                    setImageIndex((imageIndex) =>
                        imageIndex === 5 ? 0 : imageIndex + 1
                    );
                    // update the src in state.
                    setImage(attr.src);
                }
            }, 2000);
// When our code runs and reruns for every render, useEffect also cleans up after itself using the cleanup function.
// Here we clear the interval to remove the effects that could happen with state change while interval.
            return () => clearInterval(interval);
        }
    }, [image, imageIndex]);
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
    useEffect(()=>{
        ipcRenderer.on('open_file', (event, {text: text, language: language, filePath: filePath}) => {
            console.log(text)
            monaco.editor.getModels().forEach(model => model.dispose());
            monaco.editor.defineTheme('NoduleIDE', Editor);
            editor = monaco.editor.create(document.querySelector('#editor'), {
                value: text,
                language: language,
                theme: "NoduleIDE",
                fontSize: "12px",
                automaticLayout: true,
                mouseWheelZoom: true,
            });
            editor.onKeyDown((e) => {
                if (e.keyCode === 49 /** KeyCode.KeyS */ && e.ctrlKey) {
                    ipcRenderer.send('save_file', {
                        file_path: filePath,
                        text: editor.getValue()
                    })
                } else {
                    setWasSaved(false)
                }
            });
            setWasSaved(true)
        })
        return ()=>{
            ipcRenderer.removeAllListeners('open_file')
        }
    }, [])
    useEffect(() => {
        ipcRenderer.send('open_file', openedFiles.viewFile.path)
    }, [openedFiles.viewFile]);
    return (
        <div className="w-[100%] h-[70%]">
            <div className="openedFiles w-[calc(100%+50px)] h-[25px] bg-[#122740] ml-[-20px]">
                <div
                    className="innerFiles w-[calc(100%-50px)] ml-[20px] h-[25px] whitespace-nowrap overflow-x-scroll overflow-y-hidden">
                    {openedFiles.files.length === 0 ?
                        <div className="w-[100%] h-[100%] flex justify-center">
                            <div
                                className="bg-[#273B53] w-[200px] h-[100%] rounded-t-[10px] border-[#BAC0FD] flex items-center">
                                <div className="h-[100%] aspect-square overflow-hidden ml-auto">
                                    <motion.div
                                        key={image}
                                        animate={{x: 20, opacity: 1}}
                                        transition={{
                                            delay: 1,
                                            x: {type: "spring", stiffness: 100},
                                            default: {duration: 2}
                                        }}
                                    >
                                        <img id="logo" src={image} className="rounded scale-[0.8] h-[80%] ml-[-20px]"/>
                                    </motion.div>
                                </div>
                                <p className="text-white font-MainFont text-sm ml-auto mr-[20px]">Откройте файл</p>
                            </div>
                        </div>
                        :
                        openedFiles.files.map((file) => {
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
                                        {wasSaved ?
                                            <div
                                                className="w-[104%] h-[2px] bg-[#3656FE] absolute top-0 left-0 mt-[23px] rounded-[50px] ml-[-2%]"/>
                                            :
                                            <div
                                                className="w-[104%] h-[2px] bg-[#883F15] absolute top-0 left-0 mt-[23px] rounded-[50px] ml-[-2%]"/>
                                        }
                                    </div>
                                )
                            } else {
                                return (
                                    <div id="Elem"
                                         className="w-fit relative h-[100%] bg-[#273B53] mr-[20px] rounded-t-[10px] inline-block ease-in-out duration-300 hover:border-white"
                                         onClick={() => {
                                             ipcRenderer.send('save_file', {
                                                 file_path: openedFiles.viewFile.path,
                                                 text: editor.getValue()
                                             })
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
            {
                (Object.keys(openedFiles.viewFile).length === 0 || !openedFiles.viewFile) ?
                    <div
                        className="flex justify-center items-center w-[100%] h-[calc(100%-35px)] bg-[#2E3440] mt-[10px] rounded-t-[10px] text-white">
                        <div className="rounded-md p-4 max-w-sm w-full mx-auto">
                            <div className="animate-pulse flex space-x-4 scale-[1.3]">
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-300 rounded"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-300 rounded"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                        </div>
                                        <div className="grid grid-cols-6 gap-4">
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-3"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                                        </div>
                                        <div className="grid grid-cols-6 gap-4">
                                            <div className="h-2 bg-slate-300 rounded col-span-5"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                        </div>
                                        <div className="grid grid-cols-6 gap-4">
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-3"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div id="editor"
                         className="w-[100%] h-[calc(100%-35px)] bg-[#2E3440] mt-[10px] rounded-t-[10px] overflow-hidden">
                    </div>
            }
        </div>
    )
}