import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Props {
    showModal: boolean,
    handleClose: () => void,
    handleLogout: () => void,
}

function IdleTimeOutModal(props: Props): React.ReactElement {
  const { showModal, handleClose, handleLogout } = props;
  return (
    <Modal show={showModal}>
      <Modal.Header>
        <Modal.Title>You have been idle for some time...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You will be automatically logged off soon.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
                Stay
        </Button>
        <Button variant="danger" onClick={handleLogout}>
                Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default IdleTimeOutModal;
