"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_DOMAIN = "metalab.com";

function isAllowedEmail(email: string) {
  return email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`);
}

function isValidCode(code: string) {
  return code === process.env.ACCESS_CODE;
}

export async function login(_prev: { error: string } | null, formData: FormData) {
  const email = formData.get("email") as string;
  const code = formData.get("code") as string;

  if (!isAllowedEmail(email)) {
    return { error: `ACCESS DENIED: only @${ALLOWED_DOMAIN} accounts permitted` };
  }

  if (!isValidCode(code)) {
    return { error: "ACCESS DENIED: invalid access code" };
  }

  const supabase = await createClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: process.env.ACCESS_CODE!,
  });

  if (!signInError) {
    revalidatePath("/", "layout");
    redirect("/game");
  }

  // Account doesn't exist yet — create it
  if (signInError.code === "invalid_credentials") {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password: process.env.ACCESS_CODE!,
      options: { emailRedirectTo: undefined },
    });

    if (signUpError) {
      return { error: signUpError.message.toUpperCase() };
    }

    revalidatePath("/", "layout");
    redirect("/game");
  }

  return { error: signInError.message.toUpperCase() };
}

export async function signup(_prev: { error: string } | null, formData: FormData) {
  const email = formData.get("email") as string;
  const code = formData.get("code") as string;

  if (!isAllowedEmail(email)) {
    return { error: `ACCESS DENIED: only @${ALLOWED_DOMAIN} accounts permitted` };
  }

  if (!isValidCode(code)) {
    return { error: "ACCESS DENIED: invalid access code" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password: process.env.ACCESS_CODE!,
  });

  if (error) {
    return { error: error.message.toUpperCase() };
  }

  revalidatePath("/", "layout");
  redirect("/game");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
