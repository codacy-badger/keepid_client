import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import UploadSVG from '../../static/images/uploading-files-to-the-cloud.svg';
import RequestSVG from '../../static/images/request.svg';
import AppSVG from '../../static/images/calendar.svg';
import EmailSVG from '../../static/images/email.svg';
import AssistSVG from '../../static/images/assistance.svg';
import FileSVG from '../../static/images/file.svg';

interface State {
  show: boolean
}

class ClientLanding extends Component<{}, State, {}> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      show: false,
    };
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  render() {
    const {
      show,
    } = this.state;
    return (
      <div id="Buttons" className="container pt-5">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Keep.id" />
        </Helmet>
        <div className="row m-auto mt-5">
          <div className="d-flex p-3" id="Upload container">
            <Link to="/upload-document">
              <div className="rectangle pt-4">
                <img className="uploadImg pb-2" src={UploadSVG} alt="See" />
                <p className="textLanding">
                  Upload a Document
                </p>
              </div>
            </Link>
          </div>
          <div className="d-flex p-3" id="Print container">
            <Link to="/my-documents">
              <div className="rectangle pt-2">
                <img className="normalImage" src={FileSVG} alt="Print" />
                <p className="textLanding mt-4 pt-3">My Documents</p>
              </div>

            </Link>
          </div>
          <div className="d-flex p-3" id="Request container">
            <Link to="/request">
              <div className="rectangle">
                <img className="normalImage" src={RequestSVG} alt="Request" />
                <p className="textLanding mt-3 pt-4">
                  Request Documents
                </p>
              </div>
            </Link>
          </div>
          <div className="d-flex p-3" id="Applications container">
            <Link to="/applications">
              <div className="rectangle pt-2">
                <img className="normalImage" src={AppSVG} alt="Applications" />
                <p className="textLanding mt-5">My Applications</p>
              </div>
            </Link>
          </div>
          <div className="d-flex p-3" id="Email container">
            <Link to="/email">
              <div className="rectangle pt-2">
                <img className="normalImage" src={EmailSVG} alt="Email" />
                <p className="textLanding mt-5">Send an Email</p>
              </div>
            </Link>
          </div>
          <div className="d-flex p-3">
            <button type="button" className="btn btn-assist" onClick={this.showModal}>
              <div className="rectangle pt-2">
                <img className="normalImage" src={AssistSVG} alt="Assistance" />
                <p className="textLanding mt-5">Need Assistance?</p>
              </div>
            </button>
          </div>
        </div>
        <Modal show={show} onHide={this.hideModal}>
          <section className="modal-header background">
            <h5 className="modal-title" id="assistTitle">FAQ</h5>
            <button type="button" className="close" onClick={this.hideModal}>
              <span>&times;</span>
            </button>
          </section>
          <section className="modal-main">
            <p>
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              <br />
              <br />
              Send all technical issues to admin@keep.id
            </p>
          </section>
        </Modal>
      </div>
    );
  }
}

export default ClientLanding;