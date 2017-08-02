//import {printLog, getRamdonPosition, getRamdonMove} from 'Tools';
//import {createVillager, printPosition, clearPosition, 
//        inspectPositions,moveTo} from 'Villager';

var villagers = [];
var content = [];

var printLog = function (content) {   
    for(var i=0 ; i < content.length ; i++){
        console.log("linha: " + i,content[i]);
    }
}

var  getRamdonPosition = function(size) {
    size = size-2;
    var wall_l = Math.round(Math.random()*100)%size;
    var wall_c = Math.round(Math.random()*100)%size;
    wall_l++;
    wall_c++;
    var cell = [wall_l , wall_c];
    return cell;
}

var getSlot = function (){
    return document.getElementById("arenaSlot");
}

var getScoreBoard = function(){
    return document.getElementById("scoreBoard")
}

var getTable = function(){
    return document.getElementById("arena");
}

var getRamdonMove = function(){
    var positions = ["l","r","u","d"];
    return positions[Math.round(Math.random()*100)%5];
    // 5 porque pode ser um lado invalido e se manter parado
}

var createVillager = function(content, villagers, size, type){
    var validator = 0;
    var position = [];
    var arena = getTable();
    while(validator === 0){
        position = getRamdonPosition(size);
        if(content[position[0]][position[1]] === "#"){
            console.log("error, position[" + 
            position[0] + "][" + position[1] + 
            "] is ocuped", content[position[0]][position[1]]);
        }else{
            content[position[0]][position[1]] = type;
            arena.children[position[0]].children[position[1]].innerHTML = type;
            validator = 1;
        }
    }
    villagers.push([type, 0, position[0], position[1]]);
    return villagers;
}

var  printPosition = function(content, position, type) {
    content[position[0]][position[1]] = type;
    return content;
}

var  clearPosition = function(content, position) {
    content[position[0]][position[1]] = " ";
    return content;
}

var inspectPositions = function(content, villager, target){
    return content[villager[2]+target[0]][villager[3]+target[1]];
}

var setNewVillagerPosition = function(villager, target){
    villager[2] = villager[2]+target[0];
    villager[3] = villager[3]+target[1];
    return villager;
}

var getVillagerByPosition = function(villagers, col, lin){//aqui ainda não está verificando
    villagers.forEach(function(value, key) {
        if((villagers[key][2] === col) && (villagers[key][3] === lin )){
            console.log("values: " , villagers[key][2], villagers[key][3])
            return villagers[key];
        }
    });
    return null;
}

var moveTo = function(position, content, villagers, actual){
    var target = [];
    switch (position){
        case 'l': //move to left
            target.push(0,-1);
        break;
        case 'r': //move to right
            target.push(0,1);
        break;
        case 'u': //move to up
            target.push(-1,0);
        break;
        case 'd': //move to down
            target.push(1,0);
        break;
        default: //no move
            target.push(0,0);
    }
    var point = inspectPositions(content, villagers[actual], target)
        var arena = getTable();
        if (point !== "#"){
            content = clearPosition(content, [villagers[actual][2],villagers[actual][3]]);
            arena.children[villagers[actual][2]].children[villagers[actual][3]].innerHTML = "";
            setNewVillagerPosition(villagers[actual], target);
            content = printPosition(content, [villagers[actual][2],villagers[actual][3]], villagers[actual][0]);
            arena.children[villagers[actual][2]].children[villagers[actual][3]].innerHTML = villagers[actual][0];
            console.log("point", point);
        }
        if((point === "☺")){
            console.log("test: ", villagers[actual][1] += 5);
            //villager[1] = villager[1] + 5;
        }else if((point == "♥")||(point === "♦")||(point === "♣")||(point === "♠")){
            if(point !== villagers[actual][0]){
                console.log("duel");
                console.log("V1 = ", content[villagers[actual][2]][villagers[actual][3]]);
                console.log("getByPos", getVillagerByPosition(villagers, 2, 2));
            }
            
            //console.log("-> " + content[villager[2]][villager[3]] + " X " + content[target[0]][target[1]]);
    }
    return null;
}

var createGraphicTable = function(size){
    var arenaSlot = getTable();
    var arenaGraphic = document.createElement("table");
    for (var j = 0; j < size; j++) {
        var row = document.createElement("tr");
        for (var i = 0; i < size; i++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode("");
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        arenaGraphic.appendChild(row);
    }
    arenaGraphic.id = "arena";
    console.log("Created Arena Graphic with" + size + " X " + size);
    return arenaGraphic;
}

var createWorld = function(size){
    arenaGraphic = createGraphicTable(size); //create the arena <table> with size described
    var line = [];
    for(var l = 0 ; l < size ; l++){
        for(var c = 0 ; c < size ; c++){
            if ((l === 0 || c === 0)||(l === size-1 || c === size-1)){
                line[c] = "#";
                arenaGraphic.children[l].children[c].setAttribute("class", "wall");
            }else{
                line[c] = "☺";
                arenaGraphic.children[l].children[c].innerHTML = "•"
            }
        }
        content.push(line);
        line = [];
    }
    var arenaSlot = document.getElementById("arenaSlot");
    arenaSlot.appendChild(arenaGraphic);
    //console.log("ArenaWalls", arenaGraphic);
    return content;
}

var createInternalWalls = function(content, qtd){
    var arena = getTable();
    for(var i=0 ; i<qtd ; i++){
        var position = (getRamdonPosition(content.length));
        content = printPosition(content, position, "#");
        arena.children[position[0]].children[position[1]].setAttribute("class", "wall");
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
    var scoreBoard = getScoreBoard();
    villagers.forEach(function(value , key){
        moveTo(getRamdonMove(), content, villagers, key);
    })
    printLog(content);
    console.log("new round");
    villagers.forEach(function(value , key){
        console.log("Life: " + value[0] + " = " + value[1]);
        scoreBoard.children[key].children[1].innerHTML = value[1];
    })

}

//temporario para testes

//var arenaSlot = document.getElementById("arenaSlot");
//var arenaGraphic = createGraphicTable(10);
//arenaSlot.appendChild(arenaGraphic);

////////////////////////

content = createWorld(10,10);
content = populeWorld(content);

var rounds = window.setInterval(function(){round(content)}, 100);