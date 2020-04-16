import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {RegisterConfig} from 'app/main/register/RegisterConfig';

import {AnalyticsDashboardAppConfig} from 'app/main/dashboards/analytics/AnalyticsDashboardAppConfig';


const routeConfigs = [
    LoginConfig,
    RegisterConfig,
    AnalyticsDashboardAppConfig

];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/login"/>
    }
];

 export default routes;
