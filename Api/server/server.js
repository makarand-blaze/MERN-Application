const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const dal = require('./dal');

const dalObject = new dal();
const Instance = express();
Instance.use(cors());
Instance.use(bodyParser.urlencoded({ extended: true }));

// the disk storage
let diskStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, '../upload');
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname);
    }
});


// the multer object
let uploadFile = multer({ storage: diskStorage });

Instance.post('/formpayload', uploadFile.single('file'), dalObject.uploadFormData);
Instance.get('/formpayload', dalObject.getFormData);

Instance.listen(6070, () => {
    console.log('listening on 6070')
});