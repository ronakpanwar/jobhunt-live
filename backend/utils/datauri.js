import DataUriParser from "datauri/parser.js";
import path from "path";
    
const parser = new DataUriParser();

const getDataUri = (file) => {
    // Validate the file input
    if (!file || typeof file !== 'object') {
        throw new TypeError('Expected file to be an object');
    }

    if (!file.originalname || !file.buffer) {
        throw new TypeError('File object must have originalname and buffer properties');
    }

    // Corrected typo from orignalname to originalname
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;
