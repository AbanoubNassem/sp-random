"use client";
import "../globals.css";
import { FC } from "react";
import type { AppProps } from "next/app";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SP-Game",
  description: "Created by Abanoub Nassem",
};

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <main
      className={`${inter.className} dark flex min-h-screen flex-col items-center py-10  px-36 bg-slate-800 `}
    >
      <Head>
        <title>SP-Game</title>
      </Head>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
