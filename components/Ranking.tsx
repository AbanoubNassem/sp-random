import React from 'react';
import Image from "next/image";

export default function Ranking() {
    return (<div className="col-span-3">
        <div className='mb-3  flex flex-row items-center'>
            <Image src={'/rank.png'} alt='current round' width={20} height={20}/>
            <span className='mx-3 text-white font-bold'>Ranking</span>
        </div>
        <div className="relative overflow-x-auto  shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Score
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        1
                    </th>
                    <td className="px-6 py-1">
                        -
                    </td>
                    <td className="px-6 py-1">
                        -
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>);
}