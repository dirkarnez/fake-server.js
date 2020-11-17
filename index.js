var data = [
    {name: "Peter", id: 1}, 
    {name: "Paul", id: 2},
    {name: "Mary", id: 3}
];

function create(item, callback) {
    setTimeout(function() {
        data = [...data, item];
        callback(true);
    }, 2000);
}

function read(callback) {
    setTimeout(function() {
        callback(data);
    }, 2000);
}

function update(item, callback) {
    setTimeout(function() {
        data = data.map(datum => datum.id == item.id ? ({...datum, ...item}) : datum);
        callback(true);
    }, 2000);
}

function delette(id, callback) {
    setTimeout(function() {
        data = data.filter(datum => datum.id != id);
        callback(true);
    }, 2000);
}

/**
read(function(data) {
    alert(JSON.stringify(data));
})
create({name: "Alex", id: 4}, function(isSuccess) {
    alert(isSuccess);
})
read(function(data) {
    alert(JSON.stringify(data));
})
update({name: "Alexander", id: 4}, function(isSuccess) {
    alert(isSuccess);
});
read(function(data) {
    alert(JSON.stringify(data));
});
delette(4, function(isSuccess) {
    alert(isSuccess);
});
read(function(data) {
    alert(JSON.stringify(data));
});
 */
