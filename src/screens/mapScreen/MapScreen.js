import React, { useCallback, useEffect, useMemo } from 'react';
import I18n from 'react-native-i18n';
import { Marker } from 'react-native-maps';
import {
  AppButton, AppNavigation, AppView
} from '../../common';
import colors from '../../common/defaults/colors';
import { Header } from '../../components';
import LocationButton from '../../components/LocationButton';
import Map from '../../components/map/Map';
import MyLocationBtn from '../../components/map/MyLocationBtn';
import useLocation from '../../components/useLocation';
import styles from './styles';

const mapRef = React.createRef();
let currentMarkerLocation = null;
const MapScreen = ({onConfirm, initialLocation, hideConfirm}) => {
  console.log('initialLocation', initialLocation);
  const {location, error} = useLocation();
  const showConfirm = useMemo(() => {
    return !hideConfirm && location;
  }, [location, hideConfirm]);
  const onPressConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm(currentMarkerLocation || location);
    }
    AppNavigation.pop();
  }, [onConfirm, location]);
  useEffect(() => {
    if (location && mapRef)
      mapRef.current.animateToLocation(
        initialLocation ? initialLocation : location,
      );
  }, [location]);

  return (
    <AppView flex stretch backgroundColor={colors.bg}>
      <Header title={I18n.t('mapAddress')} size={8} />
      {/* <AppButton transparent paddingHorizontal={5} onPress={AppNavigation.pop}>
        <AppIcon flip color="black" name="md-arrow-back" type="ion" size={12} />
      </AppButton> */}
      <MyLocationBtn
        onPress={() => {
          mapRef.current.animateToLocation(location);
        }}
      />
      <Map
        ref={mapRef}
        location={initialLocation ? initialLocation : location}
        renderProps={region => {
          currentMarkerLocation = region;
          return (
            <AppView>
              <Marker coordinate={region} anchor={{x: 0.5, y: 0.5}} />
            </AppView>
          );
        }}
      />

      {showConfirm && !error && (
        <AppButton
          title={I18n.t('Continue')}
          onPress={onPressConfirm}
          linearGradient
          style={styles.confirmButton}
        />
        // <TouchableView
        //   onPress={onPressConfirm}
        //   center
        //   borderRadius={7}
        //   height={7}
        //   style={styles.confirmButton}
        //   stretch
        //   backgroundColor="primary">
        //   <AppText color="white">{I18n.t('Continue')}</AppText>
        // </TouchableView>
      )}
      <LocationButton {...{error}} />
    </AppView>
  );
};
export default MapScreen;
