import { storage } from "@/components/appwrite/Config";
import { Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";


export async function GET (request : NextRequest) {
    const resImg = await storage.listFiles("64578c85c0db46208b12", [Query.limit(10)]);
    const {files} = resImg;
    
    return NextResponse.json(files) 
}
  
  
  
  
  