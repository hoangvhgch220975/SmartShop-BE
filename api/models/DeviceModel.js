const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Device name cannot be blank'],
            unique: true,
            minLength: 2,
            maxLength: 50,
        },
        category: {
            type: String,
            required: [true, 'Device category cannot be blank'],
            minLength: 2,
            maxLength: 50,
        },
        description : {
            type: String,
            required: [true, 'Device description cannot be blank'],
            minLength: 2,
            maxLength: 500,
        },
        price : {
            type: Number,
            required: [true, 'Device price cannot be blank'],
        },
        image : {
            type: String,
            required: false,
        },
        stock : {
            type: Number,
            required: [true, 'Device stock cannot be blank'],
        }, 
        rating : {
            type: Number,
            required: false,
        },
    },
    { collection: 'Devices' },
    { versionKey: false } // remove __v field
);

const deviceModel = mongoose.model('Devices', deviceSchema);
module.exports = deviceModel;