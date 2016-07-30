'use strict';

angular.module('govhackApp.auth', ['govhackApp.constants', 'govhackApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
