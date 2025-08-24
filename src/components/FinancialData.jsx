import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import Analytics from './Analytics';

const FinancialData = ({ profile }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    directEquity: 0,
    esops: 0,
    equityPms: 0,
    ulip: 0,
    realEstate: 0,
    realEstateFunds: 0,
    privateEquity: 0,
    equityMutualFunds: 0,
    structuredProductsEquity: 0,
    bankBalance: 0,
    debtMutualFunds: 0,
    endowmentPlans: 0,
    fixedDeposits: 0,
    nps: 0,
    epf: 0,
    ppf: 0,
    structuredProductsDebt: 0,
    goldEtfs: 0,
  });
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('financial_data').insert([
      {
        profile_id: profile.id,
        ...formData,
      },
    ]);
    if (error) {
      alert(error.message);
    } else {
      alert('Financial data saved successfully!');
    }
  };

  if (showAnalytics) {
    return <Analytics profile={profile} />;
  }

  return (
    <div>
      <h2>Financial Data Entry for {profile.name}</h2>
      <button onClick={() => setShowAnalytics(true)}>View Analytics</button>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <h3>High & Medium Risk Assets</h3>
        {Object.keys(formData).map((key) => {
          if (key !== 'date' && key.toLowerCase().includes('equity') || ['esops', 'ulip', 'realEstate', 'realEstateFunds', 'privateEquity'].includes(key)) {
            return (
              <div key={key}>
                <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </div>
            );
          }
          return null;
        })}

        <h3>Low Risk Assets</h3>
        {Object.keys(formData).map((key) => {
          if (key !== 'date' && !key.toLowerCase().includes('equity') && !['esops', 'ulip', 'realEstate', 'realEstateFunds', 'privateEquity'].includes(key)) {
            return (
              <div key={key}>
                <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </div>
            );
          }
          return null;
        })}

        <button type="submit">Save Data</button>
      </form>
    </div>
  );
};

export default FinancialData;