const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const stringConnection = `${process.env.DB_URL}/${process.env.DB_NAME}`

module.exports = mongoose.connect(`mongodb://${stringConnection}`, { useNewUrlParser: true })

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório"
mongoose.Error.messages.Number.min = "O '{VALUE}' informando é menor que o limite mínimo de '{MIN}.'"
mongoose.Error.messages.Number.max = "O '{VALUE}' informando é maior que o limite máximo de '{MAX}.'"
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'"
