import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
// Require authentication component
const SignUp = require('./Signup');
// const Time = require('./Time');
// const styles = require('./Helpers/styles');
const TabBar = require('./TabBar.js');
const VerifyText = require('./VerifyText.js');

import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  PropTypes,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  logoContainer: {
    width: deviceWidth,
    height: deviceHeight / 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: deviceHeight / 40,
    marginBottom: deviceHeight / 30,
  },
  logo: {
    width: deviceWidth / 2,
    height: deviceWidth / 3.6,
  },
  submit: {
    height: deviceHeight / 30,
    marginBottom: deviceHeight / 200,
    fontSize: deviceHeight / 47,
    borderColor: 'white',
    color: 'white',
    textAlign: 'left',
  },
  icon: {
    width: deviceWidth / 8,
    alignItems: 'center',
    // borderColor: 'white',
    // borderWidth: 0.5,
  },
  lineName: {
    width: deviceWidth / 1.5,
    // borderColor: 'white',
    // borderWidth: 0.5,
  },
  inputBar: {
    marginBottom: deviceHeight / 40,
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    marginLeft: deviceWidth / 10,
    marginRight: deviceWidth / 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: deviceHeight / 20,
    width: deviceWidth / 2,
    flexDirection: 'row',
    backgroundColor: '#FF9334',
    marginBottom: deviceHeight / 80,
    // marginTop: deviceHeight/80,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  signUpButton: {
    color: 'white',
    textAlign: 'center',
    // paddingTop: deviceHeight/,
    fontSize: deviceHeight / 50,
  },
  backgroundImage: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
    paddingTop: deviceHeight / 10,
    flexDirection: 'column',
  },
  errorMessage: {
    backgroundColor: 'transparent',
    // height: deviceHeight/14,
    color: '#ff0066',
    textAlign: 'center',
    fontSize: deviceHeight / 50,
  },
});


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      error: false,
      errorMessage: '',
    };
  }

  handlePassword(event) {
    this.setState({
      password: event.nativeEvent.text,
    });
  }

  handleUsername(event) {
    this.setState({
      username: event.nativeEvent.text,
    });
  }

  handleSignIn() {
    this.setState({
      isLoading: true,
    });
    if (this.state.password === '') {
      this.setState({
        isLoading: false,
        error: true,
        errorMessage: 'Invalid Password!',
      });
    }

    // If username and password exists on the database, log the user into the select time page
    if (this.state.username !== '' && this.state.password !== '') {
      fetch('http://159.203.197.90:3000/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: this.state.password,
          username: this.state.username,
        }),
      })
      .then((res) => {
        if (res.status > 400) {
          this.setState({ errorMessage: 'Incorrect Username or Password', password: '', error: true, isLoading: false });
        } else {
          res = JSON.parse(res._bodyInit);
          fetch('http://159.203.197.90:3000/isVerified',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: res.id }),
            })
          .then(resp => {
            if (resp.status === 200) {
              this.props.navigator.push({
                title: 'Roam',
                passProps: { user: res },
                component: TabBar,
              });
            } else {
              this.props.navigator.push({
                title: 'Verify Phone Link',
                component: VerifyText,
                passProps: { user: res },
              });
            }
          });
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log('Error handling submit:', error);
      });
    }
  }

  handleDemo() {

    // If username and password exists on the database, log the user into the select time page
      fetch('http://159.203.197.90:3000/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: 'jjones',
          username: 'Jjones',
        }),
      })
      .then((res) => {
        if (res.status > 400) {
          this.setState({ errorMessage: 'Incorrect Username or Password', password: '', error: true, isLoading: false });
        } else {
          res = JSON.parse(res._bodyInit);
          fetch('http://159.203.197.90:3000/isVerified',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: res.id }),
            })
          .then(resp => {
            if (resp.status === 200) {
              this.props.navigator.push({
                title: 'Roam',
                passProps: { user: res },
                component: TabBar,
              });
            } else {
              this.props.navigator.push({
                title: 'Verify Phone Link',
                component: VerifyText,
                passProps: { user: res },
              });
            }
          });
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log('Error handling submit:', error);
      });
  }

  handleSignUp() {
    this.setState({
      isLoading: true,
    });
    this.props.navigator.push({
      title: 'Create Account',
      component: SignUp,
      passProps: { navigator: this.props.navigator },
    });
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const showErr = (
      this.state.error ? <Text style={styles.errorMessage}> {this.state.errorMessage} </Text> : <Text style={styles.errorMessage}> </Text>
    );
    return (
      <Image
        style={styles.backgroundImage}
        source={require('../../imgs/dude.png')}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../imgs/logo.png')}
          />
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.inputBar}>
            <View style={styles.icon}>
              <TouchableHighlight underlayColor="transparent">
                <Icon name="user" size={20} color="#fff" />
              </TouchableHighlight>
            </View>
            <View style={styles.lineName}>
              <TextInput
                style={styles.submit}
                placeholder="Username"
                placeholderTextColor="white"
                value={this.state.username}
                onChange={this.handleUsername.bind(this)}
              />
            </View>
          </View>
          <View style={styles.inputBar}>
            <View style={styles.icon}>
              <TouchableHighlight underlayColor="transparent">
                <Icon name="lock" size={20} color="#fff" />
              </TouchableHighlight>
            </View>
            <View style={styles.lineName}>
              <TextInput
                style={styles.submit}
                placeholder="Password"
                placeholderTextColor="white"
                value={this.state.password}
                onChange={this.handlePassword.bind(this)}
                secureTextEntry={true}
              />
            </View>
          </View>
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSignIn.bind(this)}
            underlayColor="white"
          >
            <Text style={styles.buttonText}> Sign In </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleDemo.bind(this)}
            underlayColor="white"
          >
            <Text style={styles.buttonText}> Demo </Text>
          </TouchableHighlight>
          <TouchableHighlight
            // style={styles.button}
            onPress={this.handleSignUp.bind(this)}
            underlayColor="transparent"
          >
            <Text style={styles.signUpButton}> Not a user? Sign Up </Text>
          </TouchableHighlight>
          {/* This is the loading animation when isLoading is set to true */}
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color="#111"
            size="large"
          />
          {showErr}
        </View>
      </Image>
    );
  }
}

Login.propTypes = {
  // navigator: PropTypes.object,
};

module.exports = Login;
