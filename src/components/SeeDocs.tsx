import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Redirect } from 'react-router-dom';

interface Props {
  username: string,
}

interface State {
  currentDocumentId: string | undefined,
  documentData: any,
}

class SeeDocs extends Component<Props, State> {
  ButtonFormatter = (cell: any, row: any) => (
    // to get the unique id of the document, you need to set a hover state which stores the document id of the row
    // then in this function you can then get the current hover document id and do an action depending on the document id
    <div>
      <button type="button" onClick={(event) => this.onViewDocument(event, row)} className="btn btn-outline-success btn-sm">
                View
      </button>
      <button type="button" className="btn btn-outline-secondary ml-2 btn-sm">
                Print
      </button>
      <button type="button" className="btn btn-outline-danger btn-sm ml-2">
                Delete
      </button>

    </div>
  )

  tableCols = [{
    dataField: 'documentName',
    text: 'Document Name',
    sort: true,
  }, {
    dataField: 'uploadDate',
    text: 'Date Uploaded',
    sort: true,
  },
  {
    dataField: 'uploader',
    text: 'Uploader',
    sort: true,
  },
  {
    text: 'Actions',
    formatter: this.ButtonFormatter,
  }];

  constructor(props: Props) {
    super(props);
    this.state = {
      currentDocumentId: undefined,
      documentData: [],
    };
    this.getDocumentData = this.getDocumentData.bind(this);
    this.onViewDocument = this.onViewDocument.bind(this);
    this.ButtonFormatter = this.ButtonFormatter.bind(this);
  }

  componentDidMount() {
    this.getDocumentData();
  }

  getDocumentData() {
    const exampleData = [
      {
        documentId: '1',
        documentName: 'doc1',
        uploadDate: '01/01/2020',
        uploader: 'You',
      },
      {
        documentId: '2',
        documentName: 'doc2',
        uploadDate: '01/02/2020',
        uploader: 'You',
      },
      {
        documentId: '3',
        documentName: 'doc3',
        uploadDate: '01/03/2020',
        uploader: 'You',
      }];
    this.setState({ documentData: exampleData });
  }

  onViewDocument(event: any, row: any) {
    console.log(row.documentId);
    this.setState({ currentDocumentId: row.documentId });
  }

  render() {
    const {
      currentDocumentId,
      documentData,
    } = this.state;
    if (currentDocumentId) {
      return <Redirect to={`/view-document/${currentDocumentId}`} />;
    }
    return (
      <div className="container">
        <div className="jumbotron-fluid mt-5">
          <h1 className="display-4">View and Print Documents</h1>
          <p className="lead pt-3">
    You can view, edit, print, and delete your documents you currently have stored on keep.id.
          </p>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search Documents</button>
        </form>
        <div className="d-flex flex-row bd-highlight mb-3 pt-5">
          <div className="w-100 pd-3">
            <BootstrapTable
              bootstrap4
              keyField="uploadDate"
              data={documentData}
              hover
              striped
              noDataIndication="No Documents Present"
              columns={this.tableCols}
              pagination={paginationFactory()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SeeDocs;
