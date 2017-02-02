// Make sure to include the `ui.router` module as a dependency
angular.module('uiRouterSample', [
  'uiRouterSample.contacts',
  'uiRouterSample.contacts.service',
  'uiRouterSample.utils.service',
  'ui.router', 
  'ngAnimate'
])

.run( ['$rootScope', '$state', '$stateParams', '$timeout', '$location',  
    function ($rootScope,   $state,   $stateParams, $timeout, $location) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      var steps = [
        { state: 'about', params: { } },
        { state: 'contacts.list', params: { } },
        { state: 'contacts.detail', params: { contactId: "1" } },
        { state: 'contacts.detail', params: { contactId: "42" } },
        { state: 'contacts.detail', params: { contactId: "123" } },
        { state: 'contacts.detail', params: { contactId: "1" } },
        { state: 'contacts.detail', params: { contactId: "42" } },
        { state: 'contacts.detail', params: { contactId: "123" } },
        { state: 'about', params: { } },
        { state: 'contacts.list', params: { } },
        { state: 'contacts.detail', params: { contactId: "1" } },
        { state: 'contacts.list', params: { } },
        { state: 'contacts.detail', params: { contactId: "42" } },
        { state: 'contacts.list', params: { } },
        { state: 'contacts.detail', params: { contactId: "123" } },
        { state: 'contacts.detail.item', params: { contactId: "123", itemId: 'a' } },
        { state: 'contacts.detail.item', params: { contactId: "123", itemId: 'b' } },
        { state: 'contacts.detail.item', params: { contactId: "123", itemId: 'a' } },
        { state: 'contacts.detail.item', params: { contactId: "123", itemId: 'b' } },
        { state: 'contacts.detail.item.edit', params: { contactId: "123", itemId: 'b' } },
        { state: 'contacts.detail.item', params: { contactId: "123", itemId: 'b' } },
        { state: 'contacts.detail.item.edit', params: { contactId: "123", itemId: 'b' } },
        { state: 'contacts.detail.item', params: { contactId: "123", itemId: 'b' } },
        { state: 'contacts.detail.item.edit', params: { contactId: "123", itemId: 'b' } },
      ];

      $rootScope.totalTransitions = 0;
      $rootScope.running = false;

      var idx = 0;
      var tick = function() {
        if (!$rootScope.running) return;
        idx = (idx + 1) % steps.length;
        const go = () => 
            $rootScope.running && $state.go(steps[idx].state, steps[idx].params)
                .then(() => $rootScope.totalTransitions++);

        Promise.resolve($state.transition)
            .then(() => new Promise(resolve => setTimeout(resolve, 50)))
            .then(go)
            .then(tick);
      }

      let scheduledStartTime;
      $rootScope.startStop = function() {
          if ($rootScope.running) {
            stop();
          } else {
            start();
          }
      }

      function start() {
          scheduledStartTime = Date.now() + 2500;

          const countdown = () => {
            $rootScope.countdown = Math.max(0, scheduledStartTime - Date.now());
            if ($rootScope.countdown === 0) {
              $rootScope.running = true; 
              tick();
            } else {
              $timeout(countdown, 50);
            }
          }

          $timeout(countdown, 50);
      }

      function stop() {
          $rootScope.running = false;
      }

      $rootScope.ngVersions = [
        // "1.2.0", "1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5", "1.2.6", "1.2.7", "1.2.8", "1.2.9", "1.2.10", 
        // "1.2.11", "1.2.12", "1.2.13", "1.2.14", "1.2.15", "1.2.16", "1.2.17", "1.2.18", "1.2.19", "1.2.20", 
        // "1.2.21", "1.2.22", "1.2.23", 
        "1.2.27", "1.2.28", "1.2.29", "1.2.30", "1.2.31", "1.2.32", 
        "1.3.0", "1.3.1", "1.3.2", "1.3.3", "1.3.4", "1.3.5", "1.3.6", "1.3.7", "1.3.8", "1.3.9", "1.3.10", 
        "1.3.11", "1.3.12", "1.3.13", "1.3.14", "1.3.15", "1.3.16", "1.3.17", "1.3.18", "1.3.19", "1.3.20", "1.3.36", 
        "1.4.0", "1.4.1", "1.4.2", "1.4.3", "1.4.4", "1.4.5", "1.4.6", "1.4.7", "1.4.8", "1.4.9", "1.4.10", 
        "1.4.11", "1.4.12", "1.4.13", "1.4.14", 
        "1.5.0", "1.5.1", "1.5.2", "1.5.3", "1.5.5", "1.5.6", "1.5.7", "1.5.8", "1.5.9", "1.5.10", "1.5.11", 
        "1.6.0", "1.6.1", 
      ]

      $rootScope.uirVersions = [
        '0.2.8', '0.2.10', '0.2.11', '0.2.13', '0.2.14', '0.2.15', '0.2.16', '0.2.17', '0.2.18', 
        '0.3.0', '0.3.1', '0.3.2', 
        '0.4.0', '0.4.1', '0.4.2', 
        '1.0.0-alpha.1', '1.0.0-alpha.2', '1.0.0-alpha.3', '1.0.0-alpha.4', '1.0.0-alpha.5', '1.0.0-alpha0',
        '1.0.0-beta.1', '1.0.0-beta.2', '1.0.0-beta.3', '1.0.0-rc.1', 
      ]

      $rootScope.ngVersion = localStorage.getItem('ngVersion');
      $rootScope.uirVersion = localStorage.getItem('uirVersion');

      $rootScope.changeNgVersion = () => {
        let newVersion = $rootScope.ngVersion;
        localStorage.setItem('ngVersion', newVersion);
        setTimeout(() => document.location.reload(true), 100);
      }

      $rootScope.changeUIRVersion = () => {
        let newVersion = $rootScope.uirVersion;
        localStorage.setItem('uirVersion', newVersion);
        setTimeout(() => document.location.reload(true), 100);
      }
    }
  ]
)

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {

          // Use a url of "/" to set a state as the "index".
          url: "/",

          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
            '<p>Use the menu above to navigate. ' +
            'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
            '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
            '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'

        })

        ///////////
        // About //
        ///////////

        .state('about', {
          url: '/about',

          // Showing off how you could return a promise from templateProvider
          templateProvider: ['$timeout',
            function (        $timeout) {
              return $timeout(function () {
                return '<p class="lead">UI-Router Resources</p><ul>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/tree/gh-pages/sample">Source for this Sample</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router">GitHub Main Page</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                       '</ul>';
              }, 100);
            }]
        })

        .state('instructions', {
          url: '/leaktest-instructions',
          templateUrl: 'app/instructions.html'
        })
    }
  ]
);
