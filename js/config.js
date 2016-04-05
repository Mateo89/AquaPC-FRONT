materialAdmin
    .config(function ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");


        $stateProvider
        
            //------------------------------
            // HOME
            //------------------------------

            .state ('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level-js',
                                files: [
                                    'vendors/sparklines/jquery.sparkline.min.js',
                                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                    'vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js'
                                ]
                            }
                        ])
                    }
                }
            })


            //------------------------------
            // LAMPY
            //------------------------------
         
            .state ('lamp1', {
                url: '/lamp/1',
                templateUrl: 'views/lamps/lamp1.html'
            })
            
            .state ('lamp2', {
                url: '/lamp/2',
                templateUrl: 'views/lamps/lamp2.html'
            })
        
        
            //------------------------------
            // GRZAŁKI
            //------------------------------
         
            .state ('heaters', {
                url: '/heaters',
                templateUrl: 'views/heaters.html'
            })
        
        
            //------------------------------
            // POMPY
            //------------------------------
         
            .state ('pomp1', {
                url: '/pomp/1',
                templateUrl: 'views/pomps/pomp1.html'
            })
            
            .state ('pomp2', {
                url: '/pomp/2',
                templateUrl: 'views/pomps/pomp2.html'
            })
        
            .state ('pomp3', {
                url: '/pomp/3',
                templateUrl: 'views/pomps/pomp3.html'
            })
        
            .state ('pomp4', {
                url: '/pomp/4',
                templateUrl: 'views/pomps/pomp4.html'
            })
        
            .state ('pomp5', {
                url: '/pomp/5',
                templateUrl: 'views/pomps/pomp5.html'
            })
        
            .state ('pomp6', {
                url: '/pomp/6',
                templateUrl: 'views/pomps/pomp6.html'
            })
        
            .state ('filters', {
                url: '/filters',
                templateUrl: 'views/filters.html'
            })
        
            .state ('co2', {
                url: '/co2',
                templateUrl: 'views/co2.html'
            })
        
            .state ('o2', {
                url: '/o2',
                templateUrl: 'views/o2.html'
            })
    });