/// <reference path="../form.ts" />

class ControlEvent {
    private control:Control;
    private func:Function;

    constructor(func:Function, control:Control) {
        this.func = func;
        this.control = control;
    }

    public Run(event:Event) {
        event.stopPropagation();
        this.func(this.control, event);

    }
}


class Control {
    private id:string;
    private eventList:Array<ControlEvent>;

    constructor(id:string) {
        this.id = id;
        this.eventList = new Array<ControlEvent>();
    }

    public createHtmlElement():HTMLElement {
        return null;
    }

    public getId():string {
        return this.id;
    }

    public addControlEvent(name:string, func:Function):ControlEvent {
        var controlEvent:ControlEvent = this.createControlEvent(name, func);
        this.eventList.push(controlEvent);
        return controlEvent;
    }

    public createControlEvent(name:string, func:Function):ControlEvent {
        var controlEvent:ControlEvent = new ControlEvent(func, this);
        controlEvent.Run = controlEvent.Run.bind(controlEvent);
        return controlEvent;
    }

}
