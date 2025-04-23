    const mongoose = require('mongoose');

    const comboSchema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, 'Combo name cannot be blank'],
                unique: true,
                minLength: 2,
                maxLength: 50,
            },
            description : {
                type: String,
                required: [true, 'Combo description cannot be blank'],
                minLength: 2,
                maxLength: 500,
            },
            includedDevices : {
                type: [String],
                required: [true, 'Included devices cannot be blank'],
                minLength: 2,
                maxLength: 500,
            },
            includedPackages : {
                type: [String],
                required: [true, 'Included packages cannot be blank'],
                minLength: 2,
                maxLength: 500,
            },
            price : {
                type: Number,
                required: [true, 'Combo price cannot be blank'],
            },
            image : {
                type: String,
                required: false,
            },
            stock : {
                type: Number,
                required: [true, 'Combo stock cannot be blank'],
            }, 
            rating : {
                type: Number,
                required: false,
            },
        },
        { collection: 'Combos' },
        { versionKey: false } // remove __v field
    );

    const comboModel = mongoose.model('Combos', comboSchema);
    module.exports = comboModel;