function reverseArray(dataArray){
    var result = [];
    var limit = dataArray.length;
    while(limit >= 0){
        result.push(dataArray[limit]);
        limit --;
    }
    return result;
};

function reverseArrayInPlace(dataArray){
    var temp;
    var initial = 0;
    var final = dataArray.length;
    while(initial <= dataArray.length){
        if(initial !== final){
            temp = dataArray[initial];
            dataArray[initial] = dataArray[final];
            dataArray[final] = temp;
        }
        initial ++;
        final --;
    }
    return dataArray;
};

//let arrayTest1 = [2,3,4,5,6];
let arrayTest2 = [-8,-6,-4,-2,0,2];
let arrayTest3 = [2,4,5,6,10];