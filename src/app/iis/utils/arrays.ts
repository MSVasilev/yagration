class SortArray {
    private fieldName:string;
    private array:Array<any>;

    constructor(array:Array<any>) {
        this.array = array;
    }

    public sort(fieldName:string, sortDirection:SortDirection) {
        if (this.array.length == 0)return;
        this.fieldName = fieldName;

        if (typeof this.array[0][fieldName] == 'string') {
            this.sortFunction = sortDirection == SortDirection.ASC ? this.FieldStringByASC : this.FieldStringByDESC;
        } else if (typeof this.array[0][fieldName] == 'number') {
            this.sortFunction = sortDirection == SortDirection.ASC ? this.FieldNumberByASC : this.FieldNumberByDESC;
        } else {
            return;
        }

        this.array.sort(this.sortFunction.bind(this));
    }

    private FieldStringByASC(a:any, b:any):number {
        return a[this.fieldName].localeCompare(b[this.fieldName]);
    }

    private FieldStringByDESC(a:any, b:any):number {
        return b[this.fieldName].localeCompare(a[this.fieldName]);
    }

    private FieldNumberByASC(a:any, b:any):number {
        return a[this.fieldName] - b[this.fieldName];
    }

    private FieldNumberByDESC(a:any, b:any):number {
        return b[this.fieldName] - a[this.fieldName];
    }

    private sortFunction(a:any, b:any):number {
        return 0;
    }
}

class Arrays {
    static filterByField<T>(array:Array<T>, fieldName:string, value:any):Array<T> {

        var resultArray:Array<T> = new Array;
        array.forEach(obj => {
            if ((<any>obj)[fieldName] === value) {
                resultArray.push(obj);
            }
        });

        return resultArray;
    }

    static filterByFields<T>(array:Array<T>, fieldName:string, values:Array<any>):Array<T> {

        var resultArray:Array<T> = new Array;
        array.forEach(obj => {
             values.forEach(value =>{
                 if ((<any>obj)[fieldName] === value) {
                     resultArray.push(obj);
                 }
             })   
        });

        return resultArray;
    }
    
    
    
}