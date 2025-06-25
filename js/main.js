async function generate_crash(){
    let RdmData =  RandomString(104857600-14);
    for (let index = 0; index < 1023; index++) {
        let keysarray = await GetAllStorageKeys();
        console.log(keysarray.length);
        chrome.storage.local.set({
            ["RdmData" + (keysarray.length+1)]: JSON.stringify(RdmData)
        });
    }
}

async function add_100_more(){
    let RdmData =  RandomString(104857600-14);
    chrome.storage.local.set({
        [await StorageBytesInUse()]: JSON.stringify(RdmData)
    });
    console.log(await StorageBytesInUse());
}

function clear_storage(){
    chrome.storage.local.clear();
}

async function get_bytes_in_use(){
    console.log(await StorageBytesInUse());
}

async function get_all_storage_keys() {
    let keysarray = await GetAllStorageKeys();
    console.log(keysarray.length);
}

function RandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function GetAllStorageKeys(){
    return new Promise((resolve) => {
        chrome.storage.local.get(null, function(items){
            let AllStorageKeys = Object.keys(items);
            resolve(AllStorageKeys);
        });
    });
}

async function StorageBytesInUse(){
    return new Promise((resolve) => {
        chrome.storage.local.getBytesInUse(null, function(BytesInUse) {
            resolve(CalcBytesToReadable(BytesInUse) + " Bytes");
        });
    });
}

function CalcBytesToReadable(bytes){
    let units = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l]);
}

function addEventHandlers() {
    document.getElementById("generate_crash").onclick = generate_crash;
    document.getElementById("clear_storage").onclick = clear_storage;
    document.getElementById("get_bytes_in_use").onclick = get_bytes_in_use;
    document.getElementById("add_100_more").onclick = add_100_more;
    document.getElementById("get_all_storage_keys").onclick = get_all_storage_keys;
}