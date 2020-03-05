import React from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { withAlert } from 'react-alert';
import DocumentViewer from './DocumentViewer';
import getServerURL from '../serverOverride';

interface Props {
  alert: any
}

interface State {
  submitStatus: boolean,
  pdfFile: File | undefined,
}

class UploadDocs extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handleChangeFileUpload = this.handleChangeFileUpload.bind(this);
    this.state = {
      submitStatus: false,
      pdfFile: undefined,
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleChangeFileUpload = this.handleChangeFileUpload.bind(this);
  }

  submitForm(event: any) {
    event.preventDefault();
    const {
      pdfFile,
    } = this.state;
    if (pdfFile) {
      const formData = new FormData();
      formData.append('file', pdfFile, pdfFile.name);
      fetch(`${getServerURL()}/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      }).then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          responseJSON = JSON.parse(responseJSON);
          console.log(responseJSON);
          const {
            status,
          } = responseJSON;
          if (status === 'success') {
            this.props.alert.show('Successfully Uploaded File');
            this.setState({
              submitStatus: true,
            });
          } else {
            this.props.alert.show('Failure to Upload File');
          }
          console.log(status);
        });
    } else {
      this.props.alert.show('Please select a file');
    }
  }

  handleChangeFileUpload(event: any) {
    event.preventDefault();
    const file : File = event.target.files[0];
    this.setState({ pdfFile: file });
  }

  render() {
    const {
      submitStatus,
      pdfFile,
    } = this.state;
    if (submitStatus) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="container">
        <Helmet>
          <title>Upload Documents</title>
          <meta name="description" content="Keep.id" />
        </Helmet>
        <div className="jumbotron-fluid mt-5">
          <h1 className="display-4">Upload Document</h1>
          <p className="lead pt-3">
            Click the &quot;Choose file&quot; button to select a PDF file to upload.
            The name and a preview of the PDF will appear below the buttons.
            After confirming that you have chosen the correct file, click the &quot;Upload&quot; button to upload.
            Otherwise, choose a different file.
          </p>
          {pdfFile
            ? (
              <div className="row">
                <DocumentViewer pdfFile={pdfFile} />
              </div>
            ) : <div />}
          <div className="row justify-content-left form-group mb-5">
            <form onSubmit={this.submitForm}>
              <div className="form-row mt-3">
                <div className="col">
                  <label className="btn btn-filestack btn-widget ml-5 mr-5">
                    Choose File
                    {' '}
                    <input type="file" accept="application/pdf" id="potentialPdf" onChange={this.handleChangeFileUpload} hidden />
                  </label>
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-outline-success">Upload</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(UploadDocs);
