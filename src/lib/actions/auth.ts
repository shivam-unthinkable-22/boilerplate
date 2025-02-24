"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions/signup";
import { cookies } from "next/headers"; // To work with cookies in the server-side environment

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare the user data to send to the Express API
  const userData = {
    username: formData.get("email"), // Assuming the email is used as the username
    password: formData.get("password"),
  };

  // Call the Express API to create a user (your existing /signup route in Express)
  const response = await fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    // If signup fails, return the errors
    return { message: result.message || "Signup failed" };
  }
  console.log("@@", result);
  // If signup is successful, store the JWT token in the cookies
  const token = result.token;

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true, // Prevent JavaScript access to the cookie
    secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
    sameSite: "strict", // Prevent cross-site requests
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  // Return success response
  return {
    message: "User registered successfully",
  };
}
