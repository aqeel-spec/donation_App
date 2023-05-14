interface StorageData {
    total : number , 
     files : {
         $createdAt : string,
         $id : string,
         bucketId : string,
         mimeType : string,
         name : string,
         signature : string,
         sizeOriginal : number
     }[]
 };
 interface ListData {
    total : number , 
    documents : { 
        Item_name : string , $collectionId : string ,
        $createdAt : string,
        $databaseId  : string,
        $id : string 
    }[]
}
export interface CountryData {
    continent: string;
    continentCode: string;
    country: string;
    countryCode: string;
    ip: string;
 }
export interface FoodData {
    $collectionId: string;
    $databaseId: string;
    $id: string;
    $updatedAt: string;
    Item_name: string;
    countryData: CountryData[];
    name: string;
    imgArray: any[];
    latitude: number;
    logitude: number;
    ph: number;
    price: number;
  }
 