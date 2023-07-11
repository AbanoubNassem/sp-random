import React from "react";
import Image from "next/image";
import {Card, TextInput} from "flowbite-react";


export default function Chat() {
    return (<div className="col-span-3">
        <div className='mb-3 flex flex-row items-center'>
            <Image src={'/message.png'} alt='current round' width={20} height={20}/>
            <span className='mx-3 text-white font-bold'>Chat</span>
        </div>
        <Card className={'col-span-3 h-72'}>
            <ul className="h-full overflow-auto">
                <li className="flex flex-row mb-5">
                    <span className="text-sm mr-4 text-red-500">Cpu:1</span>
                    <span className="bg-gray-600 rounded p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </span>
                </li>
                <li className="flex flex-row">
                    <span className="text-sm mr-4 text-blue-500">Cpu:1</span>
                    <span className="bg-gray-600 rounded p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto culpa deleniti earum, eius eligendi fugiat fugit impedit magnam molestiae nam pariatur recusandae saepe sed suscipit tenetur veritatis! Itaque, magnam.</span>
                </li>
            </ul>
            <div className="flex flex-row justify-between">
                <TextInput className="w-full mr-6"/>
                <button
                    className="py-2 px-6 hover:bg-gray-10 dark:hover:bg-gray-700 bg-gradient-to-r from-pink-500 to-orange-500 text-white  rounded-md shadow-md">
                    Start
                </button>
            </div>
        </Card>
    </div>);
}