import React, { useCallback, useEffect, useState } from 'react';
import { AppForm, AppNavigation, showSuccess } from '../../common';
import { ScrollableContainer } from '../../components';
import Form from '../../components/EditProfile/Form';
import I18n from 'react-native-i18n';
import { useDispatch, useSelector } from 'react-redux';
import { validateUpdateUser } from '../../validation/updateUser';
import { AuthRepo } from '../../repo';

const authRepo = new AuthRepo();

const EditProfile = () => {
    const user = useSelector((state) => state.auth.userData?.user);

    const renderContent = useCallback(
        (props) => {
            return <Form {...props} />;
        },
        [],
    );

    const onSubmit = useCallback(
        async (values, { setSubmitting }) => {
            const res = await authRepo.updateUser(values);
            if (res?.user?.verification_code && values.phone !== user.phone) {
                console.log("--------------- 888 edit phone ", res.user.verification_code)
                AppNavigation.pop();
                setTimeout(() => {
                    AppNavigation.push({
                        name: 'verifyCode',
                        passProps: {
                            phone: values.phone,
                            testCode: res.user.verification_code,
                            onFinish: (code) => {
                                return onFinish(code, values);
                            },
                        },
                    });
                }, 1000);
            } else if (res) {
                AppNavigation.pop();
            }
            setSubmitting(false);
        },
        [],
    );

    const onFinish = useCallback(
        async (code, { phone }) => {
            console.log("code, { phone }", code, { phone })
            let promise = new Promise(async function (resolve, reject) {
                const res = await authRepo.verifyCodeUdatePhone({
                    code,
                });
                console.log(res, 'edit profile');
                if (res) {
                    await authRepo.setPrincipalUser(res.data);
                    console.log("+++++++++++++++++++000")
                    showSuccess(I18n.t('phoneChangedSuccessfully'));
                    console.log("*****************")
                    AppNavigation.navigateToScreen('Profile');
                    resolve(true);
                } else {
                    reject(new Error('Whoops!'));
                }
            });
            return promise;
        },
        [],
    );

    return (
        <ScrollableContainer
            flex stretch center
            paddingHorizontal={5}
            title={I18n.t('editProfile')}>
            <AppForm
                validationSchema={validateUpdateUser}
                schema={{
                    name: user?.name,
                    email: user?.email,
                    phone: user?.phone,
                    id_number: user?.id_number || '',
                }}
                render={renderContent}
                {...{ onSubmit }}
            />
        </ScrollableContainer>
    );
};

export default EditProfile;
