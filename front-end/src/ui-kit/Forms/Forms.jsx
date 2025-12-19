import * as yup from 'yup';
import { Formik, Form } from 'formik'
import '../../styles/main.scss'
import InputField from '../InputField/InputField';

const userSchema = yup.object({
  firstName: yup.string().required("Field is required"),
  lastName: yup.string().required("Field is required"),
  email: yup.string().required("Field is required").email("Enter a valid email address"),
  phone: yup.string().required("Filed is required").matches(
    /^(\+?\d{1,3}[- ]?)?\d{10}$/,
    "Phone number is not valid"
  ),
  password: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters'),
})

export default function TestForm() {

  return (
    <>
      <Formik
        initialValues={{
            firstName: '',
            password: '',
          }}
        validationSchema={userSchema}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-[32px]">
            <InputField 
              type={'text'} 
              placeholder={'Enter your first name'} 
              title={'First name*'} 
              name={'firstName'} 
              errors={errors} 
              touched={touched} 
            />
            <InputField 
              type={'password'} 
              placeholder={'Enter your password'} 
              title={'Password*'} 
              name={'password'} 
              errors={errors} 
              touched={touched} 
            />
          </Form>
        )}
      </Formik>
    </>
  )
}