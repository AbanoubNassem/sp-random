import TopBar from "../../components/TopBar";
import PlayersTable from "../../components/PlayersTable";
import LoginForm from "../../components/LoginForm";
import AnimatedChart from "../../components/AnimatedChart";
import Ranking from "../../components/Ranking";
import Chat from "../../components/Chat";
import { useCurrentUser } from "../../hooks/auth/useCurrentUser";
import { useEffect, useState } from "react";
import { betService } from "../../services/bet.service";
import reverse from "lodash/reverse";
import { NextPageContext } from "next";

interface Props {
  topUsersJson: string;
}

export default function Home({ topUsersJson }: Props) {
  const { user, refetchUser } = useCurrentUser();
  const [points, setPoints] = useState<number>(75);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [betResponse, setBetResponse] = useState<any>();
  const [speed, setSpeed] = useState<number>(1);
  const [topUsers, setTopUsers] = useState<Array<any>>(
    JSON.parse(topUsersJson),
  );
  const chartData = reverse(betResponse?.multipliers ?? []);

  useEffect(() => {
    refetchUser();
    console.log(topUsersJson);
  }, []);

  return (
    <div className={"container w-9/12"}>
      <TopBar
        user={user}
        points={points}
        onPointsUpdate={(p: number) => setPoints(p)}
        multiplier={multiplier}
        onMultiplierUpdate={(p: number) => setMultiplier(p)}
      />

      <div className={"w-full grid grid-cols-5 gap-4"}>
        <div className={"col-span-2 w-full"}>
          {user ? (
            <>
              <button
                disabled={points <= 0 || multiplier <= 0}
                className={`w-full mb-5  py-2 px-4  hover:bg-gray-10 dark:hover:bg-gray-700 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-md shadow-md ${
                  points > 0 && multiplier > 0
                    ? "cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
                onClick={async () => {
                  const res = await betService.bet(points, multiplier);
                  await refetchUser();
                  setBetResponse(res);
                  setTopUsers(res.topUsers);
                }}
              >
                Start
              </button>

              <PlayersTable
                bets={betResponse?.bets}
                speedValue={speed}
                onSpeedChanged={(s) => {
                  setSpeed(s);
                }}
              />
            </>
          ) : (
            <LoginForm />
          )}
        </div>
        <AnimatedChart data={chartData} xSpeed={speed} />
      </div>

      <div className={"w-full my-10 grid grid-cols-6 gap-4"}>
        <Ranking topUsers={topUsers} />
        <Chat />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  return { props: { topUsersJson: JSON.stringify(ctx.query.topUsers) } };
}
