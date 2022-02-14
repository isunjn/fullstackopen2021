import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Button from "./style/Button";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setvisible] = useState(false);

  const hidenWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setvisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hidenWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
