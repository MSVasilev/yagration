
class Form {
    public controlList:Array<Control> = new Array<Control>();
    public element:HTMLElement;

    constructor() {
        this.element = document.getElementById("form");
    }

    public createControl(name:string):Control{
        var control:Control = new (<any>window)[name](this.controlList.length.toString());
        this.controlList.push(control);
        return control;
    }

    public addControl(control:Control) {
        this.controlList.push(control);

    }

    public open() {
        var controlMaxIndex:number = this.controlList.length;
        for (var i:number = 0; i < controlMaxIndex; i++) {
            var control:Control = this.controlList[i];
            this.element.appendChild(control.createHtmlElement());
        }
    }
}