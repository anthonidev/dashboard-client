import React, { ReactElement } from "react";
import DasboardLayout from "../../components/layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <div>
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <DasboardLayout title="Dashboard | Belnmont" content="Content Page">
      {page}
    </DasboardLayout>
  );
};
export default Dashboard;
