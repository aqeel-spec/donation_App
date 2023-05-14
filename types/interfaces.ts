export interface Product {
    $id : number  ,
    Item_name : string,
    Price : number,
    imagePath : string,
    address : string,
    donate : string,
    ph : number,
    duration : number,
    Product_name : string
};

export interface CartItem {
    product : Product,
    quantity : number
}