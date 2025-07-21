import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import axios from 'axios';


const Register = () => {
  // const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    console.log(values);
    console.log(values.name, values.email, values.password);
   const result = await axios.post('https://makinsbankbe.onrender.com/auth/register', {
    name: values.name,
    email: values.email,
    password: values.password
    })
  console.log(result);
   
    setIsLoading(false);
    setSubmitting(false);
    
    if (result.status === 200|| result.status===201) {
      localStorage.setItem('token', result.data.token)
      localStorage.setItem('user', JSON.stringify(result.data.user))
      navigate('/dashboard');
    }else{
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center text-success mb-4">Register</h2>
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiUser />
                        </span>
                        <Field 
                          type="text" 
                          name="name" 
                          className="form-control" 
                          placeholder="Enter your full name" 
                        />
                      </div>
                      <ErrorMessage name="name" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiMail />
                        </span>
                        <Field 
                          type="email" 
                          name="email" 
                          className="form-control" 
                          placeholder="Enter your email" 
                        />
                      </div>
                      <ErrorMessage name="email" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiLock />
                        </span>
                        <Field 
                          type="password" 
                          name="password" 
                          className="form-control" 
                          placeholder="Enter your password" 
                        />
                      </div>
                      <ErrorMessage name="password" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiLock />
                        </span>
                        <Field 
                          type="password" 
                          name="confirmPassword" 
                          className="form-control" 
                          placeholder="Confirm your password" 
                        />
                      </div>
                      <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-success w-100 py-2"
                      disabled={isSubmitting || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Registering...
                        </>
                      ) : 'Register'}
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Already have an account? <Link to="/login" className="text-success">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;