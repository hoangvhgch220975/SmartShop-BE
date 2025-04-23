const MailController = require('../controllers/MailController');

const MailRoute = (app) => {
    // Declare API endpoints here (URL)
    app.route('/api/contact')
        .post(MailController.sendContactMessage);
}

module.exports = MailRoute;