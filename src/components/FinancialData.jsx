import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import Analytics from './Analytics';

const FinancialData = ({ profile }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    direct_equity: 0,
    esops: 0,
    equity_pms: 0,
    ulip: 0,
    real_estate: 0,
    real_estate_funds: 0,
    private_equity: 0,
    equity_mutual_funds: 0,
    structured_products_equity: 0,
    bank_balance: 0,
    debt_mutual_funds: 0,
    endowment_plans: 0,
    fixed_deposits: 0,
    nps: 0,
    epf: 0,
    ppf: 0,
    structured_products_debt: 0,
    gold_etfs: 0,
  });

  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the authenticated user's ID
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
      return;
    }

    // Add user_id to the data being sent
    const dataToInsert = {
      ...formData,
      profile_id: profile.id,
      user_id: user.id, // Ensure user_id is passed correctly
    };

    // Insert data into the financial_data table
    const { data, error: insertError } = await supabase
      .from("financial_data")
      .insert([dataToInsert]);

    if (insertError) {
      console.error("Error inserting financial data:", insertError);
    } else {
      console.log("Financial data saved successfully:", data);
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