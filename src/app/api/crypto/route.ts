import { NextResponse } from "next/server";
import axiosApiInstance from "../axios-config";
import { mainList } from "../url-config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const params = Object.fromEntries(searchParams.entries());

  try {
    const { data } = await axiosApiInstance.get(mainList, { params });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
