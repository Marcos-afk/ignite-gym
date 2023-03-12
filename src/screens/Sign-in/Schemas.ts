import * as yup from 'yup';

export const SignInSchema = yup
  .object({
    email: yup.string().required('Email é um campo requerido'),
    password: yup.string().required('Senha é um campo requerido'),
  })
  .required();
