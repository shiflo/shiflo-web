/// <reference types="vite/client" />

import 'basic-navigation';

declare module 'basic-navigation' {
  export interface BaseActivity {
    name: 'HomeActivity' | 'MyActivity' | 'NotFoundActivity';
  }
  export interface BaseActivityPath {
    HomeActivity: '/';
    MyActivity: '/my';
    NotFoundActivity: '/*path';
  }
}
