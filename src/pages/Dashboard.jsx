import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Dashboard = () => {
  // Removed AuthContext and user dependency
  const [transactions, setTransactions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  let token = localStorage.getItem('token')

  let user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchTransactions = async () => {
      console.log(token);
      try {
        const res = await axios.get('https://makinsbankbe.onrender.com/transactions', {
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log(res)
        setTransactions(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    const currentUser = async () => {
      console.log(token);
      try {
        const res = await axios.get('https://makinsbankbe.onrender.com/user', {
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log(res.data)
        setCurrentUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data))
      } catch (err) {
        console.error(err.response?.data?.message || 'Failed to fetch User');
      } finally {
        setLoading(false);
      }
    };

    currentUser();
    fetchTransactions();

  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-success">Account Summary</h3>
              <hr />
              <div className="mb-3">
                <h5 className="text-muted">Account Number</h5>
                <h4>{user?.accountNumber}</h4>
              </div>
              <div className="mb-3">
                <h5 className="text-muted">Account Balance</h5>
                <h2 className="text-success">${currentUser?.balance?.toFixed(2)}</h2>
              </div>
              <div className="d-grid gap-2">
                <Link to="/transfer" className="btn btn-success">Transfer Money</Link>
                <Link to="/withdraw" className="btn btn-outline-success">Withdraw Money</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-success">Recent Transactions</h3>
              <hr />
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : transactions.length === 0 ? (
                <p className="text-muted">No transactions yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((txn) => (
                        <tr key={txn._id}>
                          <td>{new Date(txn.date).toLocaleString()}</td>
                          <td>
                            <span className={`badge ${
                              txn.type === 'transfer' ? 'bg-info' : 
                              txn.type === 'withdrawal' ? 'bg-danger' : 'bg-success'
                            }`}>
                              {txn.type}
                            </span>
                          </td>
                          <td className={
                            txn.type === 'transfer'
                              ? (txn.description?.toLowerCase().includes('received') ? 'text-success' : 'text-danger')
                              : (txn.type === 'withdrawal' ? 'text-danger' : 'text-success')
                          }>
                            {txn.type === 'transfer'
                              ? (txn.description?.toLowerCase().includes('received') ? '+' : '-')
                              : (txn.type === 'withdrawal' ? '-' : '+')}
                            ${txn.amount.toFixed(2)}
                          </td>
                          <td>{txn.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;