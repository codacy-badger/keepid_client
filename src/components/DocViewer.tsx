import React, { Component } from 'react';

// Need to validate form to make sure inputs are good, address is good, etc.
// Google API for address checking

interface Props {
  pdfFile: File,
}

class DocViewer extends Component<Props, {}> {
  render() {
    const {
      pdfFile,
    } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center">
                        Document Title Here
            </h2>
          </div>
        </div>
        <div className="row embed-responsive embed-responsive-16by9 align-content-center">
          <iframe className="embed-responsive-item" src={window.URL.createObjectURL(pdfFile)} title="Document" />
        </div>
      </div>
    );
  }
}

export default DocViewer;
