function rangeNum(initial, final, intervall){
  intervall = valid(intervall);
  var values = order(initial,final);
  var result = builder(values, intervall);
  return result;
}

function builder(values, intervall){
  var result = [];
  while(values[0] <= values[1]){
    result.push(values[0]);
    values[0] += intervall;
  }
  return result;
}

function order(initial, final){
  if(initial > final){
    return [final, initial];
  }else{
    return [initial, final];
  }
}

function valid(value){
  if (value == undefined){
    value = 1;
    return value;
  }else{
    return value;
  }
}

function sumArray(ar){
  var result = 0;
  for(var i = 0 ; i <= ar.length-1 ; i++){
    result += ar[i];  
  }
  return result;
}

 var n1= 5;
 var n2= 1;
 var n3= 2;

console.log(rangeNum(n1,n2,n3));