import { array, string, func, object } from 'prop-types';
import React from 'react';
import Input from './input/index.jsx';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { makeDeepObject, parseFieldsValue, patch } from './modules';
import './form.scss';

function renderInput (props) {
  return (<Input {...props} />);
}

function Field (props) {
  return renderInput(props);
}

class Form extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: parseFieldsValue(this.props.fields, this.props.value),
    };
    this.onAddForm = this.onAddForm.bind(this);
    this.onRemoveForm = this.onRemoveForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps (props) {
    if (props.value !== this.state.value) this.setState({ value: parseFieldsValue(props.fields, props.value) });
  }

  onAddForm (location) {
    return (event) => {
      event.preventDefault();
      const { value } = this.state;
      const key = location.slice().pop();
      value[key] = value[key] || [];
      if (!Array.isArray(value[key])) value[key] = [value[key]];
      value[key].push({ _id: Math.random().toString(36) });
      this.setState({ value });
      if (this.props.onChange) this.props.onChange(value);
    };
  }

  onRemoveForm (location, index) {
    return (event) => {
      event.preventDefault();
      const { value } = this.state;
      const key = location.slice().pop();
      value[key].splice(index, 1);
      this.setState({ value });
      if (this.props.onChange) this.props.onChange(value);
    };
  }

  onChange (changes) {
    const { value } = this.state;
    if (changes.target) changes = { [changes.target.name]: changes.target.value };
    const index = this.props.location[this.props.location.length - 1];
    let key = this.props.location.pop();
    patch(value, changes);
    this.setState({ value });

    if (this.props.onChange) {
      let valueForParent = value;
      if (parseInt(index) == index) { // This is a "multiple" form
        const tmp = this.props.value;
        tmp[index] = value;
        valueForParent = tmp;
        valueForParent = { [index]: value };
        key = this.props.location.pop();
        valueForParent = { [index]: value };
      }
      if (key && !(Object.keys(value).join('') === key)) valueForParent = { [key]: valueForParent };
      const changesForParent = makeDeepObject(valueForParent);
      console.log('CHANGES FOR PARENT', changesForParent);
      this.props.onChange(changesForParent);
    }
  }

  onSubmit (event) {
    event.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state.value);
  }

  renderContent (label, fields, location, value, properties = { 'data-component-form2': true }) {
    fields = fields || this.props.fields;
    location = location || this.props.location;
    value = value || this.props.value || {};
    return (
      <div {...properties}>
        {/* { label && <label>{label}</label> } */}
        { label && <label>{label}</label> }
        {
          fields.map((field) => {
            if (Array.isArray(field)) return this.renderContent(null, field, location, value, { 'data-component-row': true });
            // if (Array.isArray(field)) return <Form location={location} value={value} onChange={this.onChange} fields={field} />;

            const newLocation = location.slice();
            newLocation.push(field.name);

            if (field.fields) {
              if (!field.multiple) {
                return (<Form key={field.name} {...field} location={newLocation} onChange={this.onChange} value={value[field.name]} />);
              }
              let fieldValue = value[field.name] || [];
              if (!Array.isArray(fieldValue)) fieldValue = [fieldValue];
              return (
                <div data-component-form2="multiple">
                  <label>{field.label || field.name}</label>
                  { fieldValue.map((val, index) => (
                    <div>
                      <Form
                        key={index}
                        {...field}
                        label={null}
                        location={newLocation.concat([index])}
                        onChange={this.onChange}
                        value={val}
                        actions={[{ icon: 'trash', onClick: this.onRemoveForm(newLocation, index) }]}
                      />
                    </div>
                  ))
                  }
                  <div><button className="square" onClick={this.onAddForm(newLocation)}><FAIcon icon="plus" /></button></div>
                </div>
              );
            }
            const fieldValue = (field.name in value) || !field.value ? value[field.name] : field.value;
            return (<Field key={field.name} {...field} label={this.props.format_label(field)} location={newLocation} onChange={this.onChange} value={fieldValue} />);
          })
        }
        {
          (this.props.actions || []).map(({ icon, onClick }) => (
            <div data-component-action>
              <a href="" onClick={onClick}>
                g
                <FAIcon icon="trash" />
              </a>
            </div>
          ))
        }
      </div>
    );
  }

  render () {
    const { label, location, onSubmit } = this.props;
    if (location.length) return (<div>{this.renderContent(label)}</div>);
    return (
      <form data-component-mediasmart-form onSubmit={this.onSubmit} autoComplete="off">
        {this.renderContent(label)}
        <div>ANTES <FAIcon icon="stroopwafel" spin/> DESPUES</div>
        { onSubmit && <input type="submit" value="Submit" /> }
      </form>
    );
  }
}

Form.propTypes = {
  fields: array,
  format_label: func,
  label: string,
  location: array,
  onChange: func,
  onSubmit: func,
  value: object,
};

Form.defaultProps = {
  fields: [],
  format_label: ({ name, label }) => label || name,
  label: undefined,
  location: [],
  onChange: undefined,
  onSubmit: undefined,
  value: undefined,
};

export default Form;
