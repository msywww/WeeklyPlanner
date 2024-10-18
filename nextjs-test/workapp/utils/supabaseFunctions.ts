import supabase from "./supabase";

export const getYearGoals = async() => {
  const yeargols = await supabase.from("year-goal").select("*");
  return yeargols.data;
};
