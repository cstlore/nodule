import React, {createContext, useState} from "react"

const PathContext = createContext()

const PathContextProvider = ({children}) => {
    const [path, setPath] = useState(null);
    return (
        <PathContext.Provider value={{path, setPath}}>
            {children}
        </PathContext.Provider>
    );
};

export {PathContext, PathContextProvider}