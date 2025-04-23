const comboModel = require('../models/ComboModel');

const ViewAllCombos = async (req, res) => {
    try {
        var combos = await comboModel.find({});
        res.json(combos);
    } catch (err) {
        console.log(err);
    };
}

const ViewCombo = async (req, res) => {
    try {
        var id = req.params.id;
        var combo = await comboModel.findById(id);
        res.json(combo);
    } catch (err) {
        console.log(err);
    }
}

const FindComboByName = async (req, res) => {
    try {
        const keyword = req.params.keyword;

        // Search combos based on name, includedDevices, or includedPackages
        const combos = await comboModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } }, // Match the combo name
                { includedDevices: { $regex: keyword, $options: 'i' } }, // Match devices included in the combo
                { includedPackages: { $regex: keyword, $options: 'i' } }, // Match packages included in the combo
            ],
        });

        res.json(combos);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while fetching combos');
    }
};


const AddCombo = async (req, res) => {
    try {
        var combo = req.body;
        await comboModel.create(combo);
        res.json({ message: 'Combo created!' });
    }
    catch (err) {
        console.log(err);
    }
}

const UpdateCombo = async (req, res) => {
    try {
        var id = req.params.id;
        var combo = req.body;
        await comboModel.findByIdAndUpdate(id, combo);
        res.json({ message: 'Combo updated!' });
    } catch (err) {
        console.log(err);
    }
}

const DeleteCombo = async (req, res) => {
    try {
        var id = req.params.id;
        await comboModel.findByIdAndDelete(id);
        res.json({ message: 'Combo deleted!' });
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    ViewAllCombos,
    ViewCombo,
    FindComboByName,
    AddCombo,
    UpdateCombo,
    DeleteCombo
}