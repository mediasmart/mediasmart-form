import React from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';

const KEYCODE_ENTER = 13;

function parseOptions (options) {
  if (options.every(op => op.value)) {
    options.unshift({ value: '', label: 'Select...' });
  }
  return options || [];
}

function parseValue (value) {
  if (!value) return [];
  if (!Array.isArray(value)) value = [value];
  return value;
}

function getLabelCompiler (options) {
  return (value) => {
    const item = options.find(op => op.value === value);
    if (item && item.label) return item.label;
    return value;
  };
}

function Autocomplete (props) {
  const options = parseOptions(props.options);
  const value = parseValue(props.value);
  const getLabel = getLabelCompiler(options);

  const onAdd = (event) => {
    event.preventDefault();
    value.push(event.target.value);
    props.onChange({ [props.name]: value });
  };

  const onClear = (event) => {
    event.preventDefault();
    props.onChange({ [props.name]: [] });
  };

  const onRemoveItem = (index, event) => {
    event.preventDefault();
    value.splice(index, 1);
    props.onChange({ [props.name]: value });
  };

  const onKeyUp = (event) => {
    if (event.keyCode === KEYCODE_ENTER) {
      event.preventDefault();
      value.push(event.target.value);
      props.onChange({ [props.name]: value });
    }
  };

  const onInput = (event) => {
    if (!event.target.value) return;
    const item = options.find(op => op.value === event.target.value);
    if (item) {
      value.push(event.target.value);
      event.target.value = ''; // @TODO Why doesn't work?
      props.onChange({ [props.name]: value });
    }
  };

  const onUpload = (event) => {
    event.preventDefault();
    console.log('UPLOAD');
  };

  const onDownload = (event) => {
    event.preventDefault();
    const blob = new Blob([value.join('\n')], { type: 'plain/text' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${props.name}.txt`);
    link.setAttribute('target', '_blank');
    link.click();
  };

  const onFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    const parse = base64 => atob(base64.replace(/^data:.+?;base64,/, ''));
    reader.onloadend = (event) => {
      const v = parse(event.target.result).split(/\n+/);
      console.log('FILE CHANGE', v);
      props.onChange({ [props.name]: v });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div data-component-input2-autocomplete>
      <ul>
        {value.map((v, index) => (
          <li key={index}>
            <div title={getLabel(v)}>{getLabel(v)}</div>
            <button onClick={onRemoveItem.bind(null, index)}>&times;</button>
          </li>
        ))}
        <div>
          {props.exact && (
            <select name={props.name} onChange={onAdd} value="" >
              { props.options.map(({ value, label }) => <option key={value} value={value}>{label || value}</option>) }
            </select>
          )}
          {!props.exact && (
            <div data-role="input">
              <input type="text" list="productName" onKeyUp={onKeyUp} onInput={onInput} placeholder="Select..." />
              <datalist id="productName">
                { props.options.map(({ value, label }) => <option key={value} value={value}>{label || value}</option>) }
              </datalist>
            </div>
          )}
          <div data-role="actions">
            <div>
              <button onClick={onUpload}><FAIcon icon='upload'/></button>
              <input type="file" onChange={onFileChange} accept=".txt, .csv" value="" />
            </div>
            <button onClick={onDownload}><FAIcon icon='download'/></button>
            <button onClick={onClear}><FAIcon icon='trash-alt'/></button>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default Autocomplete;
