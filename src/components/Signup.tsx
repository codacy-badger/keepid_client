import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withAlert } from 'react-alert';
import SignaturePad from '../lib/react-typescript-signature-pad';
import Role from '../static/Role';
import USStates from '../static/data/states_titlecase.json';
import getServerURL from '../serverOverride';

interface Props {
  personRole: Role,
  buttonState: string,
  onSubmitProp: (personFirstName : string, personLastName : string, personBirthDate: string, personEmail: string,
    personPhoneNumber: string, personAddressStreet: string, personAddressCity: string, personAddressState: string,
    personAddressZipcode: string, personUsername: string, personPassword: string, personRoleString: string) => void,
  alert: any
}

interface State {
  personFirstName: string,
  personLastName: string,
  personBirthDate: Date,
  personEmail: string,
  personPhoneNumber: string,
  personAddressStreet: string,
  personAddressCity: string,
  personAddressState: string,
  personAddressZipcode: string,
  personUsername: string,
  personPassword: string,
  personConfirmPassword: string,
  acceptEULA: boolean,
  reaffirmStage: boolean,
}

class Signup extends Component<Props, State, {}> {
  constructor(props: Props) {
    super(props);

    this.state = {
      personFirstName: '',
      personLastName: '',
      personBirthDate: new Date(),
      personEmail: '',
      personPhoneNumber: '',
      personAddressStreet: '',
      personAddressCity: '',
      personAddressState: USStates[0].abbreviation,
      personAddressZipcode: '',
      personUsername: '',
      personPassword: '',
      personConfirmPassword: '',
      acceptEULA: false,
      reaffirmStage: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePersonFirstName = this.handleChangePersonFirstName.bind(this);
    this.handleChangePersonLastName = this.handleChangePersonLastName.bind(this);
    this.handleChangePersonBirthDate = this.handleChangePersonBirthDate.bind(this);
    this.handleChangePersonEmail = this.handleChangePersonEmail.bind(this);
    this.handleChangePersonPhoneNumber = this.handleChangePersonPhoneNumber.bind(this);
    this.handleChangePersonAddressStreet = this.handleChangePersonAddressStreet.bind(this);
    this.handleChangePersonAddressCity = this.handleChangePersonAddressCity.bind(this);
    this.handleChangePersonAddressState = this.handleChangePersonAddressState.bind(this);
    this.handleChangePersonAddressZipcode = this.handleChangePersonAddressZipcode.bind(this);
    this.handleChangePersonUsername = this.handleChangePersonUsername.bind(this);
    this.generatePersonUsername = this.generatePersonUsername.bind(this);
    this.handleChangePersonPassword = this.handleChangePersonPassword.bind(this);
    this.handleChangePersonConfirmPassword = this.handleChangePersonConfirmPassword.bind(this);
    this.handleChangeReaffirmStage = this.handleChangeReaffirmStage.bind(this);
    this.handleChangeAcceptEULA = this.handleChangeAcceptEULA.bind(this);
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const {
      personRole,
    } = this.props;
    const {
      personFirstName,
      personLastName,
      personBirthDate,
      personEmail,
      personPhoneNumber,
      personAddressStreet,
      personAddressCity,
      personAddressState,
      personAddressZipcode,
      personUsername,
      personPassword,
      personConfirmPassword,
    } = this.state;
    if (personPassword !== personConfirmPassword) {
      this.props.alert.show('Your passwords are not identical');
    } else {
      const personRoleStringVar = this.personRoleString(personRole);

      const personBirthMonth = personBirthDate.getMonth() + 1;
      const personBirthMonthString = (personBirthMonth < 10 ? `0${personBirthMonth}` : personBirthMonth);
      const personBirthDay = personBirthDate.getDate();
      const personBirthDayString = (personBirthDay < 10 ? `0${personBirthDay}` : personBirthDay);
      const personBirthDateFormatted = `${personBirthMonthString}-${personBirthDayString}-${personBirthDate.getFullYear()}`;

      this.props.onSubmitProp(personFirstName, personLastName, personBirthDateFormatted, personEmail,
        personPhoneNumber, personAddressStreet, personAddressCity, personAddressState,
        personAddressZipcode, personUsername, personPassword, personRoleStringVar);
    }
  }

  handleChangePersonFirstName(event: any) {
    this.setState({ personFirstName: event.target.value });
  }

  handleChangePersonLastName(event: any) {
    this.setState({ personLastName: event.target.value });
  }

  handleChangePersonBirthDate(date: any) {
    this.setState({ personBirthDate: date });
  }

  handleChangePersonEmail(event: any) {
    this.setState({ personEmail: event.target.value });
  }

  handleChangePersonPhoneNumber(event: any) {
    this.setState({ personPhoneNumber: event.target.value });
  }

  handleChangePersonAddressStreet(event: any) {
    this.setState({ personAddressStreet: event.target.value });
  }

  handleChangePersonAddressCity(event: any) {
    this.setState({ personAddressCity: event.target.value });
  }

  handleChangePersonAddressState(event: any) {
    this.setState({ personAddressState: event.target.value });
  }

  handleChangePersonAddressZipcode(event: any) {
    this.setState({ personAddressZipcode: event.target.value });
  }

  generatePersonUsername(event: any) {
    const {
      personFirstName,
      personLastName,
    } = this.state;
    const personFirstNameNew = personFirstName.replace(/ /g, '-');
    const personLastNameNew = personLastName.replace(/ /g, '-');
    const personUsername = `${personFirstNameNew.toUpperCase()}-${personLastNameNew.toUpperCase()}`;
    fetch(`${getServerURL()}/generate-username`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username: personUsername,
      }),
    }).then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        this.setState({ personUsername: responseJSON });
      });
  }

  handleChangePersonUsername(event: any) {
    this.setState({ personUsername: event.target.value });
  }

  handleChangePersonPassword(event: any) {
    this.setState({ personPassword: event.target.value });
  }

  handleChangePersonConfirmPassword(event: any) {
    this.setState({ personConfirmPassword: event.target.value });
  }

  handleChangeReaffirmStage(event: any) {
    const {
      reaffirmStage,
    } = this.state;
    this.setState({ reaffirmStage: !reaffirmStage });
  }

  handleChangeAcceptEULA(acceptEULA: boolean) {
    this.setState({ acceptEULA });
  }

  personRoleString(personRole: Role) {
    switch (personRole) {
      case Role.Director: return 'Director';
      case Role.Admin: return 'Admin';
      case Role.Client: return 'Client';
      case Role.LoggedOut: return 'LoggedOut';
      case Role.Volunteer: return 'Volunteer';
      case Role.Worker: return 'Worker';
      default: return '';
    }
  }

  render() {
    const {
      personRole,
      buttonState,
    } = this.props;

    const {
      personFirstName,
      personLastName,
      personEmail,
      personPhoneNumber,
      personAddressStreet,
      personAddressCity,
      personAddressState,
      personAddressZipcode,
      personUsername,
      personPassword,
      personConfirmPassword,
      acceptEULA,
      reaffirmStage,
    } = this.state;

    const personFormHeader = this.personRoleString(personRole);
    const signupForm = (
      <div className="container">
        <Helmet>
          <title>
            Sign Up
            {' '}
            {personFormHeader}
          </title>
          <meta name="description" content="Keep.id" />
        </Helmet>
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron jumbotron-fluid bg-white pb-2 mb-2">
              <div className="container">
                <h1 className="display-5 text-center font-weight-bold mb-3">
                  {personFormHeader}
                  {' '}
                  Signup Page
                </h1>
                <p className="lead">Please fill out the following form to proceed with setting up the Keep.id account.</p>
              </div>
            </div>
            <form onSubmit={this.handleChangeReaffirmStage}>
              <div className="col-md-12">
                <div className="form-row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="inputFirstName" className="w-100 pr-3">
                      Contact First Name
                      <text className="red-star">*</text>
                      <input
                        type="text"
                        className="form-control form-purple"
                        id="inputFirstName"
                        onChange={this.handleChangePersonFirstName}
                        value={personFirstName}
                        placeholder="John"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="inputLastName" className="w-100 pr-3">
                      Contact Last Name
                      <text className="red-star">*</text>
                      <input
                        type="text"
                        className="form-control form-purple"
                        id="inputLastName"
                        onChange={this.handleChangePersonLastName}
                        value={personLastName}
                        placeholder="Doe"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-4 form-group">
                    <label htmlFor="inputPhoneNumber" className="w-100 pr-3">
                      Contact Phone Number
                      <text className="red-star">*</text>
                      <input
                        type="tel"
                        className="form-control form-purple"
                        id="inputPhoneNumber"
                        onChange={this.handleChangePersonPhoneNumber}
                        value={personPhoneNumber}
                        placeholder="1-(234)-567-8901"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-3 form-group">
                    <label htmlFor="inputBirthDate" className="w-100 pr-3">
                      Contact Birth Date
                      <text className="red-star">*</text>
                      <DatePicker
                        id="inputBirthDate"
                        onChange={this.handleChangePersonBirthDate}
                        selected={this.state.personBirthDate}
                        className="form-control form-purple"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-5 form-group">
                    <label htmlFor="inputEmail" className="w-100 pr-3">
                      Contact Email Address
                      <text className="red-star">*</text>
                      <input
                        type="email"
                        className="form-control form-purple"
                        id="inputEmail"
                        onChange={this.handleChangePersonEmail}
                        value={personEmail}
                        placeholder="contact@example.com"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-4 form-group">
                    <label htmlFor="inputMailingAddress" className="w-100 pr-3">
                      Contact Mailing Address
                      <text className="red-star">*</text>
                      <input
                        type="text"
                        className="form-control form-purple"
                        id="inputMailingAddress"
                        onChange={this.handleChangePersonAddressStreet}
                        value={personAddressStreet}
                        placeholder="311 Broad St"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-3 form-group">
                    <label htmlFor="inputCity" className="w-100 pr-3">
                      City
                      <text className="red-star">*</text>
                      <input
                        type="text"
                        className="form-control form-purple"
                        id="inputCity"
                        onChange={this.handleChangePersonAddressCity}
                        value={personAddressCity}
                        placeholder="Philadelphia"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-2 form-group">
                    <label htmlFor="inputState" className="w-100 pr-3">
                      State
                      <text className="red-star">*</text>
                      <select
                        className="form-control form-purple"
                        id="inputState"
                        value={personAddressState}
                        onChange={this.handleChangePersonAddressState}
                        disabled={reaffirmStage}
                        required
                      >
                        {USStates.map((USState) => (<option>{USState.abbreviation}</option>))}
                      </select>
                    </label>
                  </div>
                  <div className="col-md-3 form-group">
                    <label htmlFor="inputZipCode" className="w-100 pr-3">
                      Zip Code
                      <text className="red-star">*</text>
                      <input
                        type="text"
                        className="form-control form-purple"
                        id="inputZipCode"
                        onChange={this.handleChangePersonAddressZipcode}
                        value={personAddressZipcode}
                        placeholder="19104"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>

                </div>
                <div className="form-row">
                  <div className="col-md-4 form-group">
                    <label htmlFor="inputUsername" className="w-100 pr-3">
                      Contact Username
                      <text className="red-star">*</text>
                      <input
                        type="text"
                        className="form-control form-purple"
                        id="inputUsername"
                        onChange={this.handleChangePersonUsername}
                        value={personUsername}
                        placeholder="John-Doe-02-21-20"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-2 form-group">
                    <button type="button" className="btn btn-success" onClick={this.generatePersonUsername}>Generate Username</button>
                  </div>
                  <div className="col-md-3 form-group">
                    <label htmlFor="inputPassword" className="w-100 pr-3">
                      Password
                      <text className="red-star">*</text>
                      <input
                        type="password"
                        className="form-control form-purple"
                        id="inputPassword"
                        onChange={this.handleChangePersonPassword}
                        value={personPassword}
                        placeholder="Password"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-3 form-group">
                    <label htmlFor="inputConfirmPassword" className="w-100 pr-3">
                      Confirm Password
                      <text className="red-star">*</text>
                      <input
                        type="password"
                        className="form-control form-purple"
                        id="inputConfirmPassword"
                        onChange={this.handleChangePersonConfirmPassword}
                        value={personConfirmPassword}
                        placeholder="Confirm password"
                        readOnly={reaffirmStage}
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  {!reaffirmStage
                    ? (
                      <div className="col mt-3 pl-5 pt-2">
                        <input type="submit" className="btn btn-primary w-50" value="Continue" />
                      </div>
                    ) : <br />}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

    if (!reaffirmStage) {
      return (signupForm);
    }
    return (
      <div className="container">
        { signupForm }
        <div className="row mt-5">
          <p className="textPrintDesc pl-3">
            <span>End User License Agreement</span>
          </p>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src="eula-template.pdf" title="EULA Agreement" />
          </div>
        </div>
        <div className="row mt-5">
          <p className="textPrintDesc pl-3">
            <span>I agree to all terms and conditions in the EULA above</span>
          </p>
        </div>
        <div className="row mt-0 mb-auto col-md-12">
          <span className="border">
            <SignaturePad acceptEULA={acceptEULA} handleChangeAcceptEULA={this.handleChangeAcceptEULA} />
          </span>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 text-right">
            <button type="button" onClick={this.handleChangeReaffirmStage} className="btn btn-danger mr-4">Back</button>
            <button type="submit" onClick={this.handleSubmit} className={`btn btn-success ld-ext-right ${buttonState}`}>
              {personRole === Role.Director ? 'Next' : 'Submit'}
              <div className="ld ld-ring ld-spin" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(Signup);
