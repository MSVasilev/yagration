class ProductCardMain {
    public i: number;
    public ui: number;
    public pi: string;
    public mfi: number;
    public mfd: string;
    public d: string;
    public productSpecShortList: string[];
    public imageList: string[];
    public shopsList: ShopsList[];
    public productAlternativesID: string[];
    public analogList: AnalogList[];
    public productSpecs: ProductSpecs[];
    public productRatings: ProductRatings;
}

class ProductRatings {
    productRatingCount: number;
    productRatingAvg: number;
    productRatingLightList: ProductRatingLightList[];
}

class ProductRatingLightList {
    ratingID: number;
    ratingName: string;
    ratingStars: number;
    ratingTypeModel: string;
    ratingUsageTime: string;
    ratingPros: string;
    ratingCons: string;
    ratingComm: string;
    ratingDate: string;
    ratingPlus: number;
    ratingMinus: number;
}

class ProductSpecs {
    title: string;
    left: string[];
    right: string[];
}

class AnalogList {
    i: number;
    pi: string;
    mfi: number;
    mfd: string;
    d: string;
    productRatingCount: string;
    productRatingStars: string;
    productSpecShortList: string[];
    shopsList: ShopsList[];
}

class ShopsList {
    shopID: number;
    shopType: number;
    shopName: string;
    shopPhone: string;
    shopAdress: string;
    shopDeliveryInfo: string;
    shopDeliveryAvail: string;
    shopPrice: number;
    shopRatingCount: number;
    shopRatingStars: number;
}

