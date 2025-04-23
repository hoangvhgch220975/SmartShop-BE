const packageModel = require('../models/PackageModel');

const ViewAllPackages = async (req, res) => {
    try {
        var packages = await packageModel.find({});
        res.json(packages);
    } catch (err) {
        console.log(err);
    };
}

const ViewPackage = async (req, res) => {
    try {
        var id = req.params.id;
        var package = await packageModel.findById(id);
        res.json(package);
    } catch (err) {
        console.log(err);
    }
}

const FindPackageByName = async (req, res) => {
    try {
        var keyword = req.params.keyword;
        var packages = await packageModel.find({ name: { $regex: keyword, $options: 'i' } });
        res.json(packages);
    } catch (err) {
        console.log(err);
    }
};

const AddPackage = async (req, res) => {
    try {
        var package = req.body;
        await packageModel.create(package);
        res.json({ message: 'Package created!' });
    }
    catch (err) {
        console.log(err);
    }
}

const UpdatePackage = async (req, res) => {
    try {
        var id = req.params.id;
        var package = req.body;
        await packageModel.findByIdAndUpdate(id, package);
        res.json({ message: 'Package updated!' });
    }
    catch (err) {
        console.log(err);
    }
}

const DeletePackage = async (req, res) => {
    try {
        var id = req.params.id;
        await packageModel.findByIdAndDelete(id);
        res.json({ message: 'Package deleted!' });
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    ViewAllPackages,
    ViewPackage,
    FindPackageByName,
    AddPackage,
    UpdatePackage,
    DeletePackage
}
