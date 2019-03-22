import React from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import Dropdown from './Dropdown.jsx';
import Autocomplete from './Autocomplete.jsx';
import FileInput from './File.jsx';
import './input.scss';

const INPUT_TYPES_STATIC_LABEL = ['dropdown', 'autocomplete', 'file'];
const INPUTS = {
  autocomplete: Autocomplete,
  dropdown: Dropdown,
  file: FileInput,
};

function renderInput (props) {
  if (INPUTS[props.type]) return INPUTS[props.type](props);
  const placeholder = props.placeholder || ' ';
  return (<input {...props} placeholder={placeholder} />);
}

function parseIcon (icon) {
  if (!icon) return;
  icon = icon.split(' ');
  if (icon.length === 1) icon = icon[0];
  return icon;
}

export default (props) => {
  let className = '';
  if (INPUT_TYPES_STATIC_LABEL.includes(props.type) || props.placeholder) className = 'float-label';
  const icon = parseIcon(props.icon);
  if (icon) className += ' with-icon';
  if (props.value) className += ' with-value';
  return (
    <div data-component-input2 style={{ flexGrow: props.weight || 1 }} {...{ className }} data-type={props.type}>
      <div>
        { props.icon && <i><FAIcon icon={icon} spin={props.spin} /></i> }
        {renderInput(props)}
      </div>
      <label>{props.label}</label>
    </div>
  );
};
