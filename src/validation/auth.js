import * as yup from 'yup';
import I18n from 'react-native-i18n';
const regexAcceptOneSpace = /^\s?\S+(?: \S+)*\s?$/;
const regexNoSpaces = /^\S*$/;
const regexAcceptOneNumber = /^(?=.*\d)/;
const regexAcceptNumbersOnly = /^[0-9]*$/;
const resgexAcceptOneSpecialCharacter = /[^A-Za-z0-9]/;// /^(?=.*[@#$%^&+=]).*$/
const resgexAcceptOneUpperCase = /^(?=.*[A-Z])/
const resgexAcceptOneLowerCase = /^(?=.*[a-z])/

export const validateSignIn = (values) =>
  yup.object().shape({
    phone: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .test('phone', I18n.t('validation-phone-error-unvalid'), () =>
        Number.isInteger(+values.phone)
        && ((values.phone).startsWith("05"))
      )
      .min(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`)
      .max(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`),

    password: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexNoSpaces, `${I18n.t('noSpaces')}`)
      .matches(regexAcceptOneNumber, `${I18n.t('containNumber')}`)
      .matches(resgexAcceptOneSpecialCharacter, `${I18n.t('specialCharacter')}`)
      .matches(resgexAcceptOneUpperCase, `${I18n.t('capitalLetter')}`)
      .matches(resgexAcceptOneLowerCase, `${I18n.t('lowercaseLetter')}`)
      .min(8, `${I18n.t('mustBeAtleast')} 8 ${I18n.t('char')}`),
  });
export const validateForgetPassword = (values) =>
  yup.object().shape({
    phone: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .test('phone', I18n.t('validation-phone-error-unvalid'), () =>
        Number.isInteger(+values.phone)
        && ((values.phone).startsWith("05"))
      )
      .min(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`)
      .max(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`),
  });

export const validateForgotPassword = (values) =>
  yup.object().shape({
    phone: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .test('phone', I18n.t('validation-phone-error-unvalid'), () =>
        Number.isInteger(+values.phone)
        && ((values.phone).startsWith("05"))
      )
      .min(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`)
      .max(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`),
  });

export const validatePhone = (values) =>
  yup.object().shape({
    phone: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptNumbersOnly, `${I18n.t('integerNumbers')}`)
      .test('phone', I18n.t('validation-phone-error-unvalid'), () =>
        Number.isInteger(+values.phone)
        && ((values.phone).startsWith("05"))
      )
      .min(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`)
      .max(10, `${I18n.t('mustBe')} 10 ${I18n.t('numbers')}`),
  });

export const validateEmail = (values) =>
  yup.object().shape({
    email: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .email(`${I18n.t('email')} ${I18n.t('invalid')}`),
  });

export const validateSignUp = (values) =>
  yup.object().shape({
    name: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexAcceptOneSpace, `${I18n.t('invalid')}`)
      .min(3, `${I18n.t('mustBeAtleast')} 3 ${I18n.t('char')}`)
      .max(100, `${I18n.t('mustBeAtmost')} 100 ${I18n.t('char')}`),

    email: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .email(I18n.t('invalid'))
      .min(10, `${I18n.t('mustBeAtleast')} 10 ${I18n.t('char')}`)
      .max(75, `${I18n.t('mustBeAtmost')} 75 ${I18n.t('char')}`),
    new_password: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexNoSpaces, `${I18n.t('noSpaces')}`)
      .matches(regexAcceptOneNumber, `${I18n.t('containNumber')}`)
      .matches(resgexAcceptOneSpecialCharacter, `${I18n.t('specialCharacter')}`)
      .matches(resgexAcceptOneUpperCase, `${I18n.t('capitalLetter')}`)
      .matches(resgexAcceptOneLowerCase, `${I18n.t('lowercaseLetter')}`)
      .min(8, `${I18n.t('mustBeAtleast')} 8 ${I18n.t('char')}`),
    new_password_confirmation: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexNoSpaces, `${I18n.t('noSpaces')}`)
      .matches(regexAcceptOneNumber, `${I18n.t('containNumber')}`)
      .matches(resgexAcceptOneSpecialCharacter, `${I18n.t('specialCharacter')}`)
      .matches(resgexAcceptOneUpperCase, `${I18n.t('capitalLetter')}`)
      .matches(resgexAcceptOneLowerCase, `${I18n.t('lowercaseLetter')}`)
      .oneOf([values.new_password, ''], I18n.t('confirmPasswordInvalid'))
      .min(8, `${I18n.t('mustBeAtleast')} 8 ${I18n.t('char')}`),
  });

export const validateResetPassword = (values) =>
  yup.object().shape({
    new_password: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexNoSpaces, `${I18n.t('noSpaces')}`)
      .matches(regexAcceptOneNumber, `${I18n.t('containNumber')}`)
      .matches(resgexAcceptOneSpecialCharacter, `${I18n.t('specialCharacter')}`)
      .matches(resgexAcceptOneUpperCase, `${I18n.t('capitalLetter')}`)
      .matches(resgexAcceptOneLowerCase, `${I18n.t('lowercaseLetter')}`)
      .min(8, `${I18n.t('mustBeAtleast')} 8 ${I18n.t('char')}`),
    new_password_confirmation: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexNoSpaces, `${I18n.t('noSpaces')}`)
      .matches(regexAcceptOneNumber, `${I18n.t('containNumber')}`)
      .matches(resgexAcceptOneSpecialCharacter, `${I18n.t('specialCharacter')}`)
      .matches(resgexAcceptOneUpperCase, `${I18n.t('capitalLetter')}`)
      .matches(resgexAcceptOneLowerCase, `${I18n.t('lowercaseLetter')}`)
      .oneOf([values.new_password, ''], I18n.t('confirmPasswordInvalid'))
      .min(8, `${I18n.t('mustBeAtleast')} 8 ${I18n.t('char')}`),
  });

export const validateChangePassword = (values) =>
  yup.object().shape({
    old_password: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexNoSpaces, `${I18n.t('noSpaces')}`)
      .matches(regexAcceptOneNumber, `${I18n.t('containNumber')}`)
      .matches(resgexAcceptOneSpecialCharacter, `${I18n.t('specialCharacter')}`)
      .matches(resgexAcceptOneUpperCase, `${I18n.t('capitalLetter')}`)
      .matches(resgexAcceptOneLowerCase, `${I18n.t('lowercaseLetter')}`)
      .min(8, `${I18n.t('mustBeAtleast')} 8 ${I18n.t('char')}`),
    new_password: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexNoSpaces, `${I18n.t('noSpaces')}`)
      .matches(regexAcceptOneNumber, `${I18n.t('containNumber')}`)
      .matches(resgexAcceptOneSpecialCharacter, `${I18n.t('specialCharacter')}`)
      .matches(resgexAcceptOneUpperCase, `${I18n.t('capitalLetter')}`)
      .matches(resgexAcceptOneLowerCase, `${I18n.t('lowercaseLetter')}`)
      .min(8, `${I18n.t('mustBeAtleast')} 8 ${I18n.t('char')}`),
    new_password_confirmation: yup
      .string()
      .required(I18n.t('validation-error-required'))
      .matches(regexNoSpaces, `${I18n.t('noSpaces')}`)
      .matches(regexAcceptOneNumber, `${I18n.t('containNumber')}`)
      .matches(resgexAcceptOneSpecialCharacter, `${I18n.t('specialCharacter')}`)
      .matches(resgexAcceptOneUpperCase, `${I18n.t('capitalLetter')}`)
      .matches(resgexAcceptOneLowerCase, `${I18n.t('lowercaseLetter')}`)
      .oneOf([values.new_password, ''], I18n.t('confirmPasswordInvalid'))
      .min(8, `${I18n.t('mustBeAtleast')} 8 ${I18n.t('char')}`),
  });