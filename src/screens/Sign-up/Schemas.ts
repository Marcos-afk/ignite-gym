import * as yup from 'yup';

export const SignUpSchema = yup
  .object({
    name: yup.string().required('Nome é um campo requerido'),
    email: yup.string().email('Email invalido').required('Email é um campo requerido'),
    password: yup
      .string()
      .required('Senha é um campo requerido')
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .matches(/[a-zA-Z]/, 'A senha deve conter pelo menos uma letra')
      .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial'),
    password_confirm: yup
      .string()
      .required('Confirmação de senha é um campo requerido')
      .oneOf([yup.ref('password')], 'Senhas não conferem'),
  })
  .required();
