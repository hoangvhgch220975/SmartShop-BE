const ComboController = require('../controllers/ComboController');

const ComboRoute = (app) => {
    // Declare API endpoints here (URL)
    // 1 without id
    app.route('/combos')
        .get(ComboController.ViewAllCombos)
        .post(ComboController.AddCombo);

    app.route('/combos/:id')
        .get(ComboController.ViewCombo)
        .put(ComboController.UpdateCombo)
        .delete(ComboController.DeleteCombo);

    app.route('/combos/search/:keyword')
        .get(ComboController.FindComboByName);
}
module.exports = ComboRoute;