const DeviceController = require('../controllers/DeviceController');

const DeviceRoute = (app) => {
    // Declare API endpoints here (URL)
    // 1 without id
    app.route('/devices')
        .get(DeviceController.ViewAllDevices)
        .post(DeviceController.AddDevice);

    app.route('/devices/:id')
        .get(DeviceController.ViewDevice)
        .put(DeviceController.UpdateDevice)
        .delete(DeviceController.DeleteDevice);

    app.route('/devices/search/:keyword')
        .get(DeviceController.FindDeviceByName);
}
module.exports = DeviceRoute;

