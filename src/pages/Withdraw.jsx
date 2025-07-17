import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiDollarSign, FiFileText } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Withdraw = () => {
  const { user, loadUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const initialValues = {
    amount: '',
    description: ''
  };

  const validationSchema = Yup.object({
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
    setSuccess('');
    try {
      await axios.post('http://localhost:5000/transactions/withdraw', {
        amount: parseFloat(values.amount),
        description: values.description
      });
      
      // Refresh user data to get updated balance
      await loadUser();
      
      setSuccess(`Successfully withdrew $${values.amount}`);
      resetForm();
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Withdrawal failed. Please try again.');
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
              <h2 className="text-center text-success mb-4">Withdraw Money</h2>
              
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="amount" className="form-label">Amount</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiDollarSign />
                        </span>
                        <Field 
                          type="number" 
                          name="amount" 
                          className="form-control" 
                          placeholder="Enter amount to withdraw" 
                          step="0.01"
                        />
                      </div>
                      <ErrorMessage name="amount" component="div" className="text-danger small" />
                      <small className="text-muted">
                        Available balance: ${user?.balance?.toFixed(2)}
                      </small>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="description" className="form-label">Description</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiFileText />
                        </span>
                        <Field 
                          as="textarea" 
                          name="description" 
                          className="form-control" 
                          placeholder="Enter withdrawal description" 
                          rows="3"
                        />
                      </div>
                      <ErrorMessage name="description" component="div" className="text-danger small" />
                    </div>

                    <div className="d-grid gap-2">
                      <button 
                        type="submit" 
                        className="btn btn-success py-2"
                        disabled={isSubmitting || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Processing...
                          </>
                        ) : 'Withdraw'}
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary py-2"
                        onClick={() => navigate('/dashboard')}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </div>
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

export default Withdraw;