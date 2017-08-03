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

var getBySession = function(element) {
    return JSON.parse(sessionStorage.getItem(element));
}

// return five options, up, left, down, right, null, for movement characters
var getRamdonMove = function(){
    var positions = ["l","r","u","d"];
    return positions[Math.round(Math.random()*100)%5];
}

// create Character and print in DOM
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

// verify if is a number
var isNumber = function(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// print a string in the passed position
var  printPosition = function(content, position, type) {
    content[position[0]][position[1]] = type;
    return content;
}

// print blank space in the passed position
var  clearPosition = function(content, position) {
    content[position[0]][position[1]] = " ";
    return content;
}

// check what's in the position
var inspectPositions = function(content, character, target){
    return content[character[2]+target[0]][character[3]+target[1]];
}

// set a new position for character
var setNewCharacterPosition = function(character, target){
    character[2] = character[2]+target[0];
    character[3] = character[3]+target[1];
    return character;
}

// get random position for move and verify if is empty, move and print in DOM
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
    var arenaSlot = getById("arenaSlot");
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
    //var interval = window.setInterval(function() {
    //    round(content);
    //}, config.velocity);

    //window.setTimeout(function() {
    //    clearInterval(interval);
    //}, config.maxTime * 1000);
}

var loopingWitchMaxTimeAndMaxRounds = function(){
    console.log("entrada de dados em Max Rounds & Max Time");
}

// set default value in session
var setConfigInSession = function() {
    console.log("checked save config");
    var configTemp = JSON.stringify(config);
    sessionStorage.setItem('savedConfig', configTemp);
}

var getValuesForm = function(){
    var temp = {
        velocity : getById('speed' ).value,
        walls    : getById('walls' ).value,
        rounds   : getById('rounds').value,
        time     : getById('time'  ).value,
        size     : getById('size'  ).value 
    }
    return temp;
}

// receive all values of forms and subscribe valid values
var suscribeConfig = function(data) {
    console.log("session data", getBySession('savedConfig'));
    var temp = getValuesForm();
    if(data == null){
        console.log("nao tem session", getValuesForm());
        if(isNumber(temp.velocity))
            config.velocity = temp.velocity;
        if(isNumber(temp.walls))
            config.internallWalls = temp.walls;
        if(isNumber(temp.rounds))
            config.maxRounds = temp.rounds;
        if(isNumber(temp.time))
            config.maxTime = temp.time;
        if(isNumber(temp.size) && (temp.size > 6))
            config.sizeWorld = temp.size;
    }else{
        console.log("se tem session", getValuesForm());
        if(isNumber(temp.velocity))
            data.velocity = temp.velocity;
        if(isNumber(temp.walls))
            data.internallWalls = temp.walls;
        if(isNumber(temp.rounds))
            data.maxRounds = temp.rounds;
        if(isNumber(temp.time))
            data.maxTime = temp.time;
        if(isNumber(temp.size) && (temp.size > 6))
            data.sizeWorld = temp.size;

        config.velocity = data.velocity;
        config.internallWalls = data.internallWalls;
        config.maxRounds = data.maxRounds;
        config.maxTime = data.maxTime;
        config.sizeWorld = data.sizeWorld;

        getById("saveconfig").checked = true;
    }

    if(getById("saveconfig").checked = true){
        console.log("esta check");
        console.log(getById("saveconfig"));
        setConfigInSession();
    }
}

// function that chose the apropriate looping
var looping = function(content, object){  
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

var setConfigs = function(configuration){
    console.log("session antes", getBySession('savedConfig'));
    var sessionConfig = getBySession('savedConfig');
    var startConfig = suscribeConfig(sessionConfig);
    console.log("session depois", getBySession('savedConfig'));
}

// create world with settings, popule and show in DOM
var start = function(){
    setConfigs();
    getById("bg-config").style.display = "none";
    content = createWorld(config.sizeWorld, config.sizeWorld);
    content = populeWorld(content);
    //if (getById("saveconfig"))
    console.log(getById("saveconfig"))
    //    sessionStorage.removeItem('savedConfig');
}

if(getBySession('savedConfig')){
    getById("saveconfig").checked = true;
}

var config = {
////////////////////////--  DEFAULT CONFIG  --///////////////////////////////
 
            sizeWorld      : 12  ,   // only square worlds
            maxRounds      : -1  ,   // set -1 for infinity
            maxTime        : -1  ,   // set -1 for infinity
            internallWalls : 10  ,   // the internal Walls
            velocity       : 100 ,   // in miliseconds
            userSelected   : "♣" ,   // chose one of: ♣, ♥, ♠, ♦.

/////////////////////////////////////////////////////////////////////////////
}