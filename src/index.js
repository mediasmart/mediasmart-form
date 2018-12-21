import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { default as Form } from './form.jsx';

console.log('FAS', fas);
library.add(fab);
library.add(fas);

export default Form;
