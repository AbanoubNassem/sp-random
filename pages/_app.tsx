'use client'
import '../globals.css'
import { FC } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';

import TopBar from "../components/TopBar";
import AnimatedChart from "../components/AnimatedChart";
import PlayersTable from "../components/PlayersTable";
import Ranking from "../components/Ranking";
import Chat from "../components/Chat";
import LoginForm from "../components/LoginForm";

import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'SP-Game',
    description: 'Created by Abanoub Nassem',
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const loggedIn = false;

  return (  <main className={`${inter.className} dark flex min-h-screen flex-col items-center py-10  px-36 bg-slate-800 `}>
      <div className={'container w-9/12'}>
        <TopBar/>

        <div className={'w-full grid grid-cols-5 gap-4'}>
            <div className={'col-span-2 w-full'}>
                {
                    loggedIn ? (
                            <>
                                <button
                                    className="w-full mb-5 hover:bg-gray-10 dark:hover:bg-gray-700 bg-gradient-to-r from-pink-500 to-orange-500 text-white py-2 px-4 rounded-md shadow-md">
                                    Start
                                </button>

                                <PlayersTable/>
                            </>
                        )
                        :
                        <LoginForm/>
                }

            </div>
            <AnimatedChart/>
        </div>

        <div className={'w-full my-10 grid grid-cols-6 gap-4'}>
            <Ranking/>
            <Chat/>
        </div>
    </div>  
    </main>
  );
};

export default MyApp;
