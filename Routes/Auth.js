const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

/* Registro */
router.post("/registro", async (request, response) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const HashPass = await bcrypt.hash(request.body.password, salt);

    const NovoUser = new User({
      username: request.body.username,
      password: HashPass,
      email: request.body.email,
    });

    const user = await NovoUser.save();

    const { password, ...props } = user._doc;

    response.status(200).json(props);
  } catch (error) {
    response.status(500).json(error);
  }
});

/* Login */

router.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ username: request.body.username });
    !user && response.status(400).json("Nome de Usuário incorreto.");

    const validarSenha = await bcrypt.compare(
      request.body.password,
      user.password
    );
    !validarSenha && response.status(400).json("Senha incorreta.");

    const { password, ...props } = user._doc;

    response.status(200).json(props);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
