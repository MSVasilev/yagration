/**
 * Created by Сергей on 28.08.2015.
 */
class Manufacturer {
    public i:number;
    public ui:string;
    public ds:string;
    public da:string;
}

class Product {
    public i:number;
    public ui:String;
    public mfi:number;
    public ns:String;
}

class ManufacturerListLight {
    public mf:Array<Manufacturer>;
}

class ProductListLight {
    public p:Array<Product>;
}

class Analog {
    public i:number;
    public pi:number;
    public mfi:number;
    public ns:string;
    public pia:number;
    public mfia:number;
    public _int:number;
}

class AnalogListLight {
    public a:Array<Analog>;

}

class PriceProduct {
    public i:number;
    public ui:string;
    public pi:number;
    public mfi:number;
    public mfd:string;
    public d:string;
    public n:string;
    public u:string;
    public c:string;
    public upd:string;
    public o:number;
    public pr:string;
    public prui:string;
    public uri:string;
    public q:number;
    public p:number;
    public p1:number;
    public p2:number;
    public p3:number;
    public p4:number;
    public p5:number;
    public dp:string;
    public mo:string;
}

class PriceProductListLight {
    public p:Array<PriceProduct>;

}

class PriceListLight {
    public manufacturerListLight:ManufacturerListLight;
    public productListLight:ProductListLight;
    public analogListLight:AnalogListLight;
    public priceProductListLight:PriceProductListLight;

    constructor() {
        //this.manufacturerList = new Array<Manufacturer>();
    }
}