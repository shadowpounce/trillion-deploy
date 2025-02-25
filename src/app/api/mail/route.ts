import { NextResponse } from "next/server";
import clearData from "@/utils/clearData";
import fetch from 'node-fetch';

export async function POST(request: Request) {
  const {body, hook} = await request.json();

  const fetchParams: Record<string, { url: string; token: string }> = {
    hookRequest: {
      url: "https://hook.us1.make.com/f6ysdyqmltjts5v0roagqknna5sgs27m",
      token: "6c1d3cc3-b1f1-4d75-bbef-2b4700367a37",
    },
    hookContact: {
      url: "https://hook.us1.make.com/2qfylakzaxka9jfqsmdf49y3rtqk4ni3",
      token: "6294687a-652b-4fc7-b2d5-5b79a0a4fc15",
    },
  }

  try {
    const { url, token } = fetchParams[hook];
    
    const returnData = {
      successfully: true,
      message: "Message sent successfully!",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `TDA-bearer ${token}`,
      },
      body: JSON.stringify(clearData(body)),
    });

    returnData.successfully = response.ok;

    return NextResponse.json(
      returnData,
      { status: 200 }
    );

  } catch (error) {
    console.error("Error sending to webhook:", error);
    return NextResponse.json(
      { message: "Failed to send message.", successfully: false },
      { status: 500 }
    );
  }
}
