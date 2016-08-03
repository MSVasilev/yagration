/// <reference path="controls.ts" />
/**
 * Created by Сергей on 28.08.2015.
 */

class ButtonImage {
    static addImage(htmlElement:HTMLButtonElement) {
        var span:HTMLSpanElement = document.createElement("span");
        span.classList.add("fa");
        span.classList.add("fa-shield");
        htmlElement.appendChild(span);
    }
}


class Button extends Control {
    private description:string;
    private htmlElement:HTMLButtonElement;
    private width:string;
    private height:string;

    constructor(id:string) {
        super(id);

        this.htmlElement = document.createElement("button");
        this.htmlElement.type = "button";
        this.htmlElement.classList.add("iis-form-controls-button");
        ButtonImage.addImage(this.htmlElement);

    }

    public createHtmlElement():HTMLElement {
        return this.htmlElement;
    }

    public setWidth(s:string):void {
        this.width = s;
        this.htmlElement.style.width = this.width;
    }

    public setHeight(s:string):void {
        this.height = s;
        this.htmlElement.style.height = this.height;
    }

    public setDescription(s:string) {
        this.description = s;
        this.htmlElement.appendChild(document.createTextNode(s));

    }
}