'use strict';

angular.module('govhackApp', ['govhackApp.auth', 'govhackApp.admin', 'govhackApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match', 'chart.js', //'uiGmapgoogle-maps'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
