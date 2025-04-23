const PackageController = require('../controllers/PackageController');

const PackageRoute = (app) => {
    // Declare API endpoints here (URL)
    // 1 without id
    app.route('/packages')
        .get(PackageController.ViewAllPackages)
        .post(PackageController.AddPackage);

    app.route('/packages/:id')
        .get(PackageController.ViewPackage)
        .put(PackageController.UpdatePackage)
        .delete(PackageController.DeletePackage);

    app.route('/packages/search/:keyword')
        .get(PackageController.FindPackageByName);
}
module.exports = PackageRoute;