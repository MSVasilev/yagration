function getRowListState() {
    return JSON.parse(localStorage.getItem('rowListGroupExpandState'));
}
function setRowListState(o:string) {
    localStorage.setItem('rowListGroupExpandState', JSON.stringify(o));
    return false;
}
function deleteRowListState() {
    localStorage.removeItem("rowListGroupExpandState");
    return false;
}



function getLocalStorage() {
    return JSON.parse(localStorage.getItem('ecarex.ru'));
}
function setLocalStorage(o:string) {
    localStorage.setItem('ecarex.ru', JSON.stringify(o));
    return false;
}

function av(){
   
    
};