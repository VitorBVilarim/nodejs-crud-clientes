import joi from 'joi'

export const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo Nome é obrigatório',
        'string.empty': 'O campo Nome é obrigatório',
    }),

    telefone: joi.string().required().messages({
        'any.required': 'O campo Telefone é obrigatório',
        'string.empty': 'O campo Telefone é obrigatório',
    }),

    cpf: joi.string().max(11).required().messages({
        'any.required': 'O campo CPF é obrigatório',
        'string.empty': 'O campo CPF é obrigatório',
        'string.min': 'o CPF informado não existe!',
    }),

    email: joi.string().email().required().messages({
        'string.email': 'O campo Email precisa ter um formato válido',
        'any.required': 'O campo Email é obrigatório',
        'string.empty': 'O campo Email é obrigatório',
    }),


    cep: joi.string().required().max(8).messages({
        'any.required': 'O campo CEP é obrigatório',
        'string.base': 'O CEP deve ser do tipo texto(string)',
        'string.min': 'o CEP informado não existe!',
        'any.required': 'O campo CEP é obrigatório',
        'string.empty': 'O campo CEP é obrigatório'
    }),

    rua: joi.string().messages({
        'string.base': 'a Rua deve ser do tipo texto(string)',
        'any.required': 'O campo Rua é obrigatório',
        'string.empty': 'O campo Rua é obrigatório'
    }),

    cidade: joi.string().messages({
        'string.base': 'a Cidade deve ser do tipo texto(string)',
        'any.required': 'O campo Cidade é obrigatório',
        'string.empty': 'O campo Cidade é obrigatório'
    }),

    estado: joi.string().messages({
        'string.base': 'o Estado deve ser do tipo texto(string)',
        'any.required': 'O campo Estado é obrigatório',
        'string.empty': 'O campo Estado é obrigatório'
    }),
})