/* eslint-disable @typescript-eslint/no-explicit-any */
import isValidJSON from "./isValidJSON";

export default async function query(body: Record<string, unknown>, url = "/api/mail"): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return null;
    }
    const text = await response.text();
    if(isValidJSON(text)) {
      return JSON.parse(text);
    } else {
      console.error("Invalid JSON response:", text);
      return null;
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    return null;
  }
}