export var printLog = function (content) {   
    for(var i=0 ; i < content.length ; i++){
        console.log("linha: " + i,content[i]);
    }
}

export var  getRamdonPosition = function(size) {
    size = size-2;
    var wall_l = Math.round(Math.random()*100)%size;
    var wall_c = Math.round(Math.random()*100)%size;
    wall_l++;
    wall_c++;
    var cell = [wall_l , wall_c];
    return cell;
}

export var getRamdonMove = function(){
    var positions = ["l","r","u","d"];
    return positions[Math.round(Math.random()*100)%5];
}