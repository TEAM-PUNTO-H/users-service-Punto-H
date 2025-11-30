import Joi from "joi";

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'El correo electrónico no es válido',
        'any.required': 'El correo electrónico es obligatorio',
        'string.empty': 'El correo electrónico no puede estar vacío',
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'La contraseña debe tener al menos 8 caracteres',
        'any.required': 'La contraseña es obligatoria',
        'string.empty': 'La contraseña no puede estar vacía',
    }),
    phoneNumber: Joi.string().length(10).pattern(/^\d+$/).required().messages({
        'string.pattern.base': 'El número de teléfono solo puede contener números',
        'string.length': 'El número de teléfono debe contener 10 dígitos',
        'any.required': 'El número de teléfono es obligatorio',
        'string.empty': 'El número de teléfono no puede estar vacío',
    }),
    fullName: Joi.string().required().messages({
        'any.required': 'El nombre completo es obligatorio',
        'string.empty': 'El nombre completo no puede estar vacío',
    }),
    role: Joi.string().valid('admin', 'vendedor','moderador', 'comprador').required().messages({
        'any.required': 'El rol es obligatorio',
        'string.empty': 'El rol no puede estar vacío',
        'any.only': 'El rol debe ser "admin" ,"vendedor", "moderador" o "comprador"',
    }),
    socialMedia: Joi.string().allow(null),
    workingHours: Joi.string().allow(null),
    address: Joi.string().allow(null),
    state: Joi.string().allow(null).valid('activo', 'pendiente', 'inactivo').messages({
        'any.only': 'El estado debe ser "activo", "pendiente" o "inactivo"',
        'string.empty': 'El estado no puede estar vacío',
    }),

});

export const updateUserSchema = Joi.object({
    email: Joi.string().email().messages({
        'string.email': 'El correo electrónico no es válido',
        'string.empty': 'El correo electrónico no puede estar vacío',
    }),
    password: Joi.string().min(8).messages({
        'string.min': 'La contraseña debe tener al menos 8 caracteres',
        'string.empty': 'La contraseña no puede estar vacía',
    }),
    phoneNumber: Joi.string().length(10).pattern(/^\d+$/).messages({
        'string.pattern.base': 'El número de teléfono solo puede contener números',
        'string.length': 'El número de teléfono debe contener 10 dígitos',
        'string.empty': 'El número de teléfono no puede estar vacío',
    }),
    fullName: Joi.string().messages({}),
    role: Joi.string().valid('admin', 'vendedor', 'comprador').messages({
        'any.only': 'El rol debe ser "admin" , "vendedor" o "comprador"',
        'string.empty': 'El rol no puede estar vacío',
    }),
    socialMedia: Joi.string().allow(null),
    workingHours: Joi.string().allow(null),
    address: Joi.string().allow(null),
        state: Joi.string().allow(null).valid('activo', 'pendiente', 'inactivo').messages({
        'any.only': 'El estado debe ser "activo", "pendiente" o "inactivo"',
        'string.empty': 'El estado no puede estar vacío',
    }),

});