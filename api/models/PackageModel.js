const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Package name cannot be blank'],
            unique: true,
            minLength: 2,
            maxLength: 50,
        },
        description : {
            type: String,
            required: [true, 'Package description cannot be blank'],
            minLength: 2,
            maxLength: 500,
        },

        category: {
            type: String,
            required: [true, 'Package category cannot be blank'],
            minLength: 2,
            maxLength: 50,
        },
        
        price : {
            type: Number,
            required: [true, 'Package price cannot be blank'],
        },
        image : {
            type: String,
            required: false,
        },
        stock : {
            type: Number,
            required: [true, 'Package stock cannot be blank'],
        },
        rating : {
            type: Number,
            required: false,
        },
    },
    { collection: 'Packages' },
    { versionKey: false } // remove __v field
);

const packageModel = mongoose.model('Packages', packageSchema);
module.exports = packageModel;