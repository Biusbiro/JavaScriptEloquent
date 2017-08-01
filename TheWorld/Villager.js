
export var createVillager = function(content, villagers, size, type){
    var validator = 0;
    var position = [];
    while(validator === 0){
        position = getRamdonPosition(size);
        if(content[position[0]][position[1]] === "#"){
            console.log("error, position[" + 
            position[0] + "][" + position[1] + 
            "] is ocuped", content[position[0]][position[1]]);
        }else{
            content[position[0]][position[1]] = type;
            validator = 1;
        }
    }
    villagers.push([type, 40, position[0], position[1]]);
    return villagers;
}

export var  printPosition = function(content, position, type) {
    content[position[0]][position[1]] = type;
    return content;
}

export var  clearPosition = function(content, position) {
    content[position[0]][position[1]] = " ";
    return content;
}

export var inspectPositions = function(content, villager, target){
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

export var moveTo = function(position, content, villagers, actual){
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
        if (point !== "#"){
            content = clearPosition(content, [villagers[actual][2],villagers[actual][3]]);
            setNewVillagerPosition(villagers[actual], target);
            content = printPosition(content, [villagers[actual][2],villagers[actual][3]], villagers[actual][0]);
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