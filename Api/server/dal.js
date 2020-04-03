const fs = require('fs');
const mongoose = require('mongoose');

var FormSchema = require('./schema');
class DataStorage {
  
    uploadFormData = (request, response) => {
            // 1. connect to the MongoDB database
            let db = mongoose.connect("mongodb://localhost:27017/FromDB", {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            });
            // 2. make sure that connection is established
            let dbConnection = mongoose.connection; // make sure that the connection is done 
            if (!dbConnection) {
                console.log('Cannot Connect to the database');
                return;
            }

            console.log('In Upload Image Method' + request.file.originalname);
            // 3. read the received image
            const image = fs.readFileSync(request.file.path);
            // 4. encode the image in base64
            const encodedImage = image.toString('base64');
            // 5. the JSON object to store file informatin on MongoDB collection

            const formPayload = {
                StudentId: request.body.StudentId,
                StudentName: request.body.StudentName,
                StudentEmail:request.body.StudentEmail,
                DateOfBirth: request.body.DateOfBirth,
                Course: request.body.SelectedCourse,
                University: request.body.UniversitySelection,
                Year: request.body.YearSelection,
                Description: request.body.description,
                FileName: request.file.originalname,
                File: new Buffer.from(encodedImage, 'base64'),
                MimeType: request.file.mimetype
            };
            
            FormSchema.create(formPayload, (err, res) => {
                if (err) {
                    response.send({ statusCode: 500, message: err.message });
                }
                console.log(`Success ${res._id}`);
                response.send({ statusCode: 200, data: `Success ${res._id}` });
            })
        }
        // method to read student data from the database
    getFormData = (request, response) => {
        let db = mongoose.connect("mongodb://localhost:27017/FormDB", {
            useNewUrlParser: true, // Parse Schema and Map with Model
            useUnifiedTopology: true
        }); 
        let dbConnection = mongoose.connection; // make sure that the connection is done 
        if (!dbConnection) {
            console.log('Cannot Connect to the database');
            return;
        }
        FormSchema.find((err, res) => {
            if (err) {
                response.send({ statusCode: 500, message: err.message });
            }
            response.send({ statusCode: 200, data: res });
        });

    }
}
module.exports = DataStorage;




























