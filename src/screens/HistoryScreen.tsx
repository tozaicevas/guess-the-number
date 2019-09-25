import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme, Layout } from '../constants/index';
import { SingleGuess } from '../types/index';
import Svg, { Path } from 'react-native-svg';
import { getHistory } from '../helpers/HistoryRepository';
import { withNavigation } from 'react-navigation';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from 'rn-placeholder';

interface Section {
  answer: string;
  history: SingleGuess[];
  timestamp: Date;
}

const SvgBull = () => (
  <Svg width={17} height={17} viewBox="0 0 512 512">
    <Path
      d="M73.27 0h2.86c2.15.73 4.79 1.65 5.47 4.11.96 3.18-1.14 6.12-2.85 8.59-7.6 10.16-13.92 21.22-19.37 32.65-4.6 10.06-8.61 20.64-9.47 31.75-.56 9.69.87 20.11 6.97 27.99 6.26 8.25 16.22 12.52 25.93 15.22 23.09 6.27 47.14 7.96 70.99 8.22-4.53 14.97-10.79 29.36-18.26 43.09-1.56 2.61-2.56 6.21-5.88 7.06-10.15 3.77-20.24 7.71-30.35 11.55-2.3 1.01-4.81.54-7.19.17-15.9-2.83-32.04-5.43-47.02-11.74-12.37-5.15-23.15-14.18-30.05-25.71-9.39-15.44-12.38-34.19-10.46-52.01 1.36-13.58 6.49-26.48 12.87-38.43C29.9 39.91 47.84 20.99 66.5 3.44 68.36 1.64 70.75.51 73.27 0zM436.2 0h2.53c5.59.9 8.97 5.82 12.94 9.33 21.87 21.2 42.57 45.28 52.18 74.7 6.25 20.01 5.6 42.45-3.04 61.67-6 13.42-16.7 24.72-29.97 31.12-15.28 7.43-32.23 10.25-48.82 13.18-3.07.46-6.31 1.49-9.33.25-9.69-3.65-19.29-7.53-29.03-11.03-1.8-.69-3.9-1.27-4.76-3.19-8.53-15.03-15.73-30.88-20.69-47.45 20.69-.31 41.49-1.56 61.75-6.02 9.98-2.15 20.23-4.86 28.56-11.03 6.13-4.47 10.54-11.17 12.31-18.54 2.84-11.57 1.04-23.76-2.99-34.82-5.53-15.38-13.49-29.85-22.93-43.16-2.07-3.06-5.21-6.11-4.75-10.12.33-3.01 3.44-4.32 6.04-4.89zM213.42 112.59c12.61-2.93 25.78-4.43 38.62-2.17 2.93.57 5.92.39 8.84-.14 9.98-1.67 20.2-1 30.11.75 10.45 1.78 20.57 5.26 31.11 6.53 4.89.68 10.48-.68 14.62 2.69 3.25 2.23 4.26 6.22 5.26 9.79 5.65 20.58 14.78 40.05 25.48 58.46.86 1.88 2.69 2.85 4.56 3.48 21.9 7.92 43.41 16.99 65.82 23.41 12.41 3.45 25.19 6.28 38.14 5.92 5.69-.3 11.65-.67 16.75-3.49 3.9-2.21 9.8-2.07 12.59 1.84 2.16 2.74 2.07 6.82-.04 9.57-13.44 18.68-26.93 37.5-43.18 53.9-11.8 11.74-25.13 22.75-41.17 28.03-10.98 3.81-23.11 3.54-34.04-.3-4.13 8.49-9.68 16.16-15.41 23.62-12.59 18.31-16.4 40.91-18.7 62.57-.69 9.35-1.81 18.73-1.6 28.1 1.48 3.53 3.84 6.64 5.13 10.26 6.3 15.48 3.79 34.16-6.55 47.32-10.96 14.71-28.18 24.91-46.64 25.98-5.39.68-10.85-1.13-16.17.19-8.31 2-16.87 2.63-25.38 3.1h-11.02c-8.54-.47-17.13-1.07-25.47-3.09-3.29-.92-6.7-.45-10.05-.22-15.05 1.06-30-4.71-41.59-14.13-11.15-8.96-19.55-22.01-20.96-36.44-1.18-10.61 1.46-21.51 7.16-30.51 1.89-2.5 1.19-5.7 1.1-8.59-1.08-19.66-2.6-39.51-8.16-58.5-3.15-10.58-7.74-20.88-14.67-29.55-5.01-6.22-9.22-13.05-12.85-20.16-7.73 2.63-16.02 3.87-24.15 2.64-14.93-2.07-28.19-10.25-39.58-19.74-21.66-18.28-38.07-41.66-54.61-64.43-3.79-4.52-.63-12.27 5.29-12.72 5.04-1.11 9.04 2.88 13.79 3.62 14.58 2.78 29.49.06 43.67-3.53 24.09-6.38 47.04-16.22 70.45-24.65 1.59-.62 3.4-1.23 4.21-2.9 11.07-18.89 20.44-38.94 26.13-60.13.89-3.49 2.39-7.1 5.57-9.1 3.86-2.83 8.86-1.76 13.3-2.24 8.26-.75 16.2-3.37 24.29-5.04m-21.8 28.96c-4.81 15.88-11.4 31.18-19.09 45.87-9.75 18.26-21.18 35.54-32.04 53.14-2.81 4.41-5.01 9.31-5.59 14.55-1.1 9.11 2.14 17.93 4.68 26.52 3.59 12.17 8.82 24 16.73 34 8.3 10.23 14.17 22.24 18.19 34.73 5.94 18.51 8.26 37.94 9.53 57.27 4.7-1.35 9.92-3.56 14.71-1.33 5.91 2.36 9 9.78 6.35 15.61-1.6 4.2-5.75 6.76-10.05 7.46-11.86 2.47-20.2 14.83-18.7 26.74.72 8.01 6.11 14.56 12.01 19.59 7.79 6.65 18.35 10.26 28.59 8.9 9.8-1.2 19.32-4.08 29.16-4.99 10.38-1.25 20.88-.31 31.09 1.73 8.18 1.61 16.39 3.84 24.8 3.4 10.87-.69 20.97-6.77 27.72-15.15 5.07-6.21 7.45-14.77 5.22-22.59-2.17-8.95-9.87-16.14-18.89-17.87-3.75-.59-7.12-2.99-8.78-6.41-3.05-5.6-.6-13.29 5.14-16.07 4.94-2.73 10.59-.49 15.55.97 1.96-28.83 5.97-58.95 21.81-83.83 3.44-5.46 7.87-10.23 11.2-15.77 7.31-11.58 11.13-24.88 14.83-37.94 1.56-5.52 2.16-11.42.9-17.06-1.57-6.83-5.25-12.92-9.03-18.73-18.78-29.19-37.43-59.11-47.3-92.68-17.86-2.1-35.07-9.92-53.33-8.01-4.72.2-9.36 2.4-14.1 1.28-5.55-1.16-11.22-1.85-16.9-1.49-15.13.74-29.41 6.5-44.41 8.16m-137.9 94.72c20.3 4.88 41.79 4.24 61.98-.84 4.51-7.52 9.07-15.09 13.84-22.49-24.76 9.25-49.56 19.21-75.82 23.33m328.72-23.36c4.48 7.49 9.67 14.59 13.42 22.49 20.35 5.02 41.96 5.86 62.4.84-26.27-4.07-51.08-14.03-75.82-23.33M41.43 249.24c12.17 15.12 25.2 30.13 41.89 40.41 10.5 6.49 23.56 10.09 35.67 6.19-3.32-11.17-7.76-22.25-8.29-34.03-8.51-.46-17.02-1.42-25.33-3.34-1.88-.42-3.36-1.72-4.86-2.84-13.25-.23-26.51-2.12-39.08-6.39m390.04 6.38c-1.67 1.26-3.39 2.63-5.51 3.01-8.13 1.86-16.46 2.69-24.76 3.2-.29 11.81-4.92 22.83-8.23 34.01 11.61 3.69 24.2.66 34.4-5.46 17.29-10.23 30.64-25.67 43.14-41.11-12.57 4.19-25.8 6.18-39.04 6.35zm-262.15-16.54c-.92-4.56 2.95-9.33 7.63-9.23 15.66-.51 31.61 3.6 44.57 12.55 7.36 4.89 13.34 11.46 18.94 18.23 2.5-.87 5.03-1.68 7.56-2.47.03-4.05-.4-8.14.33-12.14 1.36-5.54 9.2-7.71 13.14-3.54 4.11 4.14 2.01 10.52 2.56 15.71 2.53.8 5.05 1.61 7.56 2.46 9.23-12.11 21.58-22.12 36.16-26.91 9.07-2.89 18.7-4.44 28.23-3.8 5.99.51 9.01 8.66 4.86 13-3.13 3.92-8.54 2.5-12.87 2.99-16.36.81-31.92 9.24-41.85 22.21-3.3 3.65-5.3 10.01-11.18 9.87-6.51-1.07-12.63-3.83-18.98-5.6-5.61 1.67-11.1 3.73-16.74 5.28-3.47 1.12-7.26-.58-9.11-3.61-5.82-8.77-13.33-16.67-22.73-21.6-8.99-4.9-19.34-6.83-29.51-6.75-4.04.4-7.98-2.64-8.57-6.65zm-17.17 26.18c7.62-3.29 16.33-3.05 24.35-1.56 12.38 2.81 24.82 8.98 31.95 19.88 6.89 10.58 12.17 22.33 14.22 34.85 1.12 6.83 2.04 13.73 2.23 20.66.13 4.24-3.72 8.02-7.94 7.92-4.3.18-8.02-3.73-7.96-7.97-.65-9.98-1.94-19.96-5.01-29.52-8.58 2.63-18.09 1.88-25.96-2.53-11.76-6.45-20.93-17.49-25.57-30.03-1.06-3.66-2.72-8.31-.31-11.7zm161.33 8.02c12.67-8.83 29.29-13.36 44.41-8.83 4.3.84 3.11 6.33 2.53 9.44-3.4 12.59-12.07 23.44-22.67 30.85-8.53 6.04-19.73 7.98-29.73 4.8-3.12 9.49-4.41 19.45-5 29.4.05 4.33-3.73 8.21-8.1 8.09-4.63.08-8.49-4.47-7.83-9.03.88-13.94 2.74-28.21 8.91-40.91 4.43-8.79 9.07-18.13 17.48-23.81zM191 443.06c3.86-2.68 8.9-2.69 13.31-1.69 8.86 2.02 16.57 7.19 23.66 12.67 2.54 2.08 5.62 4.37 5.8 7.96.59 4.42-3.26 8.75-7.72 8.68-2.62.2-4.81-1.41-6.7-3.01-2.77-2.37-5.77-4.45-8.78-6.51-.34 2.2-.4 4.66-1.98 6.41-2.2 2.78-6.32 3.74-9.52 2.19-5.62-2.37-10.84-6.77-12.65-12.78-1.62-4.99.23-10.93 4.58-13.92zm115.97-1.53c4.63-1.03 10.03-1.33 14.07 1.59 4.31 2.99 6.13 8.9 4.5 13.85-2.07 6.66-8.2 11.49-14.69 13.46-5.37 1.05-9.83-4.1-9.45-9.25-3.63 2.39-7.04 5.06-10.4 7.8-3.54 3.08-9.58 1.79-11.77-2.28-2.08-3.38-1.06-8.03 2.07-10.38 7.51-6.45 15.98-12.27 25.67-14.79z"
      fill={Theme.colors.primary}
    />
  </Svg>
);

const LoadingPlaceholder: React.FC = () => {
  return (
    <>
      {Array(20).fill(
        <Placeholder
          style={styles.icon}
          Animation={ShineOverlay}
          Left={PlaceholderMedia}
        >
          <PlaceholderLine width={'90%'} />
          <PlaceholderLine width={'90%'} />
        </Placeholder>,
      )}
    </>
  );
};

const renderSingleGuess = (guess: SingleGuess, index: number) => {
  return (
    <View style={[styles.singleGuessContainer, styles.singleGuess]} key={index}>
      <Text style={styles.historyText}>{guess.input}</Text>
      <View style={styles.guessInfo}>
        <Text style={styles.bullsCowsText}>{guess.bulls}</Text>
        <SvgBull />
        <Text style={styles.bullsCowsText}>{guess.cows}</Text>
        <MaterialCommunityIcons
          name="cow"
          color={Theme.colors.secondaryShadow}
          size={19}
        />
      </View>
    </View>
  );
};

class HistoryScreen extends React.Component {
  public state = {
    activeSections: [],
    collapsed: true,
    guesses: [],
    isLoading: true,
  };

  public componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('willFocus', async () => {
      this.setState({
        isLoading: true,
      });
      const history = await getHistory();
      const historyJson = JSON.parse(history);
      this.setState({ guesses: historyJson.reverse(), isLoading: false });
    });
  }

  public setSections = (sections: Section[]) => {
    this.setState({
      activeSections: sections,
    });
  }

  public renderHeader = (section: Section, _: any, isActive: boolean) => {
    const timestampSplit = section.timestamp.split('T');
    const timestamp = `${timestampSplit[0]} ${timestampSplit[1].split('.')[0]}`;
    return (
      <View style={[styles.header, isActive ? styles.active : styles.inactive]}>
        <View style={styles.horizontalLayout}>
          <View style={styles.icon}>
            {this.getIcon(section.history.length)}
          </View>
          <View>
            <Text style={styles.headerText}>{section.answer}</Text>
            <Text style={styles.dateText}>{timestamp}</Text>
          </View>
        </View>
      </View>
    );
  }

  public renderContent(section: Section, _: any, isActive: boolean) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        {section.history.map((singleGuess, index) =>
          renderSingleGuess(singleGuess, index),
        )}
      </Animatable.View>
    );
  }

  public render() {
    const { activeSections, guesses, isLoading } = this.state;

    return isLoading ? (
      <View style={styles.container}>
        <LoadingPlaceholder />
      </View>
    ) : (
      <View style={styles.container}>
        <ScrollView>
          <Accordion
            activeSections={activeSections}
            sections={guesses}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
      </View>
    );
  }

  private getIcon = (guessCount: number) => {
    if (guessCount < 10) {
      return (
        <MaterialCommunityIcons
          name={`numeric-${guessCount}-box-multiple-outline`}
          size={24}
        />
      );
    }
    if (guessCount < 1 || guessCount > 99) return null;
    return (
      <>
        <MaterialCommunityIcons
          name={`numeric-${Math.floor(guessCount / 10)}-box-multiple-outline`}
          size={24}
        />
        <MaterialCommunityIcons
          name={`numeric-${guessCount % 10}-box-multiple-outline`}
          size={24}
        />
      </>
    );
  }
}

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  header: ViewStyle;
  headerText: TextStyle;
  content: ViewStyle;
  active: ViewStyle;
  inactive: ViewStyle;
  dateText: TextStyle;
  historyText: TextStyle;
  singleGuess: ViewStyle;
  bullsCowsText: TextStyle;
  horizontalLayout: ViewStyle;
  icon: ViewStyle;
  guessInfo: ViewStyle;
  singleGuessContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    paddingTop: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
  },
  header: {
    height: 56,
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '400',
  },
  content: {
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '200',
    color: Theme.colors.gray,
  },
  historyText: {
    fontSize: 18,
    color: 'white',
  },
  singleGuess: {
    backgroundColor: Theme.colors.tertiary,
    borderRadius: Theme.sizes.radius,
    padding: Layout.height * 0.007,
    margin: Layout.width * 0.02,
  },
  bullsCowsText: {
    color: Theme.colors.white,
  },
  horizontalLayout: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.colors.white,
  },
  icon: {
    flexDirection: 'row',
    paddingLeft: 6,
    marginRight: 16,
  },
  guessInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 4,
  },
  singleGuessContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default withNavigation(HistoryScreen);
