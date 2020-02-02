// Idea: worker only access to client which permitted him, we can change who a client can edit
// Superadmin can only do set admin

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import getServerURL from '../serverOverride';
import {Helmet} from "react-helmet";

interface Props {
  username: string,
  name: string,
  organization: string,
}

interface State {
  workers: any,
  currentWorker: any
  username: string,
  adminName: string,
  organization: string,
}

class AdminLanding extends Component<Props, State> {
  tableCols = [{
    dataField: 'username',
    text: 'Worker User ID',
    sort: true,
  }, {
    dataField: 'name',
    text: 'Name',
    sort: true,
  }, {
    dataField: 'role',
    text: 'Role',
    sort: true,
  }];

  constructor(props: Props) {
    super(props);
    this.state = {
      currentWorker: undefined,
      username: props.username,
      adminName: props.name,
      organization: props.organization,
      workers: [{
        username: '',
        name: '',
        role: '',
      }],
      // we should also pass in other state such as the admin information. we could also do a fetch call inside
    };
    this.onClickWorker = this.onClickWorker.bind(this);
    this.getAdminWorkers = this.getAdminWorkers.bind(this);
    this.onChangeViewPermission = this.onChangeViewPermission.bind(this);
    this.onChangeEditPermission = this.onChangeEditPermission.bind(this);
    this.onChangeRegisterPermission = this.onChangeRegisterPermission.bind(this);
  }

  componentDidMount() {
    this.getAdminWorkers();
  }

  onClickWorker(event: any) {
    this.setState({ currentWorker: event });
  }

  onChangeViewPermission(event: any) {
    const {
      currentWorker,
      username,
      adminName,
      organization,
      workers,
    } = this.state;
    currentWorker.viewPermission = event.target.ischecked;
    this.setState({ currentWorker });
  }

  onChangeEditPermission(event: any) {
    const thisCopy = this;
    // console.log(event);
  }

  onChangeRegisterPermission(event: any) {
    const thisCopy = this;
    // console.log(event);
  }

  getAdminWorkers() {
    const workers = [{
      username: 'conchong1',
      name: 'Connor Chong',
      role: 'Admin',
      viewPermission: true,
      editPermission: true,
      registerPermission: true,
    }];
    this.setState({ workers });
    // fetch(getServerURL() + "/get-admin-workers", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: this.state.username,
    //   })
    // }).then((response) => (response.json()))
    // .then((responseJSON) => {
    //   this.setState({workers: responseJSON.workers});
    // })
  }

  render() {
    const {
      currentWorker,
      username,
      adminName,
      organization,
      workers,
    } = this.state;
    const workerPanel = (currentWorker === undefined)
      ? (
        <div className="card ml-5">
          <div className="card-body">
            <h5 className="card-title">
              No Worker Selected
            </h5>
            <p className="card-text">Set and Modify Permissions here</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="form-group form-check">
                <label htmlFor="viewCheckbox" className="form-check-label">
                  <input type="checkbox" checked={false} readOnly className="form-check-input" id="viewCheckbox" />
                  Can View Client Documents
                </label>
              </div>
              <div className="form-group form-check">
                <label htmlFor="editCheckbox" className="form-check-label">
                  <input type="checkbox" checked={false} readOnly className="form-check-input" id="editCheckbox" />
                  Can Edit Client Documents
                </label>
              </div>
              <div className="form-group form-check">
                <label htmlFor="registerCheckbox" className="form-check-label">
                  <input type="checkbox" checked={false} readOnly className="form-check-input" id="registerCheckbox" />
                  Can Register New Clients
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="permissionSelector">
                  Set Worker Permission Level
                  <select className="form-control" id="permissionSelector">
                    <option>Worker</option>
                    <option>Admin</option>
                    <option>Volunteer</option>
                  </select>
                </label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-danger">Delete Worker Account</button>
              </div>
            </li>
            <li className="list-group-item">
              <button type="submit" className="btn btn-outline-primary">Save Changes</button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="card ml-5">
          <div className="card-body">
            <h5 className="card-title">
              {currentWorker.name}
              : Worker Permissions
            </h5>
            <p className="card-text">Set and Modify Permissions here</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="form-group form-check">
                <label htmlFor="viewCheckbox" className="form-check-label">
                  <input type="checkbox" checked={currentWorker.viewPermission} onChange={this.onChangeViewPermission} className="form-check-input" id="viewCheckbox" />
                  Can View Client Documents
                </label>
              </div>
              <div className="form-group form-check">
                <label htmlFor="editCheckbox" className="form-check-label">
                  <input type="checkbox" checked={currentWorker.editPermission} onChange={this.onChangeEditPermission} className="form-check-input" id="editCheckbox" />
                  Can Edit Client Documents
                </label>
              </div>
              <div className="form-group form-check">
                <label htmlFor="registerCheckbox" className="form-check-label">
                  <input type="checkbox" checked={currentWorker.registerPermission} onChange={this.onChangeRegisterPermission} className="form-check-input" id="registerCheckbox" />
                  Can Register New Clients
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="permissionSelector">
                  Set Worker Permission Level
                  <select className="form-control" id="permissionSelector">
                    <option>Worker</option>
                    <option>Admin</option>
                    <option>Volunteer</option>
                  </select>
                </label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-danger">Delete Worker Account</button>
              </div>
            </li>
            <li className="list-group-item">
              <button type="submit" className="btn btn-outline-primary">Save Changes</button>
            </li>
          </ul>
        </div>
      );

    return (
      <div>
        <Helmet>
          <title>Admin Panel</title>
          <meta name="description" content="Keep.id" />
        </Helmet>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-7">{organization}</h1>
            <p className="lead">
              Welcome
              {adminName}
              .
            </p>
          </div>
        </div>
        <div className="container">
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search Workers</button>
          </form>
          <div className="d-flex flex-row bd-highlight mb-3 pt-5">
            <div className="w-50 pd-3">
              <BootstrapTable
                bootstrap4
                keyField="username"
                data={workers}
                hover
                striped
                columns={this.tableCols}
                selectRow={{
                  mode: 'radio',
                  onSelect: this.onClickWorker,
                  clickToSelect: true,
                  hideSelectColumn: true,
                }}
                noDataIndication="No Workers Present"
                pagination={paginationFactory()}
              />
            </div>
            {workerPanel}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLanding;
