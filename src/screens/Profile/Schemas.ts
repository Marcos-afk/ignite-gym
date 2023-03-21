/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as yup from 'yup';

export const ProfileFormSchema = yup
  .object({
    name: yup.string().required('Nome é um campo requerido'),
    email: yup.string().email('Email invalido').required('Email é um campo requerido'),
    password: yup
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .matches(/[a-zA-Z]/, 'A senha deve conter pelo menos uma letra')
      .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial')
      .nullable()
      .transform((value) => (value ? value : null)),
    confirm_password: yup
      .string()
      .nullable()
      .transform((value) => (value ? value : null))
      .oneOf([yup.ref('password'), null], 'Senhas não conferem')
      .when('password', {
        is: (Field: any) => Field,
        then: (schema) =>
          schema
            .nullable()
            .required('Informe a confirmação da senha.')
            .transform((value) => (value ? value : null)),
      }),
  })
  .required();
