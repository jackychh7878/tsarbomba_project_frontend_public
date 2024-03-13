export interface TransactionDetailDto {
    tid:       number;
    buyer_uid: number;
    datetime:  string;
    status:    string;
    total:     number;
    items:     Item[];
}

export interface Item {
    tpid:     number;
    product:  ProductDetailDto;
    quantity: number;
    subtotal: number;
}

export interface ProductDetailDto {
    pid:         number;
    name:        string;
    description: string;
    image_url:   string;
    price:       number;
    stock:       number;
    priceId:     string;
}