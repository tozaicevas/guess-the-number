import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationInjectedProps } from 'react-navigation';
import { Theme } from '../constants/index';
import { ANIMATION_LENGTH } from '../constants/Navigation';
import { SCREEN_PLAY } from '../constants/Screens';
import { ChiliButtonStyles, Styles } from './Styles';

const styles = { ...ChiliButtonStyles, ...Styles };

const ChiliButton: React.FC<ChiliButtonProps> = ({ navigation, untoggle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate(SCREEN_PLAY, {
          onKeyboardPress: () => untoggle(),
        })
      }
    >
      <Animatable.View
        easing="ease-out"
        animation="tada"
        iterationCount="infinite"
        duration={ANIMATION_LENGTH}
        useNativeDriver={true}
        style={[
          styles.container,
          styles.shadow,
        ]}
      >
        <MaterialCommunityIcons
          size={48}
          style={styles.icon}
          active
          name="chili-mild"
          color={Theme.colors.white}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

interface ChiliButtonProps extends NavigationInjectedProps {
  untoggle: () => void;
}

export default ChiliButton;
