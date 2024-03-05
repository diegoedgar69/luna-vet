const mongo = require("mongoose")
mongo.connect("mongodb://localhost/luna-vet").then(bd => console.log("me conecte")).catch(err => console.log(err));

