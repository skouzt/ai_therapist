"use server";

import { auth } from "@clerk/nextjs/server";
import { createsupabaseClient } from "../supabase";

export const createTherapist = async (formData: CreateTherapist) => {
  const { userId: author } = await auth();
  const supabase = createsupabaseClient();

  const { data, error } = await supabase
    .from("therapist")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "failed to create a therapist");

  return data[0];
};
