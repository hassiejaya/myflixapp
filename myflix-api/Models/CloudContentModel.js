const mongoose = require("mongoose");

const cloudContentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    url: {
        type: String,
        max: 500,
    },
    
});

module.exports = mongoose.model("cloudContent", cloudContentSchema);
