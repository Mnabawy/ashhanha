import React, { Component, useCallback } from 'react';
import { AppButton, AppForm, AppImage, AppInput, AppNavigation, AppSpinner, AppText, AppTextArea, AppView } from '../../common';
import I18n from 'react-native-i18n';
import { validateContactUs } from '../../validation/contactUs';
import { useSelector } from 'react-redux';
import { ContactUsRepo } from '../../repo';
const message = require('../../assets/imgs/message.png');

const contactUsRepo = new ContactUsRepo();
const Form = () => {
    const user = useSelector((state) => state.auth.userData?.user);
    const renderContent = useCallback(
        ({ injectFormProps, isSubmitting, setFieldValue, handleSubmit }) => {
            return (
                <AppView stretch flex center>
                    <AppImage equalSize={40} source={message} resizeMode={'contain'} />
                    <AppText bold marginBottom={5}>
                        {I18n.t('hearFromYou')}
                    </AppText>
                    <AppInput
                        marginVertical={5}
                        {...injectFormProps('name')}
                        placeholder={I18n.t('name')}
                    />
                    <AppInput
                        phone
                        {...injectFormProps('mobile')}
                        placeholder={I18n.t('phone')}
                    />
                    <AppInput
                        email
                        marginVertical={5}
                        {...injectFormProps('email')}
                        placeholder={I18n.t('email')}
                    />
                    <AppTextArea
                        {...injectFormProps('message')}
                        placeholder={I18n.t('message')}
                        // onChange={(name,text) => {
                        //     console.log("name,text ",name,text.trim())
                        //     setFieldValue('message', text.trim())}}
                    />
                    <AppButton
                        linearGradient
                        processing={isSubmitting}
                        disabled={isSubmitting}
                        onPress={handleSubmit}
                        stretch
                        title={I18n.t('send')}
                        marginTop={10}>
                    </AppButton>
                </AppView>
            );
        },
        [],
    );
    const onSubmit = useCallback(async (values, { setSubmitting, resetForm }) => {
        const res = await contactUsRepo.send(values);
        if (res) {
            AppNavigation.pop();
        }
        setSubmitting(false);
    }, []);

    return (
        <AppView flex stretch marginVertical={5}>
            <AppForm
                validationSchema={validateContactUs}
                schema={{
                    name: user?.name || '',
                    mobile: user?.phone || '',
                    email: user?.email || '',
                    message: '',
                }}
                render={renderContent}
                {...{ onSubmit }}
            />
        </AppView>
    );
};

export default Form;
