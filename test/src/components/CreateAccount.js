import React, { Component } from 'react';
import { AppRegistry, Text, View, Button, Image, TouchableHighlight, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createUserAccount } from '../actions';
import { Spinner } from './common';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            email: '',
            password: '',
            confirm: '',
            error: '',
        };
    }

    first(event) {
        this.setState({ first: event.nativeEvent.text });
    }
    last(event) {
        this.setState({ last: event.nativeEvent.text });
    }
    email(event) {
        this.setState({ email: event.nativeEvent.text });
    }
    password(text) {
        this.setState({ password: text });
        if (text !== this.state.confirm){
          this.setState({ error: 'Passwords much match'});
        } else {
          this.setState({ error: '' });
        }
    }
    confirm(text) {
        this.setState({ confirm: text });
        if (this.state.password !== text){
          this.setState({ error: 'Passwords much match'});
        } else {
          this.setState({ error: '' });
        }
    }

    signUp() {
        let email = this.state.email;
        let password = this.state.password;
        let first = this.state.first;
        let last = this.state.last;
        if (this.state.password === this.state.confirm){
          console.log('starting signup');
          this.props.createUserAccount(first, last, email, password)
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./Resources/id-card.png')} style={styles.icon} />
                <Text style={styles.container}>Welcome! Please Fill out all fields.</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder='First Name'
                    onChange={this.first.bind(this)}
                    value={this.state.first} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Last Name'
                    onChange={this.last.bind(this)}
                    value={this.state.last} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Email'
                    onChange={this.email.bind(this)}
                    value={this.state.email} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Password'
                    onChangeText={text => this.password(text)}
                    secureTextEntry={true}
                    value={this.state.password} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Confirm password'
                    onChangeText={text => this.confirm(text)}
                    secureTextEntry={true}
                    value={this.state.confirm} />
                <Text>
                  {this.state.error}
                </Text>
                <TouchableHighlight style={styles.button} onPress={() => this.signUp()} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableHighlight>

          </View>
        );
    }
}

const styles = {
    container: {
        padding: 30,
        marginTop: 30,
        alignItems: 'center'
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    icon: {
        width: 40,
        height: 40,
    },
    button: {
        height: 45,
        backgroundColor: '#42f4bf',
        borderColor: '#42f4bf',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    searchInput: {
        height: 45,
        padding: 4,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#42f4bf',
        borderRadius: 8,
        color: 'black'
    },
    separator: {
        height: 40,
    },
    account: {
        marginTop: 50,
        marginBottom: 10,
    }
};

// const mapStateToProps = (state) => {
//   return { signUpEmail: state.auth.signUpEmail, signUpPassword: state.auth.signUpPassword, signUpError: state.auth.signUpError, signUpLoading: state.auth.signUpLoading };
// };
//
export default connect(null, { createUserAccount })(Signup);

// export default Signup;