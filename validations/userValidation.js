import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .empty()
        .trim()
        .messages({
            'any.required': `Le prenom est requis`,
            'string.empty': `Le prenom est vide.`,
            'string.min': `Le prenom doit contenir au moins 2 caractères.`,
        }),
    lastname: Joi.string()
        .min(2)
        .max(50)
        .required()
        .trim()
        .messages({
            'any.required': `Le nom est requis`,
            'string.empty': `Le nom est vide.`,
            'string.min': `Le nom doit contenir au moins 2 caractères.`,
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .lowercase()
        .messages({
            'any.required': `Le email est requis`,
            'string.email': `Le format de l'email est invalide.`,
            'string.empty': `L'email est vide.`,
        }),
    password: Joi.string()
        .empty()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({
            'string.empty': `Le mot de passe est vide.`,
            'any.required': `Le mot de passe est requis`,
            'string.pattern.base': `Le mot de passe ne doit pas avoir des caracteres speciaux.`,
        }),
    confirmPassword: Joi.string()
        .required() // On mes required car cela s'applique INDIVIDUELLEMENT A CHAQUE CHAMP, ON NE PEUT PAS PRENDRE CELUI DE password
        .valid(Joi.ref('password'))
        .messages({
            'string.empty': `Le mot de passe est vide.`,
            'any.required': `Le mot de passe est requis`,
            'any.only': `Les mots de passe ne correspondent pas.`,
        }),
    isVerified: Joi.boolean()
        .default(false)
        .valid(false)
        .messages({
            'boolean.valid': `Toujours isVerified est false quand on crée un utilisateur.`,
            'boolean.default': `Par defaut isVerified est false`
        }),
    avatar: Joi.string()
        .min(2)
        .messages({
            "string.min": `L'avatar doit conenir au moins 2 caractères.`
        })
});