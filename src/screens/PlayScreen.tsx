import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import SwipeablePanel from 'rn-swipeable-panel';
import History from '../components/Play/History';
import Input from '../components/Play/Input';
import CustomKeyboard from '../components/Play/Keyboard';
import CustomText from '../components/Text';
import { Layout, MAX_DIGITS, Theme } from '../constants/index';
import { InputState } from '../constants/Screens';
import { updateHistory } from '../helpers/HistoryRepository';
import { getBulls, getCows, getRandomAnswer } from '../helpers/InputManipulation';
import { KeyType, SingleGuess } from '../types/index';

const INPUT_LINE_WIDTH = 0.17;

interface PlayScreenState {
  inputState: InputState;
  input: string;
  answer: string;
  guesses: SingleGuess[];
  isNotesActive: boolean;
  notes: string;
}

interface PlayScreenNavigationProps {
  refreshScreen: () => void;
  provideAnswer: () => void;
  getInputState: () => InputState;
  toggleNotes: () => void;
}

class PlayScreen extends React.Component<
  NavigationScreenProps<PlayScreenNavigationProps>,
  PlayScreenState
  > {
  public static getEmptyState = () => {
    const answer = getRandomAnswer();
    return {
      answer,
      input: '',
      inputState: InputState.VALID,
      guesses: [],
      isNotesActive: false,
      notes: '',
    };
  }

  public state = PlayScreen.getEmptyState();

  public refreshState = () => this.setState(PlayScreen.getEmptyState());

  public provideAnswer = () => {
    const { answer } = this.state;
    this.setState({ input: answer, inputState: InputState.PROVIDED_ANSWER });
  }

  public componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      refreshScreen: this.refreshState,
      provideAnswer: this.provideAnswer,
      getInputState: this.getInputState,
      toggleNotes: this.toggleNotes,
    });
  }

  public getInputState = () => this.state.inputState;

  public toggleNotes = () => this.setState({ isNotesActive: true });

  public handleNumberPress = (key: [KeyType, string]) => {
    const { input } = this.state;
    if (
      input.length < MAX_DIGITS &&
      new Set(input + key[1]).size === input.length + 1
    ) {
      this.setState({
        input: input + key[1],
        inputState: InputState.VALID,
      });
    }
  }

  public handleDeletePress = () => {
    const { input, inputState } = this.state;
    this.setState({
      input: input.slice(0, input.length - 1),
      inputState:
        input.length > 0 && inputState === InputState.INVALID
          ? InputState.VALID
          : inputState,
    });
  }

  public handleCheckPress = () => {
    const { input, answer, guesses } = this.state;
    if (input.length === MAX_DIGITS) {
      const bulls = getBulls(input, answer);
      const cows = getCows(input, answer);
      const guess = { input, bulls, cows };
      const correctAnswer = bulls === MAX_DIGITS;
      const updatedGuesses = [...guesses, guess];
      if (correctAnswer) {
        Alert.alert('Congratulations!', 'You can restart by using middle button at the bottom.');
        updateHistory(updatedGuesses, answer);
      }
      this.setState({
        guesses: updatedGuesses,
        input: correctAnswer ? input : '',
        inputState: correctAnswer ? InputState.CORRECT_ANSWER : InputState.VALID,
      });
    } else this.handleInvalidInput();
  }

  public handleInvalidInput = () => {
    this.setState({ inputState: InputState.INVALID });
  }

  public onKeyboardPress = (key: [KeyType, string]) => {
    const { params } = this.props.navigation.state;
    params && params.onKeyboardPress && params.onKeyboardPress();
    if (key[0] === KeyType.Number) {
      this.handleNumberPress(key);
    } else if (key[0] === KeyType.Delete) {
      this.handleDeletePress();
    } else if (key[0] === KeyType.Check) this.handleCheckPress();
  }

  public render() {
    const { input, guesses, inputState, isNotesActive, notes } = this.state;
    const { params } = this.props.navigation.state;
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          params && params.onKeyboardPress && params.onKeyboardPress()
        }
      >
        <View style={styles.container}>
          <View style={styles.guessCounter}>
            <Text>{guesses.length}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input value={input} inputState={inputState} />
          </View>
          <LinearGradient
            colors={['#6191FF', '#4439A7']}
            start={[0.1, 0.1]}
            end={[1, 1]}
            style={styles.historyGradient}
          >
            <View style={styles.historyContainer}>
              <History guesses={guesses} />
            </View>
          </LinearGradient>
          <View style={styles.keyboardContainer}>
            <CustomKeyboard
              onPress={key => this.onKeyboardPress(key)}
              disabledKeys={input}
              inputState={inputState}
            />
          </View>
          <SwipeablePanel
            onClose={() => this.setState({ isNotesActive: false })}
            onPressCloseButton={() => this.setState({ isNotesActive: false })}
            isActive={isNotesActive}
          >
            <CustomText
              bold
              h1
              style={{ marginLeft: '5%', marginBottom: '5%' }}
            >
              {'Notes'}
            </CustomText>
            <TextInput
              style={styles.notesInput}
              value={notes}
              multiline
              placeholder={"Don't tell me you don't like burritos"}
              onChangeText={text => this.setState({ notes: text })}
            />
          </SwipeablePanel>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

interface Style {
  container: ViewStyle;
  underlineStyle: ViewStyle;
  inputContainer: ViewStyle;
  historyGradient: ViewStyle;
  historyContainer: ViewStyle;
  keyboardContainer: ViewStyle;
  guessCounter: ViewStyle;
  notesInput: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  guessCounter: {
    position: 'absolute',
    marginTop: Constants.statusBarHeight + 8,
    left: Layout.width - (32 + 12),
    borderRadius: 100,
    width: 32,
    height: 32,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underlineStyle: {
    width: Layout.width * INPUT_LINE_WIDTH,
    height: Layout.width * 0.01,
    backgroundColor: Theme.colors.black,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20%',
    alignSelf: 'center',
  },
  historyGradient: {
    height: 50,
    width: '95%',
    borderRadius: Theme.sizes.radius,
    alignSelf: 'center',
  },
  historyContainer: {
    flex: 1,
    borderRadius: Theme.sizes.radius,
  },
  keyboardContainer: {
    marginTop: '3%',
    paddingBottom: '12%',
  },
  notesInput: {
    height: Layout.height * 0.6,
    marginLeft: '5%',
    marginRight: '5%',
    textAlignVertical: 'top',
  },
});

export default PlayScreen;
