class Utils{
    static sizeToPixels(s:string):number{
        if(s.indexOf("px") > 0){
            return Math.round(+s.replace("px", ""));
        }else{
            var p:number = +s.replace("%", "");

            return Math.round(window.screen.width*p/100);
        }
    }

    static sizePixelsToPercent(px:number):number{
        return +Utils.numberFormat(px*100/window.screen.width, 2);

    }


    static numberFormat(n:number, i:number):number{
        return +new Number(n).toFixed(i);

    }
}