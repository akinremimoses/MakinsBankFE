import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiMail, FiLock } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  // const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = async (values) => {
    console.log(values)
    setIsLoading(true);
    const result = await axios.post('http://localhost:5000/auth/login', values)
    console.log(result.data)

    setIsLoading(false);

    console.log(result.data.token)

    if (result.data.token) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      navigate('/dashboard');
    }else{
      console.log('error logging in')
    }
    // setSubmitting(false);

    // if (result.success) {
    // }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center text-success mb-4">Login</h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
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

                    <div className="mb-4">
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

                    <button
                      type="submit"
                      className="btn btn-success w-100 py-2"
                      disabled={isSubmitting || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging in...
                        </>
                      ) : 'Login'}
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Don't have an account? <Link to="/register" className="text-success">Register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;