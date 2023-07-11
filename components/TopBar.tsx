'use client'
import React from "react";
import IncrementInput from "./IncrementInput";
import InfoText from "./InfoText";

export default function TopBar() {
    return <div className={'w-full grid grid-cols-5 gap-4 mb-10'}>
       <IncrementInput label={"Points"}/>
        <IncrementInput label={"Multiplayer"} step={0.25}/>
        <InfoText iconPath={'/medal.png'} text={'1000'}/>
        <InfoText iconPath={'/woman.png'} text={'1000'}/>
        <InfoText iconPath={'/clock.png'} text={'1000'}/>
    </div>
}