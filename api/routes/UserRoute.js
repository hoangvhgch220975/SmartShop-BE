const UserController = require('../controllers/UserController');

const UserRoute = (app) => {
  // Auth
  app.post('/api/auth/signup', UserController.signup);
  app.post('/api/auth/login', UserController.login);
  app.put('/api/auth/user/:id', UserController.updateUserInfo);

  // Admin CRUD
  app.route('/users')
    .get(UserController.ViewAllUsers)
    .post(UserController.AddUser);

  app.route('/users/:id')
    .get(UserController.ViewUser)
    .put(UserController.UpdateUser)
    .delete(UserController.DeleteUser);
  // Search user by username
  app.route('/users/search/:keyword')
    .get(UserController.FindUserByName);
  // Check if username exists
  app.route('/users/check-username/:username')
    .get(UserController.checkUsernameExists);
  //check if email exists
  app.route('/users/check-email/:email')
    .get(UserController.checkEmailExists);

  //change password
  app.route('/user/:id/change-password')
    .put(UserController.changeUserPassword);
  
};

module.exports = UserRoute;
