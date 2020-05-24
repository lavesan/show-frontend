import * as yup from 'yup';

import { cpfReg, onlyCharReg, onlyNumberReg } from '../../helpers/validations.helpers';

export const registerValidations = yup.object().shape({
    name: yup.string().matches(onlyCharReg).required(),
    email: yup.string().email().required(),
    data: yup.string().nullable(),
    tel1: yup.string().matches(onlyNumberReg).required(),
    tel2: yup.string().matches(onlyNumberReg).required(),
    address1: yup.string().required(),
    complement: yup.string().required(),
    city: yup.string().matches(onlyCharReg).required(),
    state: yup.string().matches(onlyCharReg).required(),
    cep: yup.string().matches(onlyNumberReg).required(),
    country: yup.string().required(),
    nameWhoReceives: yup
        .string()
        .nullable()
        .when("equalAddress", {
            is: false,
            then: yup.string().matches(onlyCharReg).required()
        }),
    addressWhoReceives: yup
        .string()
        .nullable()
        .when("equalAddress", {
            is: false,
            then: yup.string().required()
        }),
    cpfSent: yup
      .string()
      .nullable()
      .when("equalAddress", {
            is: false,
            then: yup.string().matches(cpfReg).required()
      }),
    address2: yup
      .string()
      .when("equalAddress", {
            is: false,
            then: yup.string().required()
      }),
    complement2: yup
      .string()
      .when("equalAddress", {
            is: false,
            then: yup.string().required()
      }),
    state2: yup
        .string()
        .when("equalAddress", {
            is: false,
            then: yup.string().required()
        }),
    city2: yup
      .string()
      .when("equalAddress", {
        is: false,
        then: yup.string().required()
      }),
    cep2: yup
      .string()
      .when("equalAddress", {
        is: false,
        then: yup.string().required()
      }),
    country2: yup
      .string()
      .when("equalAddress", {
        is: false,
        then: yup.string().required()
      }),
    product: yup.string().required(),
    productLink: yup.string().required(),
    quantity: yup.string().matches(onlyNumberReg).required(),
    aditionalInformation: yup.string().required(),
    service: yup.string().matches(onlyNumberReg).required(),
    paymentOptions: yup.string().matches(onlyNumberReg).required(),
    aditionalInstructions: yup.string(),
  })
