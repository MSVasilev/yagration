/// <reference path="tableBox.ts" />
enum TableBoxEvent {
    Selection,
    OnActivateRow,
    OnActivateColumn,
    OnActivateCell,
    BeforeAddRow,
    BeforeRowChange,
    BeforeDeleteRow,
    AfterDeleteRow,
    OnStartEdit,
    BeforeEditEnd,
    OnRowOutput,
    OnDataGet,
    ValueChoice,
    OnCheckChange,
    OnEditEnd,

}

class RowListStatic {

    static expandGroup(td:HTMLElement){
        var classList:DOMTokenList = (<HTMLElement>td.firstChild).classList;
        var classExpandable:DOMTokenList = (<HTMLElement>td).classList;
        var asd:any = getRowListState() || {};
        if (classList.contains("fa-minus-square-o")) {
            classList.remove("fa-minus-square-o");
            classList.add("fa-plus-square-o");
            //(<HTMLElement>td.firstChild).style.display = "initial";
            (<HTMLElement>td.childNodes[1]).style.display = "none";

            asd[classExpandable[0]] = 0;
            setRowListState(asd);
            console.log(localStorage);

        } else {
            classList.remove("fa-plus-square-o");
            classList.add("fa-minus-square-o");
            //(<HTMLElement>td.firstChild).style.display = "none";
            (<HTMLElement>td.childNodes[1]).style.display = "initial";

            asd[classExpandable[0]] = 1;
            setRowListState(asd);
            console.log(localStorage);

        }
    }

    static expandGroupItems(td:HTMLElement){
        var classList:DOMTokenList = (<HTMLElement>td.firstChild).classList;
        var classExpandable:DOMTokenList = (<HTMLElement>td).classList;
        var asd:any = getRowListState() || {};
        if (classList.contains("fa-minus-square-o")) {
            classList.remove("fa-minus-square-o");
            classList.add("fa-plus-square-o");
            //(<HTMLElement>td.firstChild).style.display = "initial";
            (<HTMLElement>td.childNodes[1]).style.display = "none";

            asd[classExpandable[0]] = 0;
            setRowListState(asd);
            console.log(localStorage);

        } else {
            classList.remove("fa-plus-square-o");
            classList.add("fa-minus-square-o");
            //(<HTMLElement>td.firstChild).style.display = "none";
            (<HTMLElement>td.childNodes[1]).style.display = "initial";

            asd[classExpandable[0]] = 1;
            setRowListState(asd);
            console.log(localStorage);



        }
    }

    /*static closeGroup(td:HTMLElement){
        var classList:DOMTokenList = (<HTMLElement>td.firstChild).classList;
        if (classList.contains("fa-plus-square-o")) {
            classList.remove("fa-plus-square-o");
            classList.add("fa-minus-square-o");
            (<HTMLElement>td.childNodes[1]).style.display = "none";
        } else {
            classList.remove("fa-minus-square-o");
            classList.add("fa-plus-square-o");
            (<HTMLElement>td.childNodes[1]).style.display = "initial";
        }

    }*/
    
    
    static setCurrentRow(rowList:RowList, el:HTMLElement){
        if (rowList.currentRow.htmlElement == el)return;

        rowList.currentRow.htmlElement.classList.remove("iis-form-controls-tableBox-currentRow");
        el.classList.add("iis-form-controls-tableBox-currentRow");
        rowList.currentRow.htmlElement = el;
    }

    //static getRowId(id:string, childNodes:NodeList):string {
    //    return childNodes.length.toString().concat("-").concat(id);
    //}

    static add(data:Array<any>, id:string, fieldList:FieldList, tmpl:RowListHtmlTmpl, rootDiv:HTMLElement):Row {
        var fieldCount:number = fieldList.count();
        for (var i:number = 0; i < fieldCount; i++) {
            var el:HTMLElement = (<HTMLElement>tmpl.tr.childNodes[i].firstChild.firstChild);
            el.textContent = data[i];
        }

        var row:Row = new Row();
        row.htmlElement = <HTMLElement>tmpl.tr.cloneNode(true);
        rootDiv.firstChild.appendChild(row.htmlElement);
        return row;
    }

    static addByObject(data:any, id:string, fieldList:FieldList, tmpl:RowListHtmlTmpl, rootDiv:HTMLElement):Row {

        var fieldCount:number = fieldList.count();
        for (var i:number = 0; i < fieldCount; i++) {
            var el:HTMLElement = (<HTMLElement>tmpl.tr.childNodes[i].firstChild.firstChild);
            el.textContent = data[fieldList.get(i).getId()];
        }

        var row:Row = new Row();
        row.htmlElement = <HTMLElement>tmpl.tr.cloneNode(true);
        rootDiv.firstChild.appendChild(row.htmlElement);
        return row;
    }

    static insertByObject(index:number, data:any, fieldList:FieldList, rootDiv:HTMLElement):Row {

        var row:Row = new Row();
        row.htmlElement = <HTMLElement>rootDiv.firstChild.childNodes[index];
        var fieldCount:number = fieldList.count();
        for (var i:number = 0; i < fieldCount; i++) {
            var el:HTMLElement = (<HTMLElement>row.htmlElement.childNodes[i].firstChild.firstChild);
            el.textContent = data[fieldList.get(i).getId()];


        }

        return row;
    }

    static addGroup(tableBox:TableBox, tmpl:RowListHtmlTmpl, rootDiv:HTMLElement, expand:boolean, description:string = undefined, id:string = undefined):RowList {
        var trGroup:HTMLElement = document.createElement("tr");
        trGroup.classList.add("iis-form-controls-tableBox-rowGroup");
        if (expand) {
            var span:string = '<span class="fa fa-lg fa-minus-square-o">' + description + '</span>';
        } else {
            var span:string = '<span class="fa fa-lg fa-plus-square-o">' + description + '</span>';
       }
        (<HTMLElement>trGroup).innerHTML = '<td colspan="' + tableBox.fieldList.count().toString() + '" class="' + id +'">' + span + '<div class="iis-form-controls-tableBox-rowListGroup"><table/></div></td>';
        RowListStatic.expandGroup(<HTMLElement>trGroup.firstChild);
        var rowListGroup:RowList = new RowList(tableBox, tmpl, <HTMLElement>trGroup.firstChild.childNodes[1]);
        //caption.addEventListener("mousedown", currentRowEvent.Run);
        rootDiv.firstChild.appendChild(trGroup);
        return rowListGroup;
    }

    static addGroupItems(tableBox:TableBox, tmpl:RowListHtmlTmpl, rootDiv:HTMLElement, expandItems:boolean, description:string = undefined, id:string = undefined):RowList {
        var trGroup:HTMLElement = document.createElement("tr");
        trGroup.classList.add("iis-form-controls-tableBox-rowGroupItems");
        //trGroup.classList.add(id);
        if (expandItems) {
            var span:string = '<span class="fa fa-lg fa-minus-square-o">' + description + '</span>';
        } else {
            var span:string = '<span class="fa fa-lg fa-plus-square-o">' + description + '</span>';
        }
        (<HTMLElement>trGroup).innerHTML = '<td colspan="' + tableBox.fieldList.count().toString() + '" class="' + id +'">' + span + '<div class="iis-form-controls-tableBox-rowListGroup"><table/></div></td>';
        RowListStatic.expandGroupItems(<HTMLElement>trGroup.firstChild);
        var rowListGroup:RowList = new RowList(tableBox, tmpl, <HTMLElement>trGroup.firstChild.childNodes[1]);
        //caption.addEventListener("mousedown", currentRowEvent.Run);
        rootDiv.firstChild.appendChild(trGroup);
        return rowListGroup;
    }
    
    
    
}


class RowListHtmlTmpl {
    public tr:HTMLElement;


    public createRootDiv():HTMLElement {
        //htmlTable
        var table:HTMLElement = document.createElement("table");
        //htmlRootDiv
        var rootDiv:HTMLElement = document.createElement("div");
        rootDiv.classList.add("iis-form-controls-tableBox-rowList");
        rootDiv.appendChild(table);
        return rootDiv;
    }

    public initBefore():void {
        //htmlTr
        this.tr = document.createElement("tr");
        this.tr.classList.add("iis-form-controls-tableBox-row");
    }

    public initAfter(tableBox:TableBox):void {
        var fieldCount:number = tableBox.fieldList.count();
        //initHtmlTr
        for (var i:number = 0; i < fieldCount; i++) {
            var td:HTMLElement = document.createElement("td");
            td.classList.add(FieldListStatic.getFieldCSSClassName(i, tableBox));

            var div1:HTMLElement = document.createElement("div");
            div1.appendChild(document.createElement("div"));
            td.appendChild(div1);
            this.tr.appendChild(td);
        }
    }
}

class Row {
    public htmlElement:HTMLElement = document.createElement("tr");

}
class RowList extends Control {
    private tableBox:TableBox;
    private tmpl:RowListHtmlTmpl;
    private htmlElement:HTMLElement;
    public currentRow:Row;

    constructor(tableBox:TableBox, tmpl:RowListHtmlTmpl = undefined, rootDiv:HTMLElement = undefined) {
        super("rowList");
        this.tableBox = tableBox;

        if (tmpl == undefined) {
            this.currentRow = new Row();
            this.tmpl = new RowListHtmlTmpl();
            this.htmlElement = this.tmpl.createRootDiv();
            this.tmpl.initBefore();

            //EVENTS
            this.eventClick  =  this.eventClick.bind(this);
            this.htmlElement.addEventListener("mousedown", this.eventClick);
        } else {
            this.tmpl = tmpl;
            this.htmlElement = rootDiv;
        }
    }

    private eventClick(event:Event) {
        var el:HTMLElement = <HTMLElement>event.target;
        while (true) {
            if (el.tagName === "TR") {
                break;
            } else {
                if (el === undefined)return;
                el = el.parentElement;
            }
        }

        if (el.classList.contains("iis-form-controls-tableBox-row")) {
            RowListStatic.setCurrentRow(this, el);
        }
        else if (el.classList.contains("iis-form-controls-tableBox-rowGroupItems")){
            RowListStatic.expandGroupItems(<HTMLElement>el.firstChild);

            //Вложенная таблица
        }
        else {
            RowListStatic.expandGroup(<HTMLElement>el.firstChild);

            //Вложенная таблица
        }

    }


    public add(data:Array<any>):Row {
       return RowListStatic.add(data, this.tableBox.getId(), this.tableBox.fieldList, this.tmpl, this.htmlElement);
    }

    public addByObject(data:Object):Row {
        return RowListStatic.addByObject(data, this.tableBox.getId(), this.tableBox.fieldList, this.tmpl, this.htmlElement);
    }

    public insertByObject(index:number, data:Object):Row{
        return RowListStatic.insertByObject(index, data, this.tableBox.fieldList, this.htmlElement);
    }

    public addGroup(description:string = null, expand:boolean = true, id:string = null):RowList {
        return RowListStatic.addGroup(this.tableBox, this.tmpl, this.htmlElement, expand, description, id);
    }

    public addGroupItems(description:string = null, expandItems:boolean = true, id:string = null):RowList {
        return RowListStatic.addGroupItems(this.tableBox, this.tmpl, this.htmlElement, expandItems, description, id);
    }

    public clear():void {
        (<HTMLElement>this.htmlElement.firstChild).innerHTML = "";
    }

    createHtmlElement():HTMLElement {
        this.tmpl.initAfter(this.tableBox);

        this.tableBox.htmlElement.appendChild(this.htmlElement);
        return this.htmlElement;
    }

    public setHeight(height:string):void {
        this.htmlElement.style.height = height;
    }
}