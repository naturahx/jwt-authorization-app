const UserService = require('../service/user-service')
const { validationResult } = require("express-validator");
const ApiError = require('../exceptions/api-error')

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
      }
      const {email, password} = req.body;
      const userData = await UserService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookie;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e)
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(actiovationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e)
    }
  }
  async refrech(req, res, next) {
    try {
      const {refreshToken} = req.cookie;
      const userData = await userService.refrech(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers()
      return res.json(users);
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()