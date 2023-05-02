import * as Yup from 'yup';

export default 
  Yup.object().shape({
    cvv: Yup.string().required('Required').min(3, "Invalid cvv").max(3, "Invalid cvv"),
  })