"use client";
import React, { useEffect, useState } from "react";
import IncrementInput from "./IncrementInput";
import InfoText from "./InfoText";

interface Props {
  points: number;
  onPointsUpdate: (no: number) => void;
  multiplier: number;
  onMultiplierUpdate: (no: number) => void;
  user: any;
}

export default function TopBar({
  user,
  points,
  onPointsUpdate,
  multiplier,
  onMultiplierUpdate,
}: Props) {
  const getTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes}`;
  };
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={"w-full grid grid-cols-5 gap-4 mb-10"}>
      <IncrementInput
        value={points}
        label={"Points"}
        onIncrement={onPointsUpdate}
        onDecrement={onPointsUpdate}
        step={25}
        min={75}
        max={1000}
      />
      <IncrementInput
        value={multiplier}
        label={"Multiplayer"}
        step={0.25}
        min={0.25}
        max={10}
        onIncrement={onMultiplierUpdate}
        onDecrement={onMultiplierUpdate}
      />
      <InfoText iconPath={"/medal.png"} text={user?.points} />
      <InfoText iconPath={"/woman.png"} text={user?.name} />
      <InfoText iconPath={"/clock.png"} text={time} />
    </div>
  );
}
