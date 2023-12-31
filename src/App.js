import DefaultLayout from 'layouts/DefaultLayout';
import HostGroups from 'pages/dataCollection/hostGroups';
import Hosts from 'pages/dataCollection/hosts';
import Items from 'pages/dataCollection/items';
import TemplateGroups from 'pages/dataCollection/templateGroups';
import Templates from 'pages/dataCollection/templates';
import Trigger from 'pages/dataCollection/trigger';
import Home from 'pages/home';
import Login from 'pages/login';
import ItemGraph from 'pages/monitoring/graph';
import LatestData from 'pages/monitoring/latestData';
import MonitoringHosts from 'pages/monitoring/monitoringHosts';
import Settings from 'pages/settings';
import Test from 'pages/test';
import Users from 'pages/users';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import itemService from 'services/itemService';
import problemService from 'services/problemService';
import triggerService from 'services/triggerService';
import userService from 'services/userService';
import RequireAuth from 'utils/RequireAuth';

const App = () => {

  const func = async () => {
    const res = await userService.test()
    console.log(res)
  }

  // func()


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth><DefaultLayout/></RequireAuth>}>
          <Route path='/' element={<RequireAuth><Home/></RequireAuth>} />
          <Route path="/users" element={<RequireAuth isAdmin={true}><Users/></RequireAuth>} />
          <Route path="/monitoring/hosts" element={<RequireAuth><MonitoringHosts/></RequireAuth>} />
          <Route path="/monitoring/latestData" element={<RequireAuth><LatestData/></RequireAuth>} />
          <Route path="/monitoring/graph" element={<RequireAuth><ItemGraph/></RequireAuth>} />
          <Route path="/dataCollection/hosts" element={<RequireAuth><Hosts/></RequireAuth>} />
          <Route path="/dataCollection/items" element={<RequireAuth><Items/></RequireAuth>} />
          <Route path="/dataCollection/trigger" element={<RequireAuth><Trigger/></RequireAuth>} />
          <Route path='/dataCollection/hostGroups' element={<RequireAuth><HostGroups/></RequireAuth>} />
          <Route path='/dataCollection/templates' element={<RequireAuth><Templates/></RequireAuth>} />
          <Route path='/dataCollection/templateGroups' element={<RequireAuth><TemplateGroups/></RequireAuth>} />
        </Route>
        <Route path="/settings" element={<Settings/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App