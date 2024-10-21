import supabase from "./supabase";

export const getYearGoals = async() => {
  const yeargols = await supabase.from("year-goal").select("*");
  return yeargols.data;
};

export const addYearGoals = async(goal: any) => {
  await supabase.from("year-goal").insert({goal: goal});
};

export const deleteYearGoals = async(id: number) => {
  await supabase.from("year-goal").delete().eq("id",id);
};