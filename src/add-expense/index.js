import { useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export function AddExpense({ show, handleClose, handleSave }) {
  const refDescription = useRef("");
  const refCost = useRef("");
  const refPayer = useRef("");

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense:</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSave(refDescription, refCost, refPayer)}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control type="text" ref={refDescription} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cost:</Form.Label>
            <Form.Control type="text" ref={refCost} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Payer:</Form.Label>
            <Form.Control type="text" ref={refPayer} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
