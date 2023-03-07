import * as yup from 'yup';

export const SignInSchema = yup
  .object({
    email: yup.string().email('Email invalido').required('Email é um campo requerido'),
    password: yup.string().required('Senha é um campo requerido').min(8, 'Senha deve ter no mínimo 8 caracteres'),
  })
  .required();
