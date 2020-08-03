import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import OrganizationMarker from './OrganizationMarker';
import uuid from 'react-uuid';

interface Props {
  organizations: any,
  lat: number,
  lng: number,
}

interface State {

}

class MapComponent extends Component<Props, State> {
  render() {
    const {
      organizations,
      lat,
      lng,
    } = this.props;

    return (
      <GoogleMap
        defaultZoom={12}
        center={{
          lat,
          lng,
        }}
      >
        {organizations.map(
          (organization, index) => (
            <OrganizationMarker
              key={uuid()}
              lat={organization.lat}
              lng={organization.lng}
              orgName={organization.orgName}
              address={organization.address}
              phone={organization.phone}
              email={organization.email}
            />
          ),
        )}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(MapComponent));
