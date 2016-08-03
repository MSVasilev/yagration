/// <reference path="tableBox.ts" />
class FieldListStatic{
    static getFieldCSSClassName(i:number, tableBox:TableBox):string {
        return "f".concat(i.toString()).concat("-").concat(tableBox.getId());
    }

    static getFieldIDByCSSClassName(CSSClassName:string):number{
        return + CSSClassName.slice(1,CSSClassName.indexOf("-"));
    }
}
class FieldList {
    private tableBox:TableBox;
    private fieldList:Array<Field> = new Array<Field>();

    constructor(tableBox:TableBox) {
        this.tableBox = tableBox;
    }

    public add(id:string, description:string, width:string = undefined):Field {
        var field:Field = new Field(this.fieldList.length, id, this.tableBox);
        field.setWidth(width);
        field.description = description;
        this.fieldList.push(field);
        return field;

    }

    public get(i:number):Field {
        return this.fieldList[i];
    }

    public getFieldByCSSClassName(CSSClassName:string):Field{
        return this.fieldList[FieldListStatic.getFieldIDByCSSClassName(CSSClassName)];
    }

    public count():number {
        return this.fieldList.length;
    }

}