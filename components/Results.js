import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, SIZE } from "baseui/modal";
import { Button } from "baseui/button";

const Results = ({ isOpen, handleClose, children, title }) => {
  return (
    <Modal onClose={handleClose} isOpen={isOpen} size={SIZE.default}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end"
        }}
      >
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleClose}>Ok</Button>
      </ModalFooter>
    </Modal>
  );
};

export default Results;
