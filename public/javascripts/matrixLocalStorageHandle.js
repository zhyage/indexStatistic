
function saveMatrix2LocalStorage(localStorageName, matrix){
    localStorage.setItem(localStorageName, JSON.stringify(matrix));
}

function saveMatrixStr2LocalStorage(localStorageName, matrixStr){
    localStorage.setItem(localStorageName, matrixStr);
}

function loadMatrixFromLocalStorage(localStorageName, matrix){
    var matrixString = localStorage[localStorageName];
    if(!matrixString || !matrix){
        return false;
    }else{
        matrix.loadData(JSON.parse(matrixString));
        return true;
    }
}

function loadMatrixStrFromLocalStorage(localStorageName){
    return localStorage[localStorageName];
    
}

function removeMatrixFromStorage(localStorageName){
    localStorage.removeItem(localStorageName);
}
