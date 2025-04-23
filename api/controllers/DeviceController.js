const deviceModel = require("../models/DeviceModel");

const ViewAllDevices = async (req, res) => {
    try {
        var devices = await deviceModel.find({});
        res.json(devices);
    } catch (err) {
        console.log(err);
    };
}

const ViewDevice = async (req, res) => {
    try {
        var id = req.params.id;
        var device = await deviceModel.findById(id);
        res.json(device);
    } catch (err) {
        console.log(err);
    }
}

const FindDeviceByName = async (req, res) => {
    try {
        var keyword = req.params.keyword;
        var devices = await deviceModel.find({ name: { $regex: keyword, $options: 'i' } });
        res.json(devices);
    } catch (err) {
        console.log(err);
    }
};

const AddDevice = async (req, res) => {
    try {
        var device = req.body;
        await deviceModel.create(device);
        res.json({ message: 'Device created!' });
    }
    catch (err) {
        console.log(err);
    }
}

const UpdateDevice = async (req, res) => {
    try {
        var id = req.params.id;
        var device = req.body;
        await deviceModel.findByIdAndUpdate(id, device);
        res.json({ message: 'Device updated!' });
    } catch (err) {
        console.log(err);
    }
}

const DeleteDevice = async (req, res) => {
    try {
        var id = req.params.id;
        await deviceModel.findByIdAndDelete(id);
        res.json({ message: 'Device deleted!' });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    ViewAllDevices,
    ViewDevice,
    FindDeviceByName,
    AddDevice,
    UpdateDevice,
    DeleteDevice
};
