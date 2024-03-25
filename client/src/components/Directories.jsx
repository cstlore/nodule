import {useContext, useEffect, useState} from "react";
import {PathContext} from "../contexts/PathContext";
import {ElementStyle} from "./ElementStyle";

const {
    ipcRenderer
} = window.require("electron");
export const Directories = () => {
    const {path, setPath} = useContext(PathContext)
    const [files, setFiles] = useState([])
    const [index, setIndex] = useState(null)
    ipcRenderer.on('set_path', (event, args) => {
        setPath(args.path)
        let f = args.render[0]
        f.sort(function (a, b) {
            if (a.isFile && !b.isFile) {
                return 1;
            }
            if (a.isFile === b.isFile) {
                return 0;
            }
            if (!a.isFile && b.isFile) {
                return -1;
            }
        });
        setFiles(f)
    })
    useEffect(() => {
        if (index) {
            ipcRenderer.removeAllListeners('set_files')
            ipcRenderer.send('openDir', {p: files[index].path, margin: files[index].margin})
            ipcRenderer.on('set_files', (event, args) => {
                args.render[0].sort(function (a, b) {
                    if (a.isFile && !b.isFile) {
                        return 1;
                    }
                    if (a.isFile === b.isFile) {
                        return 0;
                    }
                    if (!a.isFile && b.isFile) {
                        return -1;
                    }
                });
                const f = args.render[0]
                const cachedArr = [...files]
                cachedArr.splice(index + 1, 0, ...f)
                cachedArr[index].closed = false
                setFiles(cachedArr)
            })
        }
    }, [index])
    const openDir = (elem) => {
        if (elem.closed) {
            setIndex(files.findIndex((val) => val === elem))
        } else {
            setIndex(null)
            const ind = files.findIndex((val) => val === elem)
            const cachedArr = [...files]
            cachedArr[ind].closed = true
            let indLen = ind + 1
            while (cachedArr[indLen].margin > cachedArr[ind].margin) {
                ++indLen
            }
            --indLen
            cachedArr.splice(ind + 1, indLen - ind)
            setFiles(cachedArr)
        }
    }
    return (
        <div className="w-[100%] h-[calc(100%-45px)]">
            {path ?
                <div className="w-[100%] h-[100%] overflow-y-scroll overflow-x-hidden">
                    {files.map((file) => {
                        return <ElementStyle file={file} openDir={openDir}/>
                    })
                    }
                </div>
                :
                <div className="w-[100%] h-[100%]">
                    <div className="w-[70%] h-[2px] bg-white ml-[15%] mt-[10px]"/>
                    <p className="font-BackFont w-[80%] ml-[10%] text-center text-sm text-[#C0D1EC] mt-[10px]">Ни один
                        проект не
                        открыт</p>
                    <div
                        className="w-[60%] h-[50px] justify-center bg-white ml-[20%] rounded-[10px] mt-[10px] flex items-center cursor-pointer ease-in-out duration-300 hover:opacity-[0.9] hover:ml-[calc(20%-5px)]"
                        onClick={() => {
                            ipcRenderer.send('open_project')
                        }}>
                        <p className="w-[80%] font-MainFont text-xs text-center">Открыть папку</p>
                    </div>
                    <div
                        className="w-[60%] justify-center h-[50px] bg-white ml-[20%] rounded-[10px] mt-[50px] flex items-center cursor-pointer ease-in-out duration-300 hover:opacity-[0.9] hover:ml-[calc(20%-5px)]">
                        <p className="w-[80%] font-MainFont text-xs text-center">Клонировать с GitHub</p>
                    </div>
                </div>
            }
        </div>
    )
}