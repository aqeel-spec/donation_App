import { NextRequest , NextResponse } from "next/server";
//import { SignUpData } from "@/utils/auth";
import { Account , ID , Client } from "appwrite";

 
//  appwrite user data fetch here
const data = "https://jsonplaceholder.typicode.com/todos";

{/** GET USER AUTH data from appwrite  */}
// send form data to appwrite 
const client = new Client;
client.setEndpoint(process.env.NEXT_APP_ENDPOINT as string)
.setProject(process.env.NEXT_APP_PROJECT_ID as string);
// register auth 
const account = new Account(client);

export async function GET (request : NextRequest) {
    const client = new Client();
    const account = new Account(client);
    client
        .setEndpoint(process.env.NEXT_APP_ENDPOINT as string)
        .setProject(process.env.NEXT_APP_PROJECT_ID as string);
    const promise = account.createEmailSession('test@gmail.com', '12345678');
    // promise.then(function (response) {
    //     console.log(response); // Success
    // }, function (error) {
    //     console.log(error); // Failure
    // });
    const data = await promise;
   // const data = await promise;
    return NextResponse.json(data) 
}


//   post req appwrite auth
export async function POST (request : NextRequest) {
    const req : any = await request.json();

    // send form data to appwrite 
    const client = new Client;
    client.setEndpoint(process.env.NEXT_APP_ENDPOINT as string)
    .setProject(process.env.NEXT_APP_PROJECT_ID as string);

    // register auth 
    const account = new Account(client);
    //return NextResponse.json(req)
    if (req) {
        console.log("server Data",req)
        const promise = account.create(ID.unique(),req.email,req.password,req.name);
        promise.then(function (response) {
            console.log("appwrite Data",response);
        }, function (error) {
            console.log(error);
        });
        return NextResponse.json({req})
    }
    else {
        return new NextResponse("Please include your data in the POST req")
    }
}