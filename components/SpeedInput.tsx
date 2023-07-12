import React from "react";
import Image from "next/image";
import { RangeSlider } from "flowbite-react";

interface Props {
  onSpeedChanged: (speed: number) => void;
  value: number;
}

export default function SpeedInput({ value, onSpeedChanged }: Props) {
  // const [value, setValue] = useState(1)
  return (
    <div>
      <div className="my-3  flex flex-row items-center">
        <Image
          src={"/bandwidth.png"}
          alt="current round"
          width={20}
          height={20}
        />
        <span className="mx-3 text-white font-bold">Speed</span>
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <RangeSlider
          className=""
          color={"red"}
          min="1"
          max="5"
          step={1}
          value={value}
          onChange={(ev) => {
            onSpeedChanged(+ev.target.value);
          }}
        />

        <div className="flex flex-row justify-between px-1">
          {[1, 2, 3, 4, 5].map((x) => (
            <span
              key={x}
              className={`text-xs ${
                x === value ? "text-red-500" : "text-white"
              }`}
            >
              {x}x
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
