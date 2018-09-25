import { StyleSheet } from 'react-native';
import Theme from '../../Theme';

export default StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    color: Theme.primary.main,
  },
  loginButton: {
    marginBottom: 15,
    borderRadius: 15,
  },
  facebookBtn: {
    backgroundColor: '#3B5998',
  },
  googleBtn: {
    backgroundColor: '#dd4b39',
  },
});
