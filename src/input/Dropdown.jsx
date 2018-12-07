import React from 'react';

function Dropdown (props) {
  if (props.options.every(op => op.value)) props.options.unshift({ value: '', label: 'Select...' });
  const onDropdownChange = (event) => {
    event.preventDefault();
    props.onChange({ [props.name]: event.target.value || undefined });
  };
  return (
    <select name={props.name} value={props.value} onChange={onDropdownChange} placeholder={props.placeholder}>
      { props.options.map(({ value, label }) => <option key={value} value={value}>{label || value}</option>) }
    </select>
  );
}
export default Dropdown;
