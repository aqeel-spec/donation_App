import { NextRequest, NextResponse } from "next/server";
//import { SignUpData } from "@/utils/auth";
import { Account, ID, Client, Query } from "appwrite";
import { database } from "@/components/appwrite/Config";

{
  /** GET USER AUTH data from appwrite  */
}
// export async function GET(request: Request) {
//   return new Response('Hello, Next.js!')
// }
export async function GET(request: NextRequest) {
  const foodData = await database.listDocuments(
    "645742f1acfa7ac60606",
    "64574308c221d002643e",
    [Query.limit(100)]
  );
  return new Response(JSON.stringify(foodData));
}

//   post req appwrite auth
export async function POST(request: NextRequest) {
  const req: any = await request.json();

  // send form data to appwrite
  const client = new Client();
  client
    .setEndpoint(process.env.NEXT_APP_ENDPOINT as string)
    .setProject(process.env.NEXT_APP_PROJECT_ID as string);

  // register auth
  const account = new Account(client);
  //return NextResponse.json(req)
  if (req) {
    console.log("server Data", req);
    const promise = account.create(
      ID.unique(),
      req.email,
      req.password,
      req.name
    );
    promise.then(
      function (response) {
        console.log("appwrite Data", response);
      },
      function (error) {
        console.log(error);
      }
    );
    return NextResponse.json({ req });
  } else {
    return new NextResponse("Please include your data in the POST req");
  }
}