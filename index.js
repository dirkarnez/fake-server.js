(function(window) {
    var data = [
        {name: "Peter", id: 1}, 
        {name: "Paul", id: 2},
        {name: "Mary", id: 3}
    ];
    
    function shouldSuccess() {
        console.log(`Test mode is ${!!window.server.isTesting}`);
        return window.server.isTesting || Math.random() > 0.5;
    }

    function errorMessage(action) {
        return `Action "${action} unsuccessful!"`;
    }

    function create(item, callback) {
        setTimeout(function() {
            if (shouldSuccess()) {
                data = [...data, item];
                callback();
            } else {
                callback(new Error(errorMessage("create")));
            }
        }, 2000);
    }

    function createAsPromise(item) {
        return new Promise((res, rej) => {
            create(item, function(err) {
                err ? rej(err) : res();
            });
        })
    }

    function read(callback) {
        setTimeout(function() {
            shouldSuccess() 
            ? 
            callback(undefined, data) 
            : 
            callback(new Error(errorMessage("read")));
        }, 2000);
    }

    function readAsPromise() {
        return new Promise((res, rej) => {
            read(function(err, data) {
                err ? rej(err) : res(data);
            });
        })
    }

    function update(item, callback) {
        setTimeout(function() {
            if (shouldSuccess()) {
                data = data.map(datum => datum.id == item.id ? ({...datum, ...item}) : datum);
                callback();
            } else {
                callback(new Error(errorMessage("update")));
            }
        }, 2000);
    }

    function updateAsPromise(item) {
        return new Promise((res, rej) => {
            update(item, function(err) {
                err ? rej(err) : res();
            });
        })
    }
    
    function delette(id, callback) {
        setTimeout(function() {
            if (shouldSuccess()) {
                data = data.filter(datum => datum.id != id);
                callback();
            } else {
                callback(new Error(errorMessage("delette")));
            }
        }, 2000);
    }

    function deletteAsPromise(id) {
        return new Promise((res, rej) => {
            delette(id, function(err) {
                err ? rej(err) : res();
            });
        })
    }

    window.server =  window.server || {
        create,
        createAsPromise,
        read,
        readAsPromise,
        update,
        updateAsPromise,
        delette,
        deletteAsPromise
    };
})(window);