import React, {createContext, useState} from "react"

const PathContext = createContext()

const PathContextProvider = ({children}) => {
    const [path, setPath] = useState(null);
    const [openedFiles, setOpenedFiles] = useState({viewFile: {}, files: []})
    return (
        <PathContext.Provider value={{path, setPath, openedFiles, setOpenedFiles}}>
            {children}
        </PathContext.Provider>
    );
};

export {PathContext, PathContextProvider}