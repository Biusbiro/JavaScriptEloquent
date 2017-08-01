var MOUNTAINS = [
    {name: "Kilimanjaro",  height: 5895, country: "Tanzania"     },
    {name: "Everest",      height: 8848, country: "Nepal"        },
    {name: "Mount Fuji",   height: 3776, country: "Japan"        },
    {name: "Mont Blanc",   height: 4808, country: "Italy/France" },
    {name: "Vaalserberg",  height: 323,  country: "Netherlands"  },
    {name: "Denali",       height: 6168, country: "United States"},
    {name: "Popocatepetl", height: 5465, country: "Mexico"       }
];

if (typeof module !== "undefined" && module.exports)
    module.exports = MOUNTAINS;

function UnderlinedCell(inner) {
    this.inner = inner;
};
UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1).concat([repeat("-", width)]);
};

function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
        return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function(row) {
        return keys.map(function(name) {
            return new TextCell(String(row[name]));
        });
    });
    return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));