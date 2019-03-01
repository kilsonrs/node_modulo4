"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    //ctx => contexto da requisição
    const data = request.only(["username", "email", "password"]);

    const user = await User.crreate(data);

    return user;
  }
}

module.exports = UserController;
