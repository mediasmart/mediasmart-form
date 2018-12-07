import React from 'react';
import Dropdown from './Dropdown.jsx';
import Autocomplete from './Autocomplete.jsx';
import FileInput from './File.jsx';
import './input.css';

const INPUT_TYPES_STATIC_LABEL = ['dropdown', 'autocomplete', 'file'];
const INPUTS = {
  dropdown: Dropdown,
  autocomplete: Autocomplete,
  file: FileInput,
};

function renderInput (props) {
  if (INPUTS[props.type]) return INPUTS[props.type](props);
  const placeholder = props.placeholder || ' ';
  return (<input {...props} placeholder={placeholder} />);
}

export default (props) => {
  let className = '';
  if (INPUT_TYPES_STATIC_LABEL.includes(props.type) || props.placeholder) className = 'float-label';
  return (
    <div data-component-input2 style={{ flexGrow: props.weight || 1 }} {...{ className }}>
      {renderInput(props)}
      <label>{props.label}</label>
    </div>
  );
};
