import React from 'react';

import DocViewer from './DocViewer';
import UploadLogo from '../static/images/uploading-files-to-the-cloud.svg';
import getServerURL from '../serverOverride';

interface State {
  pdfFile: File | undefined
}

class UploadDocs extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handleChangeFileUpload = this.handleChangeFileUpload.bind(this);
    this.state = {
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
    fetch(getServerURL() + '/put-documents', {
      method: 'POST',
      body: pdfFile,
    }).then((response) => response.json())
      .then((responseJSON) => {

      });
  }

  handleChangeFileUpload(event: any) {
    event.preventDefault();
    const file : File = event.target.files[0];
    const req = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file, file.name);

    req.open('POST', getServerURL() + '/upload');
    req.send(formData);
    this.setState({ pdfFile: file });
  }

  render() {
    const {
      pdfFile,
    } = this.state;
    return (
      <div className="container">
        <div className="jumbotron-fluid mt-5">
          <h1 className="display-4">Upload Documents</h1>
          <p className="lead pt-3">
            Click the &quot;Choose file&quot; button to select a PDF file to upload.
            The name and a preview of the PDF will appear below the buttons.
            After confirming that you have chosen the correct file, click the &quot;Upload&quot; button to upload.
            Otherwise, choose a different file.
          </p>
          {pdfFile
            ? (
              <div className="row">
                <DocViewer pdfFile={pdfFile} />
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

export default UploadDocs;
