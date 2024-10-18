import React, { useEffect, useState} from "react";
import { getYearGoals } from "../utils/supabaseFunctions";
// import YGoals from '../components/YGoals';
import {ygoals} from '../utils/interface';


type Props = {
  yeargoals: ygoals[];
}

const YGoals = (props: Props) => {
  const {yeargoals} = props;
  return(
    <div>
      <h1>TodoList</h1>
      <ul>
        {yeargoals.map((ygoal) =>(
          <li key={ygoal.id}>{ygoal.goal}</li>
        ))}
      </ul>
    </div>
  )
}


export default YGoals;