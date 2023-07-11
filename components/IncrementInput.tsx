import React , {useState} from "react";

interface Props {
    label: string;
    type?: string;
    step?: number;
    value?: any
}

export default function IncrementInput({label, type, step}: Props) {
    const [value, setValue] = useState(0);

    const increaseValue = () => {
        setValue(prevValue => prevValue + (step ?? 1));
    };

    const decreaseValue = () => {
        setValue(prevValue => prevValue - (step ?? 1));
    };


    return <div
        className="col-span-1 flex flex-row justify-between items-center p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">


        <button
            onClick={decreaseValue}
            type="button"
            className=" text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mx-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
            <svg className="w-2 h-2 text-gray-800 dark:text-white" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 10">
                <path
                    d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z"/>
            </svg>

        </button>


        <input type={type ?? "number"} step={1} id="first_name"
               className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-20 h-8 p-1 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
               placeholder={label} required defaultValue={value ?? 0}/>


        <button
            onClick={increaseValue}
            type="button"
            className=" text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mx-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
            <svg className="w-2 h-2 text-gray-800 dark:text-white" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 10">
                <path
                    d="M9.207 1A2 2 0 0 0 6.38 1L.793 6.586A2 2 0 0 0 2.207 10H13.38a2 2 0 0 0 1.414-3.414L9.207 1Z"/>
            </svg>
        </button>
    </div>

}