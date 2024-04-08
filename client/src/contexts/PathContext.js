import React, {createContext, useState} from "react"

const PathContext = createContext()

const PathContextProvider = ({children}) => {
    const [path, setPath] = useState(null);
    const [settings, setSettings] = useState({})
    const [openedFiles, setOpenedFiles] = useState({viewFile: {}, files: []})
    return (
        <PathContext.Provider value={{path, setPath, openedFiles, setOpenedFiles, settings, setSettings}}>
            {children}
        </PathContext.Provider>
    );
};

export {PathContext, PathContextProvider}