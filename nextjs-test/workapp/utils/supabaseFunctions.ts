import supabase from "./supabase";

// 年間目標
export const getYearGoals = async() => {
  const yeargoals = await supabase.from("year-goal").select("*");
  return yeargoals.data;
};

export const addYearGoals = async(goal: any) => {
  await supabase.from("year-goal").insert({goal: goal});
};

export const deleteYearGoals = async(id: number) => {
  await supabase.from("year-goal").delete().eq("id",id);
};

export const completeYearGoals = async(id: number) => {
  const { data: currentGoal } = await supabase
    .from("year-goal")
    .select("complete")
    .eq("id", id)
    .single();

  const newCompleteStatus = !currentGoal?.complete;

  await supabase
    .from("year-goal")
    .update({ complete: newCompleteStatus })
    .eq("id", id);
};


// 月間目標
export const getMonthGoals = async() => {
  const monthgoals = await supabase.from("month-goal").select("*");
  return monthgoals.data;
};

export const addMonthGoals = async(goal: any) => {
  await supabase.from("month-goal").insert({goal: goal});
};

export const deleteMonthGoals = async(id: number) => {
  await supabase.from("month-goal").delete().eq("id",id);
};
export const completeMonthGoals = async(id: number) => {
  const { data: currentGoal } = await supabase
    .from("month-goal")
    .select("complete")
    .eq("id", id)
    .single();
    
  const newCompleteStatus = !currentGoal?.complete;

  await supabase
    .from("month-goal")
    .update({ complete: newCompleteStatus })
    .eq("id", id);
};


// 週間目標
export const getWeekGoals = async() => {
  const weekgoals = await supabase.from("week-goal").select("*");
  return weekgoals.data;
};

export const addWeekGoals = async(goal: any) => {
  await supabase.from("week-goal").insert({goal: goal});
};

export const deleteWeekGoals = async(id: number) => {
  await supabase.from("week-goal").delete().eq("id",id);
};

export const completeWeekGoals = async(id: number) => {
  const { data: currentGoal } = await supabase
    .from("week-goal")
    .select("complete")
    .eq("id", id)
    .single();
    
  const newCompleteStatus = !currentGoal?.complete;

  await supabase
    .from("week-goal")
    .update({ complete: newCompleteStatus })
    .eq("id", id);
};