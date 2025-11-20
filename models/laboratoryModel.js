const mongoose = require('mongoose');

const laboratorySchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    prescription: String,
    message: String,
    userid: {
        type: String,
        required: true   
    },
    status: {
        type: String,
        default: "Pending" 
    }

})

module.exports = mongoose.model('laboratory', laboratorySchema);