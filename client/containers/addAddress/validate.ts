import * as Yup from 'yup';

export default 
  Yup.object().shape({
    mobile_number: Yup.string().required('Required'),
    pin_code: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    landmark: Yup.string().required('Required'),
  })