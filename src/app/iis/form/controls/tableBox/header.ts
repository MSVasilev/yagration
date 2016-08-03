/// <reference path="tableBox.ts" />
enum SortDirection{
    ASC,
    DESC
}

class EventChangeSize {
    private field:Field;
    private currentX:number;
    private tableBox:TableBox;

    constructor(tableBox:TableBox, field:Field, currentX:number) {
        this.tableBox = tableBox;
        this.currentX = currentX
        this.field = field;

        this.setMouseMove = this.setMouseMove.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.mouseUp = this.mouseUp.bind(this);

        this.tableBox.header.htmlElement.addEventListener("mousemove", this.setMouseMove);
        this.tableBox.header.htmlElement.addEventListener("mouseup", this.mouseUp);
        this.tableBox.header.htmlElement.addEventListener("mouseout", this.mouseOut);
    }

    public setMouseMove(event:MouseEvent) {
        event.stopPropagation();

        console.log("Before:::" + this.field.getWidth());
        var currentWidth:number = Utils.sizeToPixels(this.field.getWidth());
        var setWidth:number = currentWidth - this.currentX + event.clientX;
        this.currentX = event.clientX;

        if(setWidth == currentWidth){
            return;
        }

        var setWidthPercent:number = Utils.sizePixelsToPercent(setWidth);
        console.log("After:::" + setWidthPercent);

        this.field.setWidth(Utils.sizePixelsToPercent(setWidth) + "%");

        var fieldCount = this.tableBox.fieldList.count();

        var val:number = 0;//разница в размере
        var totalSizePercent:number = 100;
        for(var i:number = 0; i < fieldCount; i++){
            var currentField:Field = this.tableBox.fieldList.get(i);

            if(val > 0){
                var currentSizePercent:number  = Utils.numberFormat(Utils.sizePixelsToPercent(Utils.sizeToPixels(currentField.getWidth()) - val), 3);
                totalSizePercent -= currentSizePercent;
                currentField.setWidth(currentSizePercent + "%");
                console.log("Field:" + currentField.getId() + " width:" + currentField.getWidth());
            }else{
                totalSizePercent -= +currentField.getWidth().replace("%", "");
                if(currentField === this.field){
                    val = (setWidth - currentWidth)/(fieldCount - i);

                }
            }
        }

        if(totalSizePercent != 0){
            currentField = this.tableBox.fieldList.get(fieldCount-1);
            currentField.setWidth((+currentField.getWidth().replace("%", "")) + totalSizePercent + "%");
        }
    }

    private mouseUp(event:MouseEvent){
        event.stopPropagation();
        this.deleteMouseMove();
    }

    private mouseOut(event:MouseEvent){
        event.stopPropagation();


        var relatedTarget:HTMLElement = (<HTMLElement>event.relatedTarget);
        console.log(relatedTarget);

        if(relatedTarget.classList.length == 0){this.deleteMouseMove();}

        if(relatedTarget.classList.contains("fa")){ return;}

        if(relatedTarget.firstChild == undefined) {this.deleteMouseMove();}
        if((<HTMLElement>relatedTarget.firstChild).classList.contains("fa")) {return;}

        this.deleteMouseMove();
    }

    private deleteMouseMove():void{
        this.tableBox.header.htmlElement.removeEventListener("mousemove", this.setMouseMove);
        this.tableBox.header.htmlElement.removeEventListener("mouseup", this.mouseUp);
        this.tableBox.header.htmlElement.removeEventListener("mouseout", this.mouseOut);
    }
}

class SortDirectionIcon {
    static getSortDirection(el:HTMLElement):SortDirection {
        return el.classList.contains("fa-sort-asc") ? SortDirection.ASC : SortDirection.DESC;
    }

    static getIconClassBySortDirection(sortDirection:SortDirection):string {
        return sortDirection == SortDirection.ASC ? "fa-sort-asc" : "fa-sort-desc";
    }

    static setSortDirection(el:HTMLElement, sortDirection:SortDirection):void {
        el.classList.add(SortDirectionIcon.getIconClassBySortDirection(sortDirection));
    }

    static deleteSortDirection(el:HTMLElement, sortDirection:SortDirection) {
        el.classList.remove(SortDirectionIcon.getIconClassBySortDirection(sortDirection));
    }

    static deleteAllSortDirection(el:HTMLElement) {
        el.classList.remove("fa-sort-asc");
        el.classList.remove("fa-sort-desc");
    }
}
class Header extends Control {
    private tableBox:TableBox;
    public htmlElement:HTMLElement;
    private sortFunction:Function;
    private currentDivField:HTMLElement;
    private currentField:Field;

    constructor(tableBox:TableBox) {
        super("header");
        this.tableBox = tableBox;

        //currentDivField
        this.currentDivField = document.createElement("div");
        SortDirectionIcon.setSortDirection(this.currentDivField, SortDirection.ASC);
    }

    createHtmlElement():HTMLElement {
        this.htmlElement = document.createElement("div");
        this.htmlElement.classList.add("iis-form-controls-tableBox-header");

        var fieldCount:number = this.tableBox.fieldList.count();
        var htmlEl:string = "";
        for (var i:number = 0; i < fieldCount; i++) {
            htmlEl += '<div class="' + FieldListStatic.getFieldCSSClassName(i, this.tableBox) + '"><div class="fa">' + this.tableBox.fieldList.get(i).description + '</div></div>';
        }

        this.htmlElement.innerHTML = htmlEl;

        this.tableBox.htmlElement.appendChild(this.htmlElement);
        return this.htmlElement;
    }

    public setSortFunction(f:Function) {
        this.sortFunction = f;
        this.setCurrentField = this.setCurrentField.bind(this);
        this.htmlElement.addEventListener("mousedown", this.setCurrentField);
    }

    private setCurrentField(event:MouseEvent) {
        event.stopPropagation();
        var el:HTMLElement = <HTMLElement>event.target;
        if (el.classList.length == 0) return;

        var sortDirection:SortDirection = SortDirection.ASC
        if (el.classList.contains("fa")) {
            if (el === this.currentDivField) {
                var sortDirection:SortDirection = SortDirectionIcon.getSortDirection(this.currentDivField);
                SortDirectionIcon.deleteSortDirection(this.currentDivField, sortDirection);
                sortDirection = sortDirection == SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
                SortDirectionIcon.setSortDirection(this.currentDivField, sortDirection);
            } else {
                SortDirectionIcon.deleteAllSortDirection(this.currentDivField);
                this.currentDivField = el;
                SortDirectionIcon.setSortDirection(this.currentDivField, sortDirection);
            }
            this.currentField = this.tableBox.fieldList.getFieldByCSSClassName(el.parentElement.classList.item(0));
            this.sortFunction(this.currentField, sortDirection);
        } else if (el.classList.item(0).charAt(0) == 'f') {
            this.currentDivField = <HTMLElement>el.firstChild;
            this.currentField = this.tableBox.fieldList.getFieldByCSSClassName(el.classList.item(0));
            new EventChangeSize(this.tableBox, this.currentField, event.clientX);
        }
    }
}