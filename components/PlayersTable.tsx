import React from "react";
import Image from "next/image";
import SpeedInput from "./SpeedInput";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";
import orderBy from "lodash/orderBy";

interface Props {
  bets: any;
  onSpeedChanged: (speed: number) => void;
  speedValue: number;
}

export default function PlayersTable({
  bets,
  speedValue,
  onSpeedChanged,
}: Props) {
  const { user } = useCurrentUser();

  return (
    <div>
      <div className="mb-3  flex flex-row items-center">
        <Image src={"/trophy.png"} alt="current round" width={20} height={20} />
        <span className="mx-3 text-white font-bold">Current Round</span>
      </div>
      <div className="relative overflow-x-auto  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Point
              </th>
              <th scope="col" className="px-6 py-3">
                Multiplier
              </th>
            </tr>
          </thead>
          <tbody>
            {orderBy(bets ?? [], (x) => x, "desc").map((bet: any) => {
              return (
                <tr
                  key={bet.userId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {bet.userId === user.id ? "You" : bet.user.name}
                  </th>
                  <td className="px-6 py-1">{bet.points}</td>
                  <td className="px-6 py-1">{bet.multiplier}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <SpeedInput value={speedValue} onSpeedChanged={onSpeedChanged} />
    </div>
  );
}
