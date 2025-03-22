import React from 'react';
import MembershipList from './components/MembershipList';
import DashboardHeader from './components/DashboardHeader';

const Dashboard = async () => {
  return (
    <main className='max-w-screen-lg mx-4 mt-10 lg:mx-auto'>
      <DashboardHeader />
      <MembershipList />
    </main>
  );
};

export default Dashboard;
