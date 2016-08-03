module ProductCard {

    export interface YagProductImage {
        Uri: string;
        Description: string;
    }

    export interface YagProductImageList {
        YagProductImage: YagProductImage[];
    }

    export interface YagProductParameter {
        Type: string;
        Key: string;
        Value: string;
    }

    export interface YagProductParameterList {
        YagProductParameter: YagProductParameter[];
    }

    export interface YagProductOpinion {
        OpinionCount: number;
        ValueAverage: number;
        I: number;
        Date: string;
        Author: string;
        Value: number;
        Pros: string;
        Cons: string;
        Overall: string;
        RatedPlus: number;
        RatedMinus: number;
    }

    export interface YagProductOpinionList {
        YagProductOpinion: YagProductOpinion[];
    }

    export interface YagProductImage2 {
        Uri: string;
        Description: string;
    }

    export interface YagAnalogListImageListLite {
        YagProductImage: YagProductImage2;
    }

    export interface YagProductParameterLite {
        Type: string;
        Key: string;
        Value: string;
    }

    export interface YagAnalogListParameterListLite {
        YagProductParameterLite: YagProductParameterLite[];
    }

    export interface YagProductOpinion2 {
        OpinionCount: number;
        ValueAverage: number;
    }

    export interface YagAnalogListOpinionListCount {
        YagProductOpinion: YagProductOpinion2;
    }

    export interface YagPriceListP {
        PriceCount: number;
        PriceAverage: number;
        PriceMin: number;
        PriceMax: number;
        I: number;
        Ui: string;
        Pi: number;
        Mfi: number;
        Mfd: string;
        N: string;
        U: string;
        C: string;
        Upd: string;
        O: number;
        Pr: string;
        Prui: string;
        Uri: string;
        Q: number;
        P: number;
        P1: number;
        P2: number;
        P3: number;
        P4: number;
        P5: number;
        Cr: string;
        Dp: string;
        Mo: string;
    }

    export interface YagAnalogListPriceList {
        YagPriceListP: YagPriceListP;
    }

    export interface YagAnalogListA {
        I: number;
        Pi: number;
        Mfi: number;
        Ns: string;
        Pia: number;
        Mfia: number;
        Int: number;
        YagAnalogListImageListLite: YagAnalogListImageListLite;
        YagAnalogListParameterListLite: YagAnalogListParameterListLite;
        YagAnalogListOpinionListCount: YagAnalogListOpinionListCount;
        YagAnalogListPriceList: YagAnalogListPriceList;
    }

    export interface YagProductAnalogListInProductCard {
        YagAnalogListA: YagAnalogListA[];
    }

    export interface YagPriceListP2 {
        PriceCount: number;
        PriceAverage: number;
        PriceMin: number;
        PriceMax: number;
        I: number;
        Ui: string;
        Pi: number;
        Mfi: number;
        Mfd: string;
        N: string;
        U: string;
        C: string;
        Upd: string;
        O: number;
        Pr: string;
        Prui: string;
        Uri: string;
        Q: number;
        P: number;
        P1: number;
        P2: number;
        P3: number;
        P4: number;
        P5: number;
        Cr: string;
        Dp: string;
        Mo: string;
    }

    export interface YagProductPriceList {
        YagPriceListP: YagPriceListP2[];
    }

    export interface YagProductProduct {
        XmlnsIisSql: string;
        XmlnsAvProductList: string;
        XmlnsYagProduct: string;
        XmlnsYagAnalogList: string;
        XmlnsYagManufacturerList: string;
        XmlnsYagPriceList: string;
        XmlnsXsi: string;
        XsiSchemaLocation: string;
        I: number;
        Mfd: string;
        N: string;
        Ns: string;
        Description: string;
        YagProductImageList: YagProductImageList;
        YagProductParameterList: YagProductParameterList;
        YagProductOpinionList: YagProductOpinionList;
        YagProductAnalogListInProductCard: YagProductAnalogListInProductCard;
        YagProductPriceList: YagProductPriceList;
    }

    export interface ProductCardMain {
        YagProductProduct: YagProductProduct;
    }

}


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
    




















