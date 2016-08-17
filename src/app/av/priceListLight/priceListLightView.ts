/// <reference path="../../iis/form/form.ts" />
/// <reference path="priceListLight.ts" />

class Report {
    static update(pll:PriceListLight, tableBox:TableBox, findType:string, findValue:string){
    tableBox.rowList.clear();

    //var sort:SortArray = new SortArray(<any>pll.priceProductListLight.p);
    //sort.sort("p1", SortDirection.ASC);

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

            var PPRowsOwn:Array<PriceProduct> = Arrays.filterByField<PriceProduct>(PPRows, "o", 1);
            var PPRowsOrder:Array<PriceProduct> = Arrays.filterByField<PriceProduct>(PPRows, "o", 0);

            if (PPRowsOwn.length == 0) {
                var PPRowsOrderFirstLine = PPRowsOrder.slice(0, 1);
                var PPRowsOrderMidLines = PPRowsOrder.slice(1, 3);
                var PPRowsOrderGroup = PPRowsOrder.slice(3);

                var row:Row = tableBox.rowList.addByObject(PPRowsOrderFirstLine[0]);
                row.htmlElement.classList.add('firstLine');

                PPRowsOrderMidLines.forEach(PPRow => {
                    tableBox.rowList.addByObject(PPRow);
                });

                if (PPRowsOrderGroup.length > 0) {
                    var descriptionGroup2:string = "Показать остальные предложения " + PPRowsOrderGroup[0].mfd + " " + PPRowsOrderGroup[0].n + " (" + PPRowsOrderGroup.length + ")";

                    var RowListState = getRowListState() || {};
                    if (RowListState[product.i] == 0 || RowListState[product.i] === null) {var expand:boolean = true;}
                    else {var expand:boolean = false;}

                    var rowListGroup2:RowList = tableBox.rowList.addGroupItems(descriptionGroup2, expand, product.i.toString());
                    PPRowsOrderGroup.forEach(PPRow => {
                        rowListGroup2.addByObject(PPRow);
                    });
                }
            }
            else if (PPRowsOwn.length == 1){
                var row:Row = tableBox.rowList.addByObject(PPRowsOwn[0]);
                row.htmlElement.style.fontWeight = 'bold';
                row.htmlElement.classList.add('firstLine');

                    var PPRowsOrderMidLines = PPRowsOrder.slice(0, 3);
                    var PPRowsOrderGroup = PPRowsOrder.slice(3);

                    PPRowsOrderMidLines.forEach(PPRow => {
                        tableBox.rowList.addByObject(PPRow);
                    });

                    if (PPRowsOrderGroup.length > 0) {
                        var descriptionGroup2:string = "Показать остальные предложения " + PPRowsOrderGroup[0].mfd + " " + PPRowsOrderGroup[0].n + " (" + PPRowsOrderGroup.length + ")";

                        var RowListState = getRowListState() || {};
                        if (RowListState[product.i] == 0 || RowListState[product.i] === null) {var expand:boolean = true;}
                        else {var expand:boolean = false;}

                        var rowListGroup2:RowList = tableBox.rowList.addGroupItems(descriptionGroup2, expand, product.i.toString());
                        PPRowsOrderGroup.forEach(PPRow => {
                            rowListGroup2.addByObject(PPRow);
                        });
                    }
            }
            else{
                var PPRowsOwnFirstLine = PPRowsOwn.slice(0, 1);
                var PPRowsOwnMidLines = PPRowsOwn.slice(1);

                var row:Row = tableBox.rowList.addByObject(PPRowsOwnFirstLine[0]);
                row.htmlElement.style.fontWeight = 'bold';
                row.htmlElement.classList.add('firstLine');

                PPRowsOwnMidLines.forEach(OwnRow =>{
                    var row:Row = tableBox.rowList.addByObject(OwnRow);
                    row.htmlElement.style.fontWeight = 'bold';

                });

                    var PPRowsOrderMidLines = PPRowsOrder.slice(0, 3);
                    var PPRowsOrderGroup = PPRowsOrder.slice(3);

                    PPRowsOrderMidLines.forEach(PPRow => {
                        tableBox.rowList.addByObject(PPRow);
                    });

                    if (PPRowsOrderGroup.length > 0) {
                        var descriptionGroup2:string = "Показать остальные предложения " + PPRowsOrderGroup[0].mfd + " " + PPRowsOrderGroup[0].n + " (" + PPRowsOrderGroup.length + ")";

                        var RowListState = getRowListState() || {};
                        if (RowListState[product.i] == 0 || RowListState[product.i] === null) {var expand:boolean = true;}
                        else {var expand:boolean = false;}

                        var rowListGroup2:RowList = tableBox.rowList.addGroupItems(descriptionGroup2, expand, product.i.toString());
                        PPRowsOrderGroup.forEach(PPRow => {
                            rowListGroup2.addByObject(PPRow);
                        });
                    }
            }

            var ARows:Array<Analog> = Arrays.filterByField<Analog>(pll.analogListLight.a, "pi", product.i);
            //var APPRows:Array<PriceProduct> = new Array<PriceProduct>();
                //var APPRowsFirstLine = APPRows.slice(0, 1);
                //var firstARow:Row = tableBox.rowList.addByObject(APPRowsFirstLine[0]);
                //firstARow.htmlElement.classList.add('firstLine');
            //var descriptionGroup:string = "Аналоги";
            var Manufacturer:Array<Manufacturer> = Arrays.filterByField<Manufacturer>(pll.manufacturerListLight.mf, "i", product.mfi);
            if (ARows.length > 0) {

                var values:any = [];
                ARows.forEach(ARow => {
                    values.push(ARow.pia);
                });
                var APPRowsRebuild:Array<PriceProduct> = Arrays.filterByFields<PriceProduct>(pll.priceProductListLight.p, "pi", values);

                // var APPRowsRebuild:Array<PriceProduct> = [];
                //
                // ARows.forEach(ARow => {
                //     var APPRows:Array<PriceProduct> = Arrays.filterByField<PriceProduct>(pll.priceProductListLight.p, "pi", ARow.pia);
                //
                //     APPRows.forEach(APPRow =>{
                //         APPRowsRebuild.push(APPRow);
                //     });
                //
                //     //var ownCount:number = Arrays.filterByField<PriceProduct>(APPRows, "o", 1).length;
                //
                //     // var APPRowsFirstLine = APPRows.slice(0, 1);
                //     // var APPRowsMidLine = APPRows.slice(1, 3);
                //     // var APPRowsEnd = APPRows.slice(3);
                //     //
                //     // APPRowsFirstLine.forEach(APPRow => {
                //     //     if(APPRow.o == 1){
                //     //         var row:Row = rowListGroup.addByObject(APPRow);
                //     //         row.htmlElement.style.backgroundColor = '#eea236';
                //     //         row.htmlElement.classList.add('firstLineAnalog');
                //     //     }else{
                //     //         var row:Row = rowListGroup.addByObject(APPRow);
                //     //         row.htmlElement.classList.add('firstLineAnalog');
                //     //     }
                //     // });
                //     // APPRowsMidLine.forEach(APPRow => {
                //     //     if(APPRow.o == 1){
                //     //         var row:Row = rowListGroup.addByObject(APPRow);
                //     //         row.htmlElement.style.backgroundColor = '#eea236';
                //     //
                //     //     }else{
                //     //         rowListGroup.addByObject(APPRow);
                //     //
                //     //     }
                //     // });
                //     // if (APPRowsEnd.length > 0) {
                //     //     var descriptionGroup2:string = "Показать остальные предложения " + APPRowsEnd[0].mfd + " " + PPRowsEnd[0].n + " (" + APPRowsEnd.length + ")";
                //     //     var rowListGroup2:RowList = rowListGroup.addGroupItems(descriptionGroup2, true);
                //     //     APPRowsEnd.forEach(APPRow => {
                //     //         rowListGroup2.addByObject(APPRow);
                //     //     });
                //     // }
                //
                // });

                //new SortArray(<any>APPRowsRebuild).sort("p1", SortDirection.ASC);

                var APPRowsRebuildOwn:Array<PriceProduct> = Arrays.filterByField<PriceProduct>(APPRowsRebuild, "o", 1);
                var APPRowsRebuildOrder:Array<PriceProduct> = Arrays.filterByField<PriceProduct>(APPRowsRebuild, "o", 0);

                var descriptionGroup:string = "Аналоги для " + Manufacturer[0].ds + " " + product.ns + "        заменителей: (" + ARows.length + ")     ценовых предложений: (" + APPRowsRebuild.length + ")";
                var RowListState = getRowListState() || {};
                var asdfg:string = product.i.toString() + 'a';
                if (RowListState[asdfg] == 0 || RowListState[product.i] === null) {var expand:boolean = true;}
                else {var expand:boolean = false;}

                var rowListGroup:RowList = tableBox.rowList.addGroup(descriptionGroup, expand, product.i.toString()+'a');



                APPRowsRebuildOwn.forEach(APPRow => {
                    if (APPRow.p1 > 0){
                        var row:Row = rowListGroup.addByObject(APPRow);
                        row.htmlElement.style.fontWeight = 'bold';
                    }
                    //var row:Row = rowListGroup.addByObject(ResultAnalog);
                });

                var APPRowsRebuildOrderMidLines = APPRowsRebuildOrder.slice(0, 10);
                var APPRowsRebuildOrderGroup = APPRowsRebuildOrder.slice(10);

                APPRowsRebuildOrderMidLines.forEach(APPRow => {
                    rowListGroup.addByObject(APPRow);
                });

                if (APPRowsRebuildOrderGroup.length > 0) {
                    var descriptionGroup2:string = "Показать остальные предложения по аналогам (" + APPRowsRebuildOrderGroup.length + ")";

                    var RowListState = getRowListState() || {};
                    var asdfg:string = product.i.toString() + 'ae';
                    if (RowListState[asdfg] == 0 || RowListState[product.i] === null) {var expand:boolean = true;}
                    else {var expand:boolean = false;}

                    var rowListGroup2:RowList = rowListGroup.addGroupItems(descriptionGroup2, expand, product.i.toString()+'ae');
                    APPRowsRebuildOrderGroup.forEach(APPRow => {
                        rowListGroup2.addByObject(APPRow);
                    });
                }
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

        //sort.sort(field.getId(), sortDirection);
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

        // $.getJSON("/poisk/?" + this.findType + "=" + this.findValue,
        //     function(pll:PriceListLight){self.onDataGet(pll)}
        // );


        $.getJSON("/products/priceListLight.json",
           function (pll:PriceListLight) {
               self.onDataGet(pll)
           }
        );
    }

    constructor() {
        $('#form').empty();
        var form:Form = new Form();

        // var button:Button = <Button>form.createControl("Button");
        // button.setHeight("20px");
        // button.setWidth("70px");
        // button.setDescription("Кнопка");
        //
        // var textBox:TextBox = <TextBox>form.createControl("TextBox");
        // textBox.addControlEvent("change", this.onChange.bind(this));
        // textBox.addControlEvent("keyup", this.onChange.bind(this));

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



        //var ArtNumber = $('#headerSearch').val();
        var ArtNumber =  (window.location.pathname).split('/');


        this.findType = "n";
        this.findValue = ArtNumber[2];
        var self = this;
        $.getJSON("/products/priceListLight.json",
            function (pll:PriceListLight) {
                self.onDataGet(pll);

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
            sort = new SortArray(<any>this.pll.priceProductListLight.p);
            sort.sort("ns", sortDirection);
        }


        Report.update(this.pll, this.tableBox, this.findType, this.findValue);
    }

    public onDataGet(pll:PriceListLight):void {
        this.pll = pll;

        Report.update(pll, this.tableBox, this.findType, this.findValue);

    }
}

