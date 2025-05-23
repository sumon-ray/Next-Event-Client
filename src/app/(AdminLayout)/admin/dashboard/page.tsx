import { TDashboardMeta } from '@/app/types/dashboard.type';
import DashboardAnalysis from '@/components/modules/adminDashboard/analytics/page'
import { getMeta } from '@/services/MetaService'
import React from 'react'


const Dashboard = async() => {
  const data = await getMeta();
  const metaData: TDashboardMeta = data.data;

    if (!data?.data) {
    return <div className="text-red-500 p-4">Failed to load dashboard data.</div>;
  }
  // console.log(data);
  return (
    <div>
    
      <DashboardAnalysis metaData={metaData} />
  
    </div>
  )
}

export default Dashboard



export const dynamic = 'force-dynamic';
