export class Order {
    orderId : number;
    userId : number;
    numberOfproducts : number;
    totalAmount: number;
    orderDate : Date;
}

export class OrderDetails{
    orderItemId : number;
    productId : number;
    quantity : number;
    price :number;
    totalAmount : number;
    userId: number;   
}

export class postOrderDetails{
    productId : number;
    quantity : number;
    price :number;
    totalAmount : number;
    userId: number;   
}

export class Category {
    categoryId: number;
    categoryName: string;
    constructor(CategoryId : number, CategoryName : string)
    {
        this.categoryId = CategoryId;
        this.categoryName = CategoryName;
    }
}

export class Products {
    productId: number;
    productName: string;
    categoryId: number;
    price: number;
    description: string;
    imageUrl: string;
}


export class Customer {
    userId:number;
    userName:string;
    email:string;
    phoneNo:string;
    address:string;
    pincode:string;
    
}

export class Users {
    userId:number;
    userPassword:string;
    RoleId:number;
}

export class ShoppingCart {

    cartNo : number;
    userId : number;
    productId : number;
    quantity : number;
    price : number;
    totalAmount : number;
}
export class Placeorder {
    userId : number;
    userName :string;
    email :string;
    phoneNo :string;
    address :string;
    pincode:string;
        
}


