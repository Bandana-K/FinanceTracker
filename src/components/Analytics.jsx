import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Analytics = ({ profile }) => {
  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('financial_data')
      .select('*')
      .eq('profile_id', profile.id)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching financial data:', error);
      return;
    }

    if (data && data.length > 0) {
      // Pie chart data (from the most recent entry)
      const latestData = data[data.length - 1];
      const highMediumRisk =
        Object.keys(latestData)
        .filter(k => ['directEquity', 'esops', 'equityPms', 'ulip', 'realEstate', 'realEstateFunds', 'privateEquity', 'equityMutualFunds', 'structuredProductsEquity'].includes(k))
        .reduce((acc, key) => acc + (parseFloat(latestData[key]) || 0), 0);

      const lowRisk =
        Object.keys(latestData)
        .filter(k => ['bankBalance', 'debtMutualFunds', 'endowmentPlans', 'fixedDeposits', 'nps', 'epf', 'ppf', 'structuredProductsDebt', 'goldEtfs'].includes(k))
        .reduce((acc, key) => acc + (parseFloat(latestData[key]) || 0), 0);

      setPieChartData({
        labels: ['High & Medium Risk Assets', 'Low Risk Assets'],
        datasets: [
          {
            data: [highMediumRisk, lowRisk],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      });

      // Line chart data
      const labels = data.map((d) => new Date(d.date).toLocaleDateString());
      const totalAssets = data.map((d) => {
        return Object.keys(d)
          .filter(k => k !== 'id' && k !== 'profile_id' && k !== 'date' && k !== 'created_at')
          .reduce((acc, key) => acc + (parseFloat(d[key]) || 0), 0);
      });

      setLineChartData({
        labels,
        datasets: [
          {
            label: 'Total Assets Over Time',
            data: totalAssets,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      });
    }
  };

  return (
    <div>
      <h2>Visual Analytics for {profile.name}</h2>
      {pieChartData ? (
        <div style={{ width: '50%', margin: 'auto' }}>
          <h3>Asset Distribution</h3>
          <Pie data={pieChartData} />
        </div>
      ) : (
        <p>No financial data available to display analytics.</p>
      )}
      {lineChartData ? (
        <div style={{ width: '80%', margin: '50px auto' }}>
          <h3>Total Assets Over Time</h3>
          <Line data={lineChartData} />
        </div>
      ) : null}
    </div>
  );
};

export default Analytics;