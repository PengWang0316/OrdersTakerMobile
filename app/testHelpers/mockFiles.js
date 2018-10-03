jest.mock('react-native-elements', () => ({
  Divider: () => 'Divider',
  Button: () => 'Button',
  Icon: () => 'Icon',
  Input: () => 'Input',
}));
jest.mock('@kevinwang0316/react-native-snackbar-component', () => 'Snackbar');

jest.mock('../components/LoginForm', () => 'LoginForm');
jest.mock('../components/SocialLoginPanel', () => 'SocialLoginPanel');
jest.mock('../components/LoginPanel', () => 'LoginPanel');
jest.mock('../components/RegisterPanel', () => 'RegisterPanel');
jest.mock('../components/DarkerStatusBar', () => 'DarkerStatusBar');
// jest.mock('../screens/SafeAreaScreen', () => 'SafeAreaScreen');

// jest.mock('../actions/UserActions', () => ({ checkUsernameAvailable: jest.fn().mockReturnValue(Promise.resolve(true)) }));
