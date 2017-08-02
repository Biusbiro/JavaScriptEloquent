//import {printLog, getRamdonPosition, getRamdonMove} from 'Tools';
//import {createVillager, printPosition, clearPosition, 
//        inspectPositions,moveTo} from 'Villager';

var villagers = [];
var content = [];
var internallWalls = 0;
var sizeWorld = 0;
var velocity = 0;
var maxRounds = 0;


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
    return document.getElementById("scoreBoard");
}

var getTable = function(){
    return document.getElementById("arena");
}

var getRamdonMove = function(){
    var positions = ["l","r","u","d"];
    return positions[Math.round(Math.random()*100)%5];
    // 5 why draw a invalid type, dont move
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
        }
        if((point === "☺")){
            villagers[actual][1] += 5;
        }else if((point == "♥")||(point === "♦")||(point === "♣")||(point === "♠")){
            if(point !== villagers[actual][0]){
                //create function for start duel of the sides
            }
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
    content = createInternalWalls(content, config.internallWalls);
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
    villagers.forEach(function(value , key){
        scoreBoard.children[key].children[1].innerHTML = value[1];
    })
}

var start = function(config){
    config = setConfigs(config); //config settings selected by user or default
    console.log("velocity do start=", config.velocity)
    document.getElementById("bg-config").style.display = "none";
    content = createWorld(config.sizeWorld, config.sizeWorld);
    content = populeWorld(content);
    var rounds = window.setInterval(function(){round(content)}, config.velocity);
}

var isNumber = function(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

var setConfigs = function(config){
    velocityTemp = document.getElementById('speed').value
    wallsTemp = document.getElementById('walls').value;
    roundsTemp = document.getElementById('rounds').value;
    timeTemp = document.getElementById('time').value;
    sizeTemp = document.getElementById('size').value;
    if(isNumber(velocityTemp))
        config.velocity = velocityTemp;
    if(isNumber(wallsTemp))
        config.internallWalls = wallsTemp;
    if(isNumber(roundsTemp))
        config.maxRounds = roundsTemp;
    if(isNumber(timeTemp))
        config.maxTime = timeTemp;
    if(isNumber(sizeTemp))
        config.sizeWorld = sizeTemp;

    return config;
}

var config = {
////////////////////////--  DEFAULT CONFIG  --//////////////////////////
 
                sizeWorld      : 12  ,   // only square worlds
                maxRounds      : -1  ,   // set -1 for infinity
                maxTime        : -1  ,   // set -1 for infinity
                internallWalls : 10  ,   // the internal Walls
                velocity       : 100 ,   // in miliseconds
                userSelected   : "♣" ,   // chose one of: ♣, ♥, ♠, ♦.

////////////////////////////////////////////////////////////////////////
}