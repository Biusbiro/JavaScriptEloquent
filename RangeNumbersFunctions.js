function rangeNum(initial, final, intervall){
    intervall = valid(intervall);
    var values = order(initial, final, intervall);
    var result = builder(values[0], values[1], intervall);
    return result;
};

function order(initial, final, intervall){
    if(intervall > 0){
        if(initial > final){
            return [final, initial];
        }else{
            return [initial, final];
        }
    }else if (intervall < 0){
        if(initial > final){
            return [initial, final];
        }else{
            return [final, initial];
        }
    }
};

function builder(menor, maior, intervall){
    var result = [];
    if(intervall > 0){
        while(menor <= maior){
            console.log("-> " + menor, maior, intervall, result);
            result.push(menor);
            menor = menor + intervall;
        }
        return result;
    }else{
        while(menor >= maior){
            console.log("-> " + menor, maior, intervall, result);
            result.push(menor);
            menor = menor + intervall;
        }
       return result;
    } 
};

function valid(value){
    if (value === undefined){
        value = 1;
        return value;
    }else{
        return value;
    }
};