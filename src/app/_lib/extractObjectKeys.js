const users = {
    "name": "mahery",
    "mail": "mahery@gmail.com",
    "address": {
        "street": "4th road",
        "region": "Manhattan"
    }
}
const extractObjectKeys = (object) => {
    // let objectsKeysFlattened = ["name", "mail", "street", "region"]
    let objectsKeysFlattened = []
    let objectKeys = Object.keys(object)
    objectKeys.forEach(key => {
        const value = object[key]
        if (typeof (value) !== "object") {
            objectsKeysFlattened.push(key)
        }
        else {
            //could you break this down 
            objectsKeysFlattened = [...objectsKeysFlattened, ...extractObjectKeys(value)]
        }
    });
    console.log(objectsKeysFlattened)
    return objectKeys;
}
extractObjectKeys(users)

