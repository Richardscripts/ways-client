import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    this.props.setLoading(true);
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        name.value = '';
        username.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      })
      .finally(() => {
        this.props.setLoading(false);
      });
  };

  componentDidMount() {
    if (this.refs.firstInput) {
      this.firstInput.current.focus();
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div className="form-wrapper">
        <form action="#" className="LoginForm" onSubmit={this.handleSubmit}>
          <div>
            <Label htmlFor="registration-name-input">
              Enter your name
              <Required />
            </Label>
            <br />
            <Input
              ref={this.firstInput}
              id="registration-name-input"
              name="name"
              required
            />
          </div>
          <div>
            <Label htmlFor="registration-username-input">
              Choose a username
              <Required />
            </Label>
            <br />
            <Input id="registration-username-input" name="username" required />
          </div>
          <div>
            <Label htmlFor="registration-password-input">
              Choose a password
              <Required />
            </Label>
            <br />
            <Input
              id="registration-password-input"
              name="password"
              type="password"
              required
            />
            <div style={{ color: 'red', textAlign: 'center' }} role="alert">
              {error && <p>{error}</p>}
            </div>
          </div>
          <div>
            <div className="button-wrapper">
              <Link to="/login">Already have an account?</Link>
              <br />
              <br />
              <Button className="myButton" type="submit">
                Sign up
              </Button>
            </div>
          </div>
        </form>
        <div style={{ fontSize: '16px' }}>
          <center>
            <p>
              <b>Demo User:</b>
              <br />
              Username: John Rambo
              <br />
              Password: Password1!{' '}
            </p>
          </center>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
