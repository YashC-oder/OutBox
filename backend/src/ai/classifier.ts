import { EmailCategory } from "../models/Email/EmailModel";

export async function classifyEmail(text: string): Promise<EmailCategory> {
  const response = await fetch("http://categoriser:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: text })
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.category as EmailCategory;
}
