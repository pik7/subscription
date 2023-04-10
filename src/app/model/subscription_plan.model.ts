export interface Subscription_plan {
    duration_months:number;
    price_usd_per_gb:number;
}

export interface Parameter{
    duration:number;
    amount:number;
    upfront:string;
}
export interface Payment{
    creditCartNumber:number;
    creditCartExpDate:Date;
    CreditCartSecCode:number;
}


export interface DataSubcription{
    parameter:Parameter;
    payment:Payment;
    email:string;
    totalPrice:number;
    pricePerGB:number;
}