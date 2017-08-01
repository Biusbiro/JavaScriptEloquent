var MultiplicatorUnitFailure = function(){
    return result = primitiveMultiply(a, b);
}

var primitiveMultiply = function (a, b) {
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitFailure(a, b);
}

function reliableMultiply(a, b) {
    try{
        var result = primitiveMultiply(a, b);
    }catch(e){
        var err = e;
        console.log("deu erro");
    }finally{
        return result;
    }
}

console.log(reliableMultiply(8, 8)); // 64