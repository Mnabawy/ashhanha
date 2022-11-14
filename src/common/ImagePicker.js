import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import AppImage from './Image';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PICKER_OPTIONS, PICKER_OPTIONS_AR} from './utils/Constants';
import AppView from './View';
import InputError from './micro/InputError';
import ImageResizer from 'react-native-image-resizer';
import {AppButton, AppIcon} from '.';
import ImagePickerModal from './ImagePickerModal';
import colors from './defaults/colors';
import I18n from 'react-native-i18n';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {showError} from './utils/localNotifications';

const ImagePicker = ({
  equalSize,
  backgroundColor,
  name,
  onChange,
  error,
  size,
  circleRadius,
  buttonToChangeImage,
  isDirty,
  initialValue,
  ...rest
}) => {
  const isShowError = useMemo(() => error && isDirty, [isDirty, error]);
  const [uri, setUri] = useState(initialValue || null);
  const ImagePickerModalRef = useRef();
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        // setPermissionGranted(!permissionGranted);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      console.log(
        '🚀 ~ file: ImagePicker.js ~ line 55 ~ checkCameraPermission ~ granted',
        granted,
      );
      if (granted) {
        console.log('check  => You can use the camera');
        // requestCameraPermission();
      } else {
        console.log('check  => Camera permission denied');
        // requestCameraPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     checkCameraPermission();
  //   }
  // }, []);

  const setImageUri = useCallback(
    imgUri => {
      setUri(imgUri);
      if (onChange) {
        onChange(name, imgUri);
      }
    },
    [name, onChange],
  );

  const _launchImageLibrary = useCallback(async () => {
    launchImageLibrary(PICKER_OPTIONS, response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert(
          'ImagePicker Error: ' +
            '\t' +
            response.error +
            '\t' +
            JSON.stringify(response.error),
        );
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('response  launchImageLibrary', response);
        resize(response?.assets[0]?.uri);
      }
    });
  }, [resize]);

  const _launchCamera = useCallback(async () => {
    console.log('xxxx _launchCamera');
    launchCamera(PICKER_OPTIONS, response => {
      console.log(' response ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert(
          'ImagePicker Error: ' +
            '\t' +
            response.error +
            '\t' +
            JSON.stringify(response.error),
        );
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('response launchCamera xxxxxxxxxx ', response);
        if (
          response &&
          response.errorCode &&
          response.errorCode === 'permission'
        ) {
          // setTimeout(() => {
          showError(I18n.t('allow-camera-permission'));
          // }, 100);
        } else {
          resize(response?.assets[0]?.uri);
        }
      }
    });
  }, [resize]);
  const pickImage = useCallback(async () => {
    ImagePickerModalRef.current.show();
  }, []);
  const resize = useCallback(
    unreizedUri => {
      setImageUri(unreizedUri);
      // ImageResizer.createResizedImage(unreizedUri, 5000, 5000, 'JPEG', 100, 0, undefined, false, { mode: 'contain' })
      //   .then(({ uri: resizedUri }) => {
      //     setImageUri(resizedUri);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     return Alert.alert(
      //       'Unable to resize the photo',
      //       // 'Check the console for full the error message',
      //     );
      //   });
    },
    [setImageUri],
  );
  return (
    <AppView stretch center row={buttonToChangeImage}>
      <AppImage
        center
        onPress={buttonToChangeImage ? undefined : pickImage}
        margin={1}
        elevation={2}
        borderRadius={5}
        {...(circleRadius ? {} : {equalSize})}
        source={{uri}}
        {...{circleRadius}}
        resizeMode="cover"
        {...{backgroundColor}}
        {...rest}>
        {!uri && (
          <AppIcon
            size={size}
            color="white"
            name="upload-cloud"
            type="Feather"
          />
        )}
      </AppImage>
      {buttonToChangeImage && (
        <AppView stretch bottom marginHorizontal={5}>
          <AppButton
            backgroundColor={colors.graytext}
            width={40}
            onPress={pickImage}
            title={I18n.t('editPhoto')}
          />
        </AppView>
      )}
      <ImagePickerModal
        ref={ImagePickerModalRef}
        onClosed={async v => {
          ImagePickerModalRef.current.hide();
          setTimeout(async () => {
            if (v === 1) {
              _launchImageLibrary();
            } else {
              // if (permissionGranted) _launchCamera();
              // else {
              // if (Platform.OS === 'android') {
              //   await requestCameraPermission();
              // }
              _launchCamera();
              // }
            }
          }, 1000);
        }}
      />
      {isShowError && <InputError error={error} size={7} />}
    </AppView>
  );
};

ImagePicker.defaultProps = {
  size: 7,
  equalSize: 8,
  backgroundColor: colors.bg,
};

export default ImagePicker;
