import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';

const Transfer = () => {
  let token = localStorage.getItem('token')
  // Removed AuthContext and user dependency
  let user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    recipientAccount: '',
    amount: '',
    description: ''
  };

  const validationSchema = Yup.object({
    recipientAccount: Yup.string()
      .required('Recipient account is required')
      .matches(/^MAK\d{6}$/, 'Account number must start with MAK followed by 6 digits'),
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive')
      .max(user?.balance || 0, 'Insufficient balance'),
    description: Yup.string()
      .required('Description is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post('https://makinsbankbe.onrender.com/transactions/transfer', {
        recipientAccount: values.recipientAccount,
        amount: parseFloat(values.amount),
        description: values.description
      },
      {
        headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
      resetForm();
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center text-success mb-4">Transfer Money</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="recipientAccount" className="form-label">Recipient Account Number</label>
                      <Field 
                        type="text" 
                        name="recipientAccount" 
                        className="form-control" 
                        placeholder="Enter recipient account (e.g., MAK123456)" 
                      />
                      <ErrorMessage name="recipientAccount" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="amount" className="form-label">Amount</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <Field 
                          type="number" 
                          name="amount" 
                          className="form-control" 
                          placeholder="Enter amount" 
                          step="0.01"
                        />
                      </div>
                      <ErrorMessage name="amount" component="div" className="text-danger small" />
                      <small className="text-muted">Available balance: ${user?.balance?.toFixed(2)}</small>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="description" className="form-label">Description</label>
                      <Field 
                        as="textarea" 
                        name="description" 
                        className="form-control" 
                        placeholder="Enter description" 
                        rows="3"
                      />
                      <ErrorMessage name="description" component="div" className="text-danger small" />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-success w-100 py-2"
                      disabled={isSubmitting || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : 'Transfer'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;