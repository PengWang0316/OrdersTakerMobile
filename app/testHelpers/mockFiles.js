jest.mock('react-native-elements', () => ({
  Divider: () => 'Divider',
  Button: () => 'Button',
  Icon: () => 'Icon',
  Input: () => 'Input',
}));

jest.mock('../components/LoginForm', () => 'LoginForm');
jest.mock('../components/SocialLoginPanel', () => 'SocialLoginPanel');
