/// <reference path="../controls.ts" />

class TableBox extends Control {
    description:string;
    htmlElement:HTMLElement;

    public fieldList:FieldList;
    public rowList:RowList;
    public header:Header;
    public style:HTMLStyleElement;

    private width:string = "100%";
    private height:string = "auto";

    constructor(id:string) {
        super(id);

        this.htmlElement = document.createElement("div");
        this.htmlElement.setAttribute("class", "iis-form-controls-tableBox");
        this.fieldList = new FieldList(this);
        //STYLE
        this.style = document.createElement('style');
        this.style.type = 'text/css';
        this.htmlElement.appendChild(this.style);

        this.rowList = new RowList(this);
        this.rowList.setHeight(this.height);
    }

    public createHtmlElement():HTMLElement {

        this.header = new Header(this);

        this.header.createHtmlElement();
        this.rowList.createHtmlElement();
        return this.htmlElement;
    }

    public setWidth(s:string):void {
        this.width = s;
        this.htmlElement.setAttribute("style", "width: " + s + ";");
    }

    public getWidth():string {
        return this.width;
    }
    public setHeight(s:string):void {
        this.height = s;
        this.rowList.setHeight(s);
    }

}