import React from "react";
import {Card, TextInput} from "flowbite-react";
import {useState} from "react";

export default function LoginForm() {
    const [value, setValue] = useState('')

    return (<Card className="h-96">

        <span className="text-lg text-gray-400 text-center">Welcome</span>
        <span className="text-xs text-gray-600 text-center">Please enter your name</span>
        <TextInput defaultValue={value} onChange={(ev) => setValue(ev.target.value)}/>
        <button
            disabled={!!value.length}
            className={`py-2 px-6 hover:bg-gray-10 dark:hover:bg-gray-700 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-md shadow-md ${value.length ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
        >
            Accept
        </button>

    </Card>)
}