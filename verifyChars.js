function countChar(phrase, character){
  
  var c = verify(character);
    
  console.log(c);
  
  var count = 0;
  for( var i = 0 ; i< phrase.length ; i++) {
    if (phrase.charAt(i) === c)
      count++;
  }
  return count;
}

function verify(char){
  if(char == undefined){
    return "B";
  }else{
    return char;
  }
}

console.log(countChar("kakkerlakBBB"));