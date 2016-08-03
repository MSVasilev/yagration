/// <reference path="controls.ts" />
class TextBox extends Control {
    description:string;
    private htmlElement:HTMLElement;

    constructor(id:string) {
        super(id);

        this.htmlElement = document.createElement("div");
        this.htmlElement.setAttribute("class", "input-group input-group-lg");

        var input:HTMLElement = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        input.setAttribute("placeholder", "Введите данные поиска");
        input.setAttribute("aria-describedby", "sizing-addon1");

        this.htmlElement.appendChild(input);
    }

    public createHtmlElement():HTMLElement {
        return this.htmlElement;
    }

    public addControlEvent(name:string, func:Function):ControlEvent {
        var controlEvent:ControlEvent = super.addControlEvent(name, func);
        this.htmlElement.addEventListener(name, controlEvent.Run);
        return controlEvent;
    }

    public getValue():string{
        return (<HTMLInputElement>this.htmlElement.childNodes[0]).value;
    }
}