import {useEffect} from "react";
import './xterm.css';

const Term = require('xterm').Terminal;
const FitAddon = require('xterm-addon-fit').FitAddon;//
const {
    ipcRenderer
} = window.require("electron");
let terminalEvent = null
export const Terminal = () => {
    const term = new Term();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    useEffect(() => {
        const myNode = document.querySelector('#terminal-container');
        myNode.innerHTML = '';
        ipcRenderer.removeAllListeners('terminal-incData')
        if (myNode) {
            term.open(document.querySelector('#terminal-container'));
            terminalEvent = term.onData(e => {
                console.log(e)
                ipcRenderer.send("terminal-into", e);
            });
            ipcRenderer.on('terminal-incData', (event, data) => {
                term.write(data);
            })
            fitAddon.fit();//
            ipcRenderer.send('start_terminal')
            window.addEventListener('resize', () => {
                fitAddon.fit();
            })
        }
    }, []);
    return (
        <div className="w-[100%] h-[29%] bg-[#08142D] mt-[1%] rounded-b-[10px]">
            <div id="terminal-container"
                 className="w-[calc(100%-10px)] pl-[5px] h-[calc(100%-10px)] pt-[5px] overflow-y-hidden !font-MainFont">
            </div>
        </div>
    )
}