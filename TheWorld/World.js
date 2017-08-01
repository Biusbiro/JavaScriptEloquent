var villagers = [];
var content = [];

var createWorld = function(size){//transformar isso em forEach
    var line = [];
    for(var l = 0 ; l < size ; l++){
        for(var c = 0 ; c < size ; c++){
            if ((l === 0 || c === 0)||(l === size-1 || c === size-1)){
                line[c] = "#";
            }else{
                line[c] = "☺";
            }
        }
        content.push(line);
        line = [];
    }
    return content;
}

var createInternalWalls = function(content, qtd){
    for(var i=0 ; i<qtd ; i++){
        var position = (getRamdonPosition(content.length));
        content = printPosition(content, position, "#");
    }
    return content;
}

var populeWorld = function(content){
    content = createInternalWalls(content, 6);
    villagers = createVillager(content, villagers, content.length, "♣");
    villagers = createVillager(content, villagers, content.length, "♥");
    villagers = createVillager(content, villagers, content.length, "♠");
    villagers = createVillager(content, villagers, content.length, "♦");
    return content;
}

var round = function(content){
    villagers.forEach(function(value , key){
        moveTo(getRamdonMove(), content, villagers, key);
    })
    printLog(content);
    console.log("new round");
    villagers.forEach(function(value , key){
        console.log("Life: " + value[0] + " = " + value[1]);
    })

}

content = createWorld(10,10);
content = populeWorld(content);

var rounds = window.setInterval(function(){round(content)}, 100);