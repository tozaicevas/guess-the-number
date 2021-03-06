import { Animated, TouchableOpacity } from 'react-native';
import { SCREEN_FEEDBACK, SCREEN_HELP, SCREEN_TUTORIAL } from './Screens';

const FOOTBAR_ICON_SIZE = 30;
const MIDDLE_BUTTON_SIZE = 70;
const SUB_BUTTON_SIZE = 40;
const AUTO_CLOSE_MORE_BUTTON = 15 * 1000;
const ANIMATION_LENGTH = 1500;
const FOOTBAR_HEIGHT = 50;
const HIDDEN_SCREENS_IN_TAB_BAR = [SCREEN_FEEDBACK, SCREEN_HELP];
const SCREENS_WITH_HIDDEN_TAB_BAR = [SCREEN_TUTORIAL];
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export { FOOTBAR_ICON_SIZE, MIDDLE_BUTTON_SIZE, SUB_BUTTON_SIZE, AUTO_CLOSE_MORE_BUTTON, ANIMATION_LENGTH, FOOTBAR_HEIGHT, HIDDEN_SCREENS_IN_TAB_BAR, SCREENS_WITH_HIDDEN_TAB_BAR, AnimatedTouchable };
