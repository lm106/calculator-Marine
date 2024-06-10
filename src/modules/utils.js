export function getKey(obj){
    return Object.keys(obj);
    // return (key.length>0)? true: false;
}

export function getCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(getCopy);
    }

    const clonedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = getCopy(obj[key]);
        }
    }

    return clonedObj;
}
