import React,{useState} from "react";
import Image from "next/image";

interface Props {
    iconPath: string;
    text: string;
}

export default function InfoText({iconPath, text}: Props) {
    return <div
        className="col-span-1 flex flex-row justify-start items-center w-48 max-w-sm p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <Image src={iconPath} className={'mx-4'} width={20} height={20} alt={text}/>
        <div className="flex flex-1 justify-center">
            <p className="text-lg text-center text-gray-900 dark:text-white">{text}</p>
        </div>
    </div>

}