import {useEffect, useRef, useState} from "react";
import Chevron from '../images/chevron.svg'
import Highlight from 'react-highlight'

const {
    ipcRenderer
} = window.require("electron");
export const AiComponent = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        ipcRenderer.removeAllListeners()
        ipcRenderer.on('view_message', (error, data) => {
            setMessages([...messages, {role: 'answer', content: data}])
        })
    }, [messages]);
    return (
        <div className="w-[100%] h-[100%]">
            <div
                className="w-[100%] h-[25px] bg-[#273B53] rounded-r-[20px] rounded-tl-[20px] text-center font-MainFont text-[#C0D1EC] flex items-center justify-center">
                <p>
                    ИИ-помощник
                </p>
                <p className="text-gray-500 ml-[5px] text-sm">
                    gpt4
                </p>
            </div>
            <div className="w-[100%] h-[85%] bg-[#2E3440] mt-[10px] rounded-t-[20px] overflow-y-scroll">
                {
                    messages.map((message) => {
                        if (message.role === 'user') {
                            return (
                                <div
                                    className="w-[90%] ml-[5%] bg-[#76889C] text-black mt-[10px] rounded-[30px] rounded-bl-[0px]">
                                    <p className="font-MainFont text-sm text-[#2E3440] ml-[20px]">Ваш запрос:</p>
                                    <p className="font-MainFont w-[95%] text-[#122740] ml-[2.5%] text-center">
                                        {message.content}
                                    </p>
                                </div>
                            )
                        }
                        const parts = message.content.split('```')
                        return (
                            <div
                                className="w-[90%] ml-[5%] bg-[#122740] text-black mt-[10px] mb-[30px] rounded-[30px] rounded-bl-[0px]">
                                <p className="font-MainFont text-sm text-[#76889C] ml-[20px]">Ответ ассистента:</p>
                                <p className="font-MainFont w-[95%] text-[#76889C] ml-[2.5%] text-center">
                                    {parts.map((part, index) => {
                                        if (index % 2 === 1) {
                                            console.log()
                                            let text = part.split('\n')
                                            text.shift()
                                            text = text.join('\n')
                                            const lang = part.split('\n')[0]
                                            return <div className="rounded-[30px] overflow-hidden"><Highlight className={'language-' + lang}>
                                                {text}
                                            </Highlight></div>
                                        }
                                        return (
                                            <div>
                                                {part}
                                            </div>
                                        )
                                    })}
                                </p>
                            </div>
                        )
                    })
                }
                {messages && messages[messages.length - 1] && messages[messages.length - 1].role === 'user' ?
                    <div>
                        <div
                            className="w-[90%] ml-[5%] bg-[#122740] text-black mt-[10px] mb-[30px] rounded-[30px] rounded-bl-[0px]">
                            <p className="font-MainFont text-sm text-[#76889C] ml-[20px]">Ответ ассистента:</p>
                            <div className="mb-[5px]">
                                <div className="ml-[5px] flex items-center justify-center">
                                    <svg aria-hidden="true"
                                         className="w-5 h-5 text-gray-200 animate-spin dark:text-slate-600 fill-blue-50"
                                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"/>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"/>
                                    </svg>
                                    <p className="font-MainFont text-[#76889C] ml-[5px]">Подождите...</p>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div>
                    </div>}
            </div>
            <div className="w-[100%] items-center h-[calc(15%-45px)] mt-[10px] bg-[#273B53] rounded-b-[10px] flex">
                <input className="w-[70%] ml-[5%] h-[100%] bg-transparent outline-none text-white font-MainFont"
                       placeholder="Сообщение NoduleAI" id="ai_input" onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        ipcRenderer.send('send_message', e.target.value);
                        setMessages([...messages, {role: 'user', content: e.target.value}])
                        e.target.value = ''
                    }
                }}/>
                <img src={Chevron}
                     className="h-[70%] rotate-180 scale-[0.7] ml-auto hover:opacity-[0.5] cursor-pointer ease-in-out duration-300"
                     onClick={() => {
                         ipcRenderer.send('send_message', document.querySelector('#ai_input').value);
                         setMessages([...messages, {role: 'user', content: document.querySelector('#ai_input').value}])
                         document.querySelector('#ai_input').value = ''
                     }}/>
            </div>
        </div>
    )
}