const express = require('express');

const loginRoutes = require('./routes/loginRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')
const transacaoRoutes = require('./routes/transacaoRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.json());

app.use("/login", loginRoutes)
app.use("/categoria", categoriaRoutes)
app.use("/transacao", transacaoRoutes)
app.use("/usuario", usuarioRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}\nhttp://localhost:${PORT}`);
});