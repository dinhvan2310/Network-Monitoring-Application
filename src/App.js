import DefaultLayout from 'layouts/DefaultLayout';
import HostGroups from 'pages/dataCollection/hostGroups';
import Hosts from 'pages/dataCollection/hosts';
import TemplateGroups from 'pages/dataCollection/templateGroups';
import Templates from 'pages/dataCollection/templates';
import Login from 'pages/login';
import LatestData from 'pages/monitoring/latestData';
import MonitoringHosts from 'pages/monitoring/monitoringHosts';
import Users from 'pages/users';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from 'utils/RequireAuth';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth><DefaultLayout/></RequireAuth>}>
          <Route path="/users" element={<RequireAuth isAdmin={true}><Users/></RequireAuth>} />
          <Route path="/monitoring/hosts" element={<RequireAuth><MonitoringHosts/></RequireAuth>} />
          <Route path="/monitoring/latestData" element={<RequireAuth><LatestData/></RequireAuth>} />
          <Route path="/dataCollection/hosts" element={<RequireAuth><Hosts/></RequireAuth>} />
          <Route path='/dataCollection/hostGroups' element={<RequireAuth><HostGroups/></RequireAuth>} />
          <Route path='/dataCollection/templates' element={<RequireAuth><Templates/></RequireAuth>} />
          <Route path='/dataCollection/templateGroups' element={<RequireAuth><TemplateGroups/></RequireAuth>} />
        </Route>
        
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App