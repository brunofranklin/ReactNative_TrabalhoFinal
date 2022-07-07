import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181818'
  },

  containerLogo: {
    flex: 1,
    justifyContent: 'center'
  },

  /*
  logo: {
    width: 170,
    height: 195
  },
  */

  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 25
  },

  input: {
    backgroundColor: '#DFD8DB',
    width: 300,
    marginBottom: 15,
    color: 'black',
    fontSize: 22,
    borderRadius: 7,
    padding: 10
  },

  buttonSubmit: {
    backgroundColor: '#FE7700',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },

  submitText: {
    color: '#FFF',
    fontSize: 19
  },

  buttonRegister: {
    marginTop: 10
  },

  registerText: {
    color: '#FFF'
  }
});

export default styles;