var line = "";
var key = 1;

for(var i=1 ; i<=8 ; i++){
  for(var j=1 ; j<=8 ; j++){
    if(j%2===key){
      line=(line + '#');
    }else{
      line=(line + ' ');
    }
  }
  console.log(line);
  line = "";
  if(key === 0){
    key = 1;
  }else{
    key = 0
  }
}