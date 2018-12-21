import React from 'react';

function formatSize (bytes) {
  if (bytes >= 1024 * 1024 * 1024) {
    const gb = bytes / 1024 / 1024 / 1024;
    return `${gb.toFixed(2)} GiB`;
  }
  if (bytes >= 1024 * 1024) {
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(2)} MiB`;
  }
  if (bytes >= 1024) {
    const kb = bytes / 1024;
    return `${kb.toFixed(2)} KiB`;
  }
  return `${bytes} bytes`;
}

function getFileDescription (file) {
  if (!file) return 'Select...';
  if (typeof file === 'string') return file;
  const type = file.type ? ` (${file.type})` : '';
  return `${file.name}${type} - ${formatSize(file.size)}`;
}

function File (props) {
  const onChange = (event) => {
    event.preventDefault();
    props.onChange({ [props.name]: event.target.files[0] });
  };
  return (
    <div data-component-input2-file>
      <div>{ getFileDescription(props.value) }</div>
      <input type="file" onChange={onChange} />
    </div>
  );
}

export default File;
