/// <reference path="../../iis/form/form.ts" />
/// <reference path="priceListLight.ts" />

class Report {
    static update(pll:PriceListLight, tableBox:TableBox, findType:string, findValue:string){
        tableBox.rowList.clear();

        //var sort:SortArray = new SortArray(<any>pll.priceProductListLight.p);
        //sort.sort("o", SortDirection.DESC);

        if(findType == "d"){
            Report.ByDescription(tableBox, pll);
        }else{
            Report.ByNumber(tableBox, pll, findValue);
        }
    }

    static ByDescription(tableBox:TableBox, pll:PriceListLight) {
        var i:number = 0;
        pll.priceProductListLight.p.forEach(p => {
            tableBox.rowList.addByObject(p);
            i++
        });
    }


    static ByNumber(tableBox:TableBox, pll:PriceListLight, findValue:string) {

        var PLRows:Array<Product> = Arrays.filterByField<Product>(pll.productListLight.p, "ns", findValue);

        PLRows.forEach(product => {
            var PPRows:Array<PriceProduct> = Arrays.filterByField<PriceProduct>(pll.priceProductListLight.p, "pi", product.i);

            PPRows.forEach(PPRow => {

                if(PPRow.o == 1){
                    var row:Row = tableBox.rowList.addByObject(PPRow);
                    row.htmlElement.style.backgroundColor = '#eea236';
                }else{
                    tableBox.rowList.addByObject(PPRow);
                }
            });


            var ARows:Array<Analog> = Arrays.filterByField<Analog>(pll.analogListLight.a, "pi", product.i);

            var APPRows:Array<PriceProduct> = new Array<PriceProduct>()
            ARows.forEach(ARow => {
                Arrays.filterByField<PriceProduct>(pll.priceProductListLight.p, "pi", ARow.pia).forEach(APPRow => {APPRows.push(APPRow)})
            });

            new SortArray(<any>APPRows).sort("o", SortDirection.DESC);

            var ownCount:number = Arrays.filterByField<PriceProduct>(APPRows, "o", 1).length;

            var descriptionGroup:string = "Аналоги".concat(ownCount == 0 ? "" : "("+ ownCount.toString() +")");

            if (APPRows.length > 0) {
                var rowListGroup:RowList = tableBox.rowList.addGroup(descriptionGroup, true);
                APPRows.forEach(PPRow => {
                    if(PPRow.o == 1){
                        var row:Row = rowListGroup.addByObject(PPRow);
                        row.htmlElement.style.backgroundColor = '#eea236';
                    }else{
                        rowListGroup.addByObject(PPRow);
                    }
                })
            }

        });
    }
}

class priceListLightView {

    public pll:PriceListLight;
    public tableBox:TableBox;
    private findType:string;
    private findValue:string;

    public  onChange(control:TextBox):void {
        var self = this;

        this.findValue = control.getValue();
        if (this.findValue.length < 3) return;
        if (this.findValue.indexOf(" ") > 2) {
            this.findType = "d";
        } else {
            this.findType = "n";
        }

        $.getJSON("/products/?" + this.findType + "=" + this.findValue,
            function(pll:PriceListLight){self.onDataGet(pll)}
        );

        //$.getJSON("priceListLight.json",
        //    function (pll:PriceListLight) {
        //        self.onDataGet(pll)
        //    }
        //);


    }

    constructor() {
        var form:Form = new Form();
        //var button:Button = <Button>form.createControl("Button");
        //button.setHeight("20px");
        //button.setWidth("70px");
        //button.setDescription("Кнопка");

        var textBox:TextBox = <TextBox>form.createControl("TextBox");
        //textBox.addControlEvent("change", this.onChange.bind(this));
        textBox.addControlEvent("keyup", this.onChange.bind(this));

        this.tableBox = <TableBox>form.createControl("TableBox");
        this.tableBox.setWidth("100%");

        this.tableBox.fieldList.add("mfd", "Бренд", "10%");
        this.tableBox.fieldList.add("n", "Номер", "10%");
        this.tableBox.fieldList.add("d", "Описание", "25%");
        this.tableBox.fieldList.add("q", "Кол-во", "5%");
        this.tableBox.fieldList.add("p", "Вход", "5%");
        this.tableBox.fieldList.add("p1", "Выход", "5%");
        this.tableBox.fieldList.add("pr", "Прайс", "10%");
        this.tableBox.fieldList.add("upd", "Обн-е", "5%");
        this.tableBox.fieldList.add("mo", "Мин.пар", "5%");
        this.tableBox.fieldList.add("dp", "Поставка", "5%");
        this.tableBox.fieldList.add("c", "Коммент.", "15%");

        form.open();

        this.tableBox.header.setSortFunction(this.sort.bind(this));

        this.findType = "n";
        this.findValue = "w753";
        var self = this;
        $.getJSON("/products/priceListLight.json",
            function (pll:PriceListLight) {
                self.onDataGet(pll)
            }
        );

    }

    public sort(field:Field, sortDirection:SortDirection) {
        var sort:SortArray = new SortArray(<any>this.pll.priceProductListLight.p);

        sort.sort(field.getId(), sortDirection);
        //sort.sort("o", SortDirection.ASC);


        if(field.getId() === "mfd"){
            sort = new SortArray(<any>this.pll.manufacturerListLight.mf);
            sort.sort("ds", sortDirection);
        }else if(field.getId() === "n"){
            sort = new SortArray(<any>this.pll.productListLight.p);
            sort.sort("ns", sortDirection);
        }

        Report.update(this.pll, this.tableBox, this.findType, this.findValue);
    }

    public onDataGet(pll:PriceListLight):void {
        this.pll = pll;

        Report.update(pll, this.tableBox, this.findType, this.findValue);
    }
}



class priceListLightViewUser {

    public pll:PriceListLight;
    public tableBox:TableBox;
    private findType:string;
    private findValue:string;

    public  onChange(control:TextBox):void {
        var self = this;

        this.findValue = control.getValue();
        if (this.findValue.length < 3) return;
        if (this.findValue.indexOf(" ") > 2) {
            this.findType = "d";
        } else {
            this.findType = "n";
        }

        $.getJSON("/products/?" + this.findType + "=" + this.findValue,
            function(pll:PriceListLight){self.onDataGet(pll)}
        );

        //$.getJSON("priceListLight.json",
        //    function (pll:PriceListLight) {
        //        self.onDataGet(pll)
        //    }
        //);


    }

    constructor() {
        var form:Form = new Form();
        //var button:Button = <Button>form.createControl("Button");
        //button.setHeight("20px");
        //button.setWidth("70px");
        //button.setDescription("Кнопка");

        //var textBox:TextBox = <TextBox>form.createControl("TextBox");
        //textBox.addControlEvent("change", this.onChange.bind(this));
        //textBox.addControlEvent("keyup", this.onChange.bind(this));

        this.tableBox = <TableBox>form.createControl("TableBox");
        this.tableBox.setWidth("100%");

        this.tableBox.fieldList.add("mfd", "Бренд", "12%");
        this.tableBox.fieldList.add("n", "Номер", "8%");
        this.tableBox.fieldList.add("d", "Описание", "25%");
        this.tableBox.fieldList.add("q", "Ост", "5%");
        //this.tableBox.fieldList.add("p", "Вход", "5%");
        this.tableBox.fieldList.add("p1", "Цена", "7%");
        //this.tableBox.fieldList.add("pr", "Прайс", "10%");
        this.tableBox.fieldList.add("upd", "Акт", "5%");
        this.tableBox.fieldList.add("mo", "Мин", "3%");
        this.tableBox.fieldList.add("dp", "Срок", "4%");
        this.tableBox.fieldList.add("c", "Комментарии", "21%");
        this.tableBox.fieldList.add("ord", "Заказ", "10%");

        form.open();

        this.tableBox.header.setSortFunction(this.sort.bind(this));

        this.findType = "n";
        this.findValue = "w753";
        var self = this;
        $.getJSON("/products/priceListLight.json",
            function (pll:PriceListLight) {
                self.onDataGet(pll)
            }
        );

    }

    public sort(field:Field, sortDirection:SortDirection) {
        var sort:SortArray = new SortArray(<any>this.pll.priceProductListLight.p);

        sort.sort(field.getId(), sortDirection);
        //sort.sort("o", SortDirection.ASC);


        if(field.getId() === "mfd"){
            sort = new SortArray(<any>this.pll.manufacturerListLight.mf);
            sort.sort("ds", sortDirection);
        }else if(field.getId() === "n"){
            sort = new SortArray(<any>this.pll.productListLight.p);
            sort.sort("ns", sortDirection);
        }

        Report.update(this.pll, this.tableBox, this.findType, this.findValue);
    }

    public onDataGet(pll:PriceListLight):void {
        this.pll = pll;

        Report.update(pll, this.tableBox, this.findType, this.findValue);
    }
}

