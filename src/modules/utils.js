import {clusters} from "@/variables/clusters.js";

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

export function getAllClusters(){
    // return Object.keys(clusters);
    return ['MSFD GES','WFD GES', 'MPAs', 'Oceanographic', 'Coastal Land Use', 'Activities marine', 'Socio-economic', 'Governance'];
}