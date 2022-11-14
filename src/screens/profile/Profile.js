import React, { useCallback } from 'react';
import { LoadingView, ScrollableContainer } from '../../components';
import I18n from 'react-native-i18n';
import { AppButton, AppIcon, AppImage, AppNavigation, AppText, AppView, TouchableView } from '../../common';
import UserData from '../../components/profile/UserData';
import colors from '../../common/defaults/colors';
import useFetch from '../../components/useFetch';
import { AuthRepo } from '../../repo';

const authRepo = new AuthRepo();

const Profile = () => {
    const { isLoading, data } = useFetch(authRepo.getPrincipalUserProfileData);
    console.log("user data in profile ", data);
    
    const renderItem = useCallback((name, type, title, screen) => {
        return (
            <TouchableView flex stretch row backgroundColor={colors.white}
                padding={5} marginVertical={3} borderRadius={10}
                onPress={() => AppNavigation.push(screen)}
            >
                <AppView flex stretch row>
                    <AppIcon name={name} type={type} size={10} color={colors.graytext} />
                    <AppText marginHorizontal={5}>{I18n.t(title)}</AppText>
                </AppView>
                <AppIcon name='keyboard-arrow-left' type='MaterialIcons' size={10} reverse color={colors.black} />
            </TouchableView>
        );
    }, []);
    return (
        <ScrollableContainer
            title={I18n.t('myData')}
            center
            paddingHorizontal={5}
        >
            {isLoading || !data ?
                <LoadingView />
                :
                <>
                    <UserData />
                    <AppText size={8} marginTop={10}>{I18n.t('otherData')}</AppText>
                    {renderItem('home', 'Feather', 'myAddresses', 'MyAddresses')}
                    {renderItem('lock', 'SimpleLineIcons', 'password', 'ChangePassword')}
                </>
            }
        </ScrollableContainer>
    );
};

export default Profile;
