import React from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

const ConfirmPopover = (props) => {
  const popover = (
    <Popover id="popover-container">
      <Popover.Title as="h3">{props.confirmText}</Popover.Title>
      <Popover.Content>
        <Button
          type="text"
          className="btn btn-primary"
          htmlFor=""
          onClick={props.onCompleted}
        >
          confirm
        </Button>
      </Popover.Content>
    </Popover>
  );

  const MarkedButton = () => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <Button variant="info" id="share_complete_buttons">
        {props.buttonText}
      </Button>
    </OverlayTrigger>
  );

  return <MarkedButton />;
};

export default ConfirmPopover;
