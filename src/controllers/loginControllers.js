const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { id } = req.usuario
    try {
        const token = jwt.sign({ id: id }, process.env.SENHAJWT, { expiresIn: "1h" })

        return res.json({ usuario: req.usuario, token })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    login
}