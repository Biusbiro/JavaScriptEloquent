// global variables/////////
    var characters = [];
    var content = [];
    var freePositions = 0;
    var rounds = 0;
////////////////////////////

// print in lines format the matrix in console.log
var printLog = function (content) {
    for(var i=0 ; i < content.length ; i++){
        console.log("linha: " + i,content[i]);
    }
}

// genetated a pair of points based in content size
var  getRamdonPosition = function(size) {
    size = size-2;
    var wall_l = Math.round(Math.random()*100)%size;
    var wall_c = Math.round(Math.random()*100)%size;
    wall_l++;
    wall_c++;
    var cell = [wall_l , wall_c];
    return cell;
}

// return the element requisited per String parameter
var getById = function (element) {
    return document.getElementById(element);
}

// return five options, up, left, down, right, null, for movement characters
var getRamdonMove = function(){
    var positions = ["l","r","u","d"];
    return positions[Math.round(Math.random()*100)%5];
}

var createCharacter = function(content, character, size, type){
    var validator = 0;
    var position = [];
    var arena = getById("arena");
    while(validator === 0){
        position = getRamdonPosition(size);
        if(content[position[0]][position[1]] === "#"){
            console.log("relocad character, position[" + 
            position[0] + "][" + position[1] + 
            "] is ocuped for internal wall: ", content[position[0]][position[1]]);
        }else{
            content[position[0]][position[1]] = type;
            arena.children[position[0]].children[position[1]].innerHTML = type;
            validator = 1;
        }
    }
    character.push([type, 0, position[0], position[1]]);
    return character;
}

var isNumber = function(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

var  printPosition = function(content, position, type) {
    content[position[0]][position[1]] = type;
    return content;
}

var  clearPosition = function(content, position) {
    content[position[0]][position[1]] = " ";
    return content;
}

var inspectPositions = function(content, character, target){
    return content[character[2]+target[0]][character[3]+target[1]];
}

var setNewCharacterPosition = function(character, target){
    character[2] = character[2]+target[0];
    character[3] = character[3]+target[1];
    return character;
}

var moveTo = function(position, content, character, actual){
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
    var point = inspectPositions(content, character[actual], target)
        var arena = getById("arena");
        if (point !== "#"){
            content = clearPosition(content, [character[actual][2],character[actual][3]]);
            arena.children[character[actual][2]].children[character[actual][3]].innerHTML = "";
            setNewCharacterPosition(character[actual], target);
            content = printPosition(content, [character[actual][2],character[actual][3]], character[actual][0]);
            arena.children[character[actual][2]].children[character[actual][3]].innerHTML = character[actual][0];
        }
        if((point === "☺")){
            character[actual][1] += 5;
        }else if((point == "♥")||(point === "♦")||(point === "♣")||(point === "♠")){
            if(point !== character[actual][0]){
                //create function for start duel of the sides
            }
    }
    return null;
}

// creates arena in the DOM
var createGraphicTable = function(size){
    var arenaSlot = getById("arena");
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

//create the square arena <table> with config.WorldSize
var createWorld = function(size){
    arenaGraphic = createGraphicTable(size); 
    var line = [];
    for(var l = 0 ; l < size ; l++){
        for(var c = 0 ; c < size ; c++){
            if ((l === 0 || c === 0)||(l === size-1 || c === size-1)){
                line[c] = "#";
                arenaGraphic.children[l].children[c].setAttribute("class", "wall");
            }else{
                freePositions += 1;
                line[c] = "☺";
                arenaGraphic.children[l].children[c].innerHTML = "•"
            }
        }
        content.push(line);
        line = [];
    }
    var arenaSlot = document.getElementById("arenaSlot");
    arenaSlot.appendChild(arenaGraphic);
    return content;
}

// generates internall walls based in config.internallWalls value
var createInternalWalls = function(content, qtd){
    var arena = getById("arena");
    for(var i=0 ; i<qtd ; i++){
        var position = (getRamdonPosition(content.length));
        content = printPosition(content, position, "#");
        arena.children[position[0]].children[position[1]].setAttribute("class", "wall");
    }
    return content;
}

// generates pre-configured characters and call function for set internal walls
var populeWorld = function(content){
    content = createInternalWalls(content, config.internallWalls);
    characters = createCharacter(content, characters, content.length, "♣");
    characters = createCharacter(content, characters, content.length, "♥");
    characters = createCharacter(content, characters, content.length, "♠");
    characters = createCharacter(content, characters, content.length, "♦");
    return content;
}

// update location for character and the scoreboard
var round = function(content){
    var scoreBoard = getById("scoreBoard");
    characters.forEach(function(value , key){
        moveTo(getRamdonMove(), content, characters, key);
    })
    characters.forEach(function(value , key){
        scoreBoard.children[key].children[1].innerHTML = value[1];
    })
}

// looping for no user data entry for MaxRounds and MaxTime
var loopingDefault = function(){
    console.log("Sem entradas para MaxTime & MaxRounds");
    var rounds = window.setInterval(function(){round(content)}, config.velocity);
}

// looping with max time passed by user
var loopingWitchMaxTime = function(){
    var interval = window.setInterval(function() {
        round(content);
    }, config.velocity);

    window.setTimeout(function() {
        clearInterval(interval);
    }, config.maxTime * 1000);
}

var loopingWitchMaxRounds = function(){
    console.log("entrada de dados somente no Max Rounds");
    var interval = window.setInterval(function() {
        round(content);
    }, config.velocity);

    window.setTimeout(function() {
        clearInterval(interval);
    }, config.maxTime * 1000);
}

var loopingWitchMaxTimeAndMaxRounds = function(){
    console.log("entrada de dados em Max Rounds & Max Time");
}

// function that chose the apropriate looping
var looping = function(content, object, config){    
    if((config.maxTime == -1) && (config.maxRounds != -1)){
        loopingWitchMaxRounds();
    }else
    if((config.maxTime != -1) && (config.maxRounds == -1)){
        loopingWitchMaxTime();
    }else
    if((config.maxTime != -1) && (config.maxRounds != -1)){
        loopingWitchMaxTimeAndMaxRounds();
    }else{
        loopingDefault();
    }
}

// create world with settings, popule and show in DOM
var start = function(config){
    config = setConfigs(config); //config settings selected by user or default
    document.getElementById("bg-config").style.display = "none";
    content = createWorld(config.sizeWorld, config.sizeWorld);
    content = populeWorld(content);
}

// return true if the value passed is a number
var isNumber = function(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// verify the input values and setting congif variable
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
    if(isNumber(sizeTemp) && (sizeTemp > 6))
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