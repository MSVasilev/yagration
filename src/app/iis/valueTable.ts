class ValueTableColumn {
    id:number;
    description:string;
    private data:Array<any> = new Array<any>();

    public addItem(item:any) {
        this.data.push(item);
    }

    public getItem(i:number):any {
        return this.data[i];
    }

    public deleteEndItemIfFound(i:number) {
        if (this.data.length == (i + 1)) {
            this.data.splice(-1, 1);
        }
    }
}

class ValueTableRow {
    id:number;
    description:string;
}


class ValueTable {
    private columnList:Array<ValueTableColumn> = new Array<ValueTableColumn>();
    private rowCount:number = -1;
    private columnCount:number = -1;

    public addColumn(description:string) {
        this.columnCount++;
        var column:ValueTableColumn = new ValueTableColumn;
        column.description = description;
        column.id = this.columnCount;
        this.columnList.push(column);

    }

    public loadColumn(data:Array<any>, description:string) {
        this.columnCount++;
        var column:ValueTableColumn = new ValueTableColumn;
        column.description = description;
        column.id = this.columnCount;
        this.columnList.push(column);

    }

    public addRow(row:any):boolean {
        this.rowCount++;

        //try {
            for (var i:number = 0; i < this.columnCount; i++) {

                var column:ValueTableColumn = this.columnList[i];
                column.addItem(row[column.description]);
            }
        //} catch (e) {
        //    for (var i:number = 0; i < this.columnCount; i++) {
        //        this.columnList[i].deleteEndItemIfFound(this.rowCount);
        //    }
        //    this.rowCount--;
        //    alert(e);
        //    return false;
        //}
        return true;
    }

    public getRow(rowIndex:number):any {

        if (rowIndex > this.rowCount) throw "Индекс выходит за рамки границы таблицы";

        var obj:Object = new Object;

        for (var i:number = 0; i < this.columnCount; i++) {

            var currentColumn:ValueTableColumn = this.columnList[i];

            (<any>obj)[currentColumn.description] = currentColumn.getItem(rowIndex);
        }

        return obj;
    }
}