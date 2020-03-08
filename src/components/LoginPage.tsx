import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import getServerURL from '../serverOverride';
import { withAlert } from 'react-alert';
import Role from '../static/Role';
import ReCAPTCHA from 'react-google-recaptcha';
import LoginSVG from '../static/images/login-svg.svg'
import { Link } from 'react-router-dom';

const recaptchaRef: React.RefObject<ReCAPTCHA> = React.createRef();

interface State {
  username: string,
  password: string,
  buttonState: string
}

interface Props {
  logIn: (role: Role, username: string, organization: string, name: string) => void,
  logOut: () => void,
  isLoggedIn: boolean,
  role: Role,
  alert: any
}
class LoginPage extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonState: ''
    }; 
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangePassword(event: any) {
    this.setState({ password: event.target.value });
  }

  handleChangeUsername(event: any) {
    this.setState({ username: event.target.value });
  }

  handleLogin(event: any) {
    this.setState({ buttonState: 'running' });
    event.preventDefault();
    const {
      logIn,
    } = this.props;
    const {
      username,
      password,
    } = this.state;
    if(username.trim() === "" || password.trim() === ""){
      this.props.alert.show('Please enter a valid username or password');
      this.setState({ buttonState: '' });
    } else {
      fetch(`${getServerURL()}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          username,
          password,
        }),
      }).then((response) => response.json())
        .then((responseJSON) => {
          responseJSON = JSON.parse(responseJSON);
          const {
            loginStatus,
            userRole,
            organization,
            firstName,
            lastName,
          } = responseJSON;
          if (loginStatus === 'AUTH_SUCCESS') {
            const role = () => {
              switch (userRole) {
                case 'admin': return Role.Admin;
                case 'worker': return Role.Worker;
                case 'client': return Role.Client;
                default: return Role.LoggedOut;
              }
            };
            logIn(role(), username, organization, `${firstName} ${lastName}`); // Change
          } else if (loginStatus === 'AUTH_FAILURE') {
            this.props.alert.show('Incorrect Password');
            this.setState({ buttonState: '' });
          } else if (loginStatus === 'USER_NOT_FOUND') {
            this.props.alert.show('Incorrect Username');
            this.setState({ buttonState: '' });
          } else {
            this.props.alert.show('Server Failure: Please Try Again');
            this.setState({ buttonState: '' });
          }
        }).catch((error) => {
          this.props.alert.show('Network Failure: Check Server Connection');
          this.setState({ buttonState: '' });
        });
    }
  }

  render() {
    const {
      username,
      password,
    } = this.state;
    return (
        <div>
          <Helmet>
            <title>Login</title>
            <meta name="description" content="Keep.id" />
          </Helmet>
          <div className="container">
            <div className="row mt-4">
              <div className="col-6 mobile-hide">
                <div className="float-right w-100">
                  <img alt="Login Image" className="w-75 pt-5 mt-5 float-right " src={LoginSVG} />
                </div>
                <div className="row pl-3 pb-3">
                  <span className="text-muted recaptcha-login-text pt-4 mt-4 pl-5 ml-5 w-75">
                    This page is protected by reCAPTCHA, and subject to the Google <a href="https://www.google.com/policies/privacy/">Privacy Policy </a> 
                    and <a href="https://www.google.com/policies/terms/">Terms of service</a>.</span>
                </div>
              </div>

              <div className="col-6">
                <form className="form-signin pt-5 ml-5">
                  <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                  <label htmlFor="username" className="w-100 font-weight-bold">
                    Username
                    <input type="text" className="form-control form-purple mt-1" id="username" placeholder="username" value={username} 
                    onChange={this.handleChangeUsername} required />
                  </label>
                  <label htmlFor="password" className="w-100 pt-2 font-weight-bold">
                    Password
                    <input type="password" className="form-control form-purple mt-1" id="password" placeholder="password" value={password} 
                    onChange={this.handleChangePassword} required />
                  </label>
                  
                  <div className="row pl-3 pt-3">
                    <div className="col-6 pl-0">
                      <div className="checkbox mb-3 pt-2">
                        <label>
                          <input type="checkbox" className="mr-1" value="remember-me"/> Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <button type="submit" onClick={this.handleLogin} className={`btn btn-success loginButtonBackground w-100 ld-ext-right ${this.state.buttonState}`}>
                        Sign In
                        <div className="ld ld-ring ld-spin" />
                      </button>
                    </div>
                  </div>
                  <div className="row pl-3 pb-3">
                    <Link to="/bug-report" className="text-decoration-none">
                      <span className="">Forgot your password?</span>
                    </Link>
                  </div>
                  <div className="row pl-3 pb-1">
                    <span className="pt-3">
                      Don't have an account?
                    </span>
                  </div>
                  <div className="row pl-3">
                    <div className="col-10 pl-0">
                      <button type="button" className="btn btn-outline-primary w-100 ">Sign Up Here</button>
                    </div>
                  </div>
                  <div className="row pl-3 pb-1">
                    <span className="pt-3">
                      Are you a nonprofit organization?
                    </span>
                  </div>
                  <div className="row pl-3">
                    <div className="col-10 pl-0">
                      <button type="button" className="btn btn-outline-primary w-100">Start a 3 Month Free Trial</button>
                    </div>
                  </div>
                </form>  
              </div>
            </div>
          </div>
         
          <ReCAPTCHA
            sitekey="6LdC2doUAAAAAOPR99_VV97ifNVQiF7I3RQOTc8T"
            ref={recaptchaRef}
            size="invisible"
          />
        </div>
    );
  }
}

export default withAlert()(LoginPage);