import React from "react";
import { ygoals } from "../utils/interface";
import { deleteYearGoals, getYearGoals } from "../utils/supabaseFunctions";
import usePassiveEventListener from '../hooks/usePassiveEventListener';

type Props = {
  ygoals: ygoals[];
  setYGoals: React.Dispatch<any>;
};

const YGoalslist = (props: Props) => {
  const { ygoals, setYGoals } = props;


  usePassiveEventListener('touchstart', (event) => {
    // タッチイベントの処理
    const handleDelete = async (id: number) => {
      await deleteYearGoals(id);
      let yeargoals = await getYearGoals();
      setYGoals(yeargoals);
    };

    return (
      <div>
        <ul className="mx-auto">
          {ygoals.map((ygoal: any) => (
            <div
              key={ygoal.id}
              className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between"
            >
              <li className="font-medium">✅ {ygoal.title}</li>
              <span
                className="cursor-pointer"
                onClick={() => handleDelete(ygoal.id)}
              >
                ✖
              </span>
            </div>
          ))}
        </ul>
      </div>
    );
  });
};

export default YGoalslist;