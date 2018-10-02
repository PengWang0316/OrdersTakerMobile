import { StyleSheet } from 'react-native';

import Theme from '../../Theme';

export default StyleSheet.create({
  internalContainer: {
    width: '75%',
  },
  inputView: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    color: Theme.primary.main,
  },
  buttonView: {
    marginTop: 30,
  },
  registerBtn: {
    backgroundColor: Theme.primary.main,
    borderRadius: 15,
  },
});
