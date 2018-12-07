import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faStroopwafel, faTrash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { default as Form } from './form.jsx';

library.add(
  faEnvelope,
  faStroopwafel,
  faTrash,
  faPlus,
);

export default Form;
