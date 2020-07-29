import React from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

const CompletedButton = (props) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>
        <button
          type="text"
          className="btn btn-info"
          htmlFor="completed"
          onClick={props.onCompleted}
        >
          marked as completed
        </button>
      </Popover.Content>
    </Popover>
  );

  const MarkedButton = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant="info">marked as completed</Button>
    </OverlayTrigger>
  );

  return <MarkedButton />;
};

export default CompletedButton;
