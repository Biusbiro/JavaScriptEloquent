var MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
    {name: "Everest", height: 8848, country: "Nepal"},
    {name: "Mount Fuji", height: 3776, country: "Japan"},
    {name: "Mont Blanc", height: 4808, country: "Italy/France"},
    {name: "Vaalserberg", height: 323, country: "Netherlands"},
    {name: "Denali", height: 6168, country: "United States"},
    {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

var mountainsArray = [];
MOUNTAINS.forEach(value => mountainsArray.push(value));

var createCell = function(value, father) {
    var cell = document.createElement("td");
    father.appendChild(cell);
    var textCell = document.createTextNode(value);
    cell.appendChild(textCell);
    return cell;
};

var buildTable = function() {
    mountainsArray.forEach(function(value, key){
        var newTr = document.createElement("tr");
        var nome = createCell(value.name, newTr);
        var altura = createCell(value.height, newTr);
        var pais = createCell(value.country, newTr);
        var Atual = document.getElementById("values"); 
        console.log(newTr);
        
        document.body.insertBefore(newTr, Atual);
        console.log(newTr);
    });
}

buildTable();