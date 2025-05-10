/// <reference types="vite/client" />

import 'basic-navigation';

declare module 'basic-navigation' {
  export interface BaseActivity {
    name: 'HomeActivity' | 'MyActivity' | 'AddScheduleActivity' | 'NotFoundActivity';
  }
  export interface BaseActivityPath {
    HomeActivity: '/';
    MyActivity: '/my';
    AddScheduleActivity: '/schedules/add';
    NotFoundActivity: '/*path';
  }
  export interface BaseActivityParams {
    HomeActivity: {
      open?: 'toolbar';
    };
  }
}
