function rangeNum(initial, final){
  var result = 0;
  for(initial ; initial <= final ; initial ++){
    result +=  initial;
  }
  return result;
}

console.log(rangeNum(2,5));