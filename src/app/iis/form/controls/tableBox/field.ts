/// <reference path="tableBox.ts" />
class FieldStatic {
    getFieldCSSClassName() {

    }
}
class Field extends Control{
    private tableBox:TableBox;
    index:number;
    description:string;
    private width:string = "1%";

    public style:HTMLStyleElement;

    constructor(index:number, id:string, tableBox:TableBox) {
        super(id);
        this.tableBox = tableBox;
        this.index = index;


        this.style = document.createElement('style');
        this.style.type = 'text/css';
        this.setWidth(this.width);

        this.tableBox.htmlElement.appendChild(this.style);
    }

    public setWidth(width:string):void {
        this.width = width;
        this.style.textContent =
        "." + FieldListStatic.getFieldCSSClassName(this.index, this.tableBox) + "{ width: " + width + "}";
    }

    public getWidth():string {
        return this.width;
    }

}