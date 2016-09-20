materialAdmin
// =========================================================================
// Base controller for common functions
// =========================================================================

    .controller('materialadminCtrl', function ($timeout, $state, $scope) {
    //Welcome Message


    // Detact Mobile Browser
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        angular.element('html').addClass('ismobile');
    }

    // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
    this.sidebarToggle = {
        left: false
        , right: false
    }

    // By default template has a boxed layout
    this.layoutType = localStorage.getItem('ma-layout-status');

    // For Mainmenu Active Class
    this.$state = $state;

    //Close sidebar on click
    this.sidebarStat = function (event) {
        if (!angular.element(event.target).parent().hasClass('active')) {
            this.sidebarToggle.left = false;
        }
    }

    //Listview Search (Check listview pages)
    this.listviewSearchStat = false;

    this.lvSearch = function () {
        this.listviewSearchStat = true;
    }

    //Listview menu toggle in small screens
    this.lvMenuStat = false;


    //Skin Switch
    this.currentSkin = 'blue';

    this.skinList = [
            'lightblue'
            , 'bluegray'
            , 'cyan'
            , 'teal'
            , 'green'
            , 'orange'
            , 'blue'
            , 'purple'
        ]

    this.skinSwitch = function (color) {
        this.currentSkin = color;
    }
})

.controller('headerCtrl', function ($timeout) {
    
})

.controller('homeCtrl', function ($scope, $interval, waterService, airService, lampService, phService, bottleService, logsService, switchService) {

    waterService.getTempData().then(function(data){
            $scope.waterTemp = data; 
        });
    
    airService.getTemp().then(function(data){
            $scope.airTemp = data; 
        });
    
    lampService.getTempData().then(function(data){
            $scope.lampTemp = data;                               
        })
    
    phService.getPh().then(function(data){
        $scope.phValue = data;    
    })

    bottleService.getBottlePercent().then(function(data){
        $scope.bottleStatus = data;
    })

    switchService.getSwitches().then(function(data){
        $scope.switchList = data;    
    })
    
    logsService.getLogs().then(function(data){
        $scope.logsList = data;
    })

    $scope.refresParameters = function () {
        waterService.getTempData().then(function(d){
            $scope.waterTemp = d; 
        });   
        
        airService.getTemp().then(function(data){
            $scope.airTemp = data; 
        });
        
        lampService.getTempData().then(function(data){
            $scope.lampTemp = data;                               
        })
         
        phService.getPh().then(function(data){
            $scope.phValue = data;    
        })
        $scope.$apply()
    }

    $scope.refreshBottle = function () {
        bottleService.getBottlePercent().then(function(data){
            $scope.bottleStatus = data;
        })
    }

    $scope.refreshSwitches = function () {
        switchService.getSwitches().then(function(data){
            $scope.switchList = data;    
        })
    }

    $scope.refreshLogs = function () {
        logsService.getLogs().then(function(data){
            $scope.logsList = data;
        })
        $scope.$apply();
    }

    $scope.toggleSwitch = function (item) {
        switchService.toggleSwitch(item.id).then(function(data){
            $scope.switchList = data; 
        })
    }
    
    $scope.resetSwitch = function (item) {
        swal({
            title: "Odblokować " + item.nazwa
            , text: "Czy chcesz odblokować " + item.nazwa + " ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Odblokuj!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            $scope.resetSwitchConfirm(item)
            swal("Done!", "Odblokowano!", "success");
        });
    }

    // odblokowanie wszystkich przełączników
    $scope.unlockSwitches = function () {
        switchService.unlockSwitches().then(function(data){
            $scope.switchList = data; 
        })
    }
    
    $scope.resetSwitchConfirm = function (item) {
        switchService.unlockSwitch(item.id).then(function(data){
            $scope.switchList = data;
        })
    }
    
    $scope.removeLogs = function () {
        logsService.removeLogs().then(function(data){
            $scope.logsList = data;
        })
    }




})

.controller('lampCtrl', function ($interval, $scope, lampService) {

    $scope.id = 0;
    $scope.modelState = null;
    $scope.modelTimes = null;

    $scope.init = function (id) {
        $scope.id = id;
        
        lampService.getLampState($scope.id).then(function(data){
            $scope.modelState = data;
        })
        
        lampService.getLampTimes($scope.id).then(function(data){
            $scope.modelTimes = data;
        })
    }

    $scope.reset = function () {
        swal({
            title: "Zresetować ?"
            , text: "Czy chcesz restetowć lampe ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Reset!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            lampService.getLampState($scope.id).then(function(data){
                $scope.modelState = data;
            })
        
            lampService.getLampTimes($scope.id).then(function(data){
                $scope.modelTimes = data;
            })
            $scope.$apply();
            swal("Done!", "Zresetowano!", "success");
        });
    }

    $scope.save = function () {
        swal({
            title: "Zapisać ?"
            , text: "Czy chcesz zapisać ustawienia ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Zapisz!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            lampService.saveLampState($scope.id,$scope.modelState).then(function(data){
                $scope.modelState = data;
            })
        
            lampService.saveLampTimes($scope.id,$scope.modelTimes).then(function(data){
                $scope.modelTimes = data;
            })
            $scope.$apply();
            swal("Done!", "Zapisano!", "success");
        });
    }
    
    $scope.addState = function(day){
        day.states.push({time: '10:00',percent:[0,0,0,0]})
    }
    
    $scope.removeState = function(day,state){
        var index = day.states.indexOf(state);
        day.states.splice(index, 1);
    }
    
})

.controller('heaterCtrl', function ($interval, $scope, waterService, heaterService) {

    waterService.getWaterTemp().then(function(data){
        $scope.modeWaterlState = data;
    })
    
    heaterService.getHeaterState().then(function(data){
        $scope.modelHeaterState = data;
    })

    $scope.reset = function () {
        swal({
            title: "Zresetować ?"
            , text: "Czy chcesz restetowć ustawienia ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Reset!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            waterService.getWaterTemp().then(function(data){
                $scope.modeWaterlState = data;
            })
            heaterService.getHeaterState().then(function(data){
                $scope.modelHeaterState = data;
            })
            $scope.$apply();
            swal("Done!", "Zresetowano!", "success");
        });
    }

    $scope.save = function () {
        swal({
            title: "Zapisać ?"
            , text: "Czy chcesz zapisać ustawienia ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Zapisz!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            waterService.setWaterTemp($scope.modeWaterlState).then(function(data){
                $scope.modeWaterlState = data;
            })
            heaterService.setHeaterState($scope.modelHeaterState).then(function(data){
                $scope.modelHeaterState = data;
            })
            $scope.$apply();
            swal("Done!", "Zapisano!", "success");
        });
    }
})

.controller('pompSummaryCtrl', function($interval, $scope, pompsSummaryService){
    pompsSummaryService.getPompsSummary().then(function(data){
        $scope.pompsSummary = data;
    })
})

.controller('pompCtrl', function ($scope, pompService) {

    $scope.id = 0;
    $scope.modelState = null;
    $scope.modelTimes = null;
    
    
    $scope.modelDose = null 

    $scope.init = function (id) {
        $scope.id = id;
        
        pompService.getPompState($scope.id).then(function(data){
            $scope.modelState = data;
        })
        
        pompService.getPompTimes($scope.id).then(function(data){
            $scope.modelTimes = data;
        })
        
        pompService.getDosteState($scope.id).then(function(data){
            $scope.modelDose = data;
        })
    }

    $scope.timesReset = function () {
        swal({
            title: "Zresetować ?"
            , text: "Czy chcesz restetowć stan czasów dla " + $scope.modelState.name + " ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Reset!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            pompService.getPompTimes($scope.id).then(function(data){
                $scope.modelTimes = data;
            })
            $scope.$apply();
            swal("Done!", "Zresetowano!", "success");
        });
    }

    $scope.stateReset = function () {
        swal({
            title: "Zresetować ?"
            , text: "Czy chcesz restetowć stan pompy " + $scope.modelState.name + " ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Reset!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            pompService.getPompState($scope.id).then(function(data){
                $scope.modelState = data;
            })
            $scope.$apply();
            swal("Done!", "Zresetowano!", "success");
        });
    }
    
    $scope.refreshDose = function(){
        pompService.getDosteState($scope.id).then(function(data){
            $scope.modelDose = data;
        })
        $scope.$apply()
    }
    
    $scope.dose = function () {
        swal({
            title: "Podać ?"
            , text: "Podać dawkę "+ $scope.modelDose + "ml dla " + $scope.modelState.name + " ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Podaj!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            pompService.dose($scope.id,$scope.modelDose).then(function(data){
                $scope.modelDose = data;
            })
            $scope.$apply();
            swal("Done!", "Dodano do podania!", "success");
        });
    }
    
    $scope.refill = function () {
        swal({
            title: "Uzupelniono ?"
            , text: "Uzupelniles stan pojemnika dla pompy " + $scope.modelState.name + " ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Uzupelnij!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            pompService.refill($scope.id).then(function(data){
                $scope.modelState = data;
            })
            $scope.$apply();
            swal("Done!", "Uzupelniono!", "success");
        });
    }

    $scope.pompSave = function () {
        swal({
            title: "Zapisać ?"
            , text: "Czy chcesz zapisać ustawienia dla " + $scope.modelState.name + " ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Zapisz!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            pompService.saveState($scope.id, $scope.modelState)
                .then(function(data){
                    $scope.modelState = data
                })
            
            pompService.saveTimes($scope.id, $scope.modelTimes)
                .then(function(data){
                $scope.modelTimes = data
            })
            $scope.$apply()
            swal("Done!", "Zapisano!", "success");
        });
    }
})

.controller('filterCtrl', function ($scope, filterService) {
    
    filterService.getFilterState(1).then(function(data){
        $scope.modelStateFilter1 = data
    })
    
    filterService.getFilterState(2).then(function(data){
        $scope.modelStateFilter2 = data
    })
    
    $scope.resetFilter1 = function(){
         swal({
            title: "Zresetować ?"
            , text: "Czy chcesz restetowć stan filtra " + $scope.modelStateFilter1.name + " ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Reset!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            filterService.getFilterState(1).then(function(data){
                $scope.modelStateFilter1 = data
            })
            $scope.$apply();
            swal("Done!", "Zresetowano!", "success");
        });
    }
    
    $scope.resetFilter2 = function(){
        swal({
            title: "Zresetować ?"
            , text: "Czy chcesz restetowć stan filtra " + $scope.modelStateFilter2.name + " ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Reset!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            filterService.getFilterState(2).then(function(data){
                $scope.modelStateFilter2 = data
            })
            $scope.$apply();
            swal("Done!", "Zresetowano!", "success");
        });
    }
    
    $scope.saveFilter1 = function(){
        swal({
            title: "Zapisać ?"
            , text: "Czy chcesz zapisać ustawienia dla " + $scope.modelStateFilter1.name + " ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Zapisz!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            filterService.setFilterState(1, $scope.modelStateFilter1)
            .then(function(data){
                filterService.getFilterState(1).then(function(data){
                    $scope.modelStateFilter1 = data
                })
            })
            swal("Done!", "Zapisano!", "success");
        });
    }
    
    $scope.saveFilter2 = function(){
        swal({
            title: "Zapisać ?"
            , text: "Czy chcesz zapisać ustawienia dla " + $scope.modelStateFilter2.name + " ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Zapisz!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            filterService.setFilterState(2, $scope.modelStateFilter2)
            .then(function(data){
                filterService.getFilterState(2).then(function(data){
                    $scope.modelStateFilter2 = data
                })
            })
            swal("Done!", "Zapisano!", "success");
        });
    }
})

.controller('co2Ctrl', function ($scope, co2Service) {
    
    co2Service.getState().then(function(data){
        $scope.modelState = data;
    })
    
    co2Service.getTimes().then(function(data){
        $scope.modelTimes = data;
    })
    
    $scope.resetTimes = function(){
          swal({
            title: "Zresetować ?"
            , text: "Czy chcesz restetowć czasy CO2 ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Reset!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            co2Service.getTimes().then(function(data){
                $scope.modelTimes = data;
            })
            $scope.$apply();
            swal("Done!", "Zresetowano!", "success");
        });  
    }
    
    $scope.reset = function(){
        swal({
            title: "Zresetować ?"
            , text: "Czy chcesz restetowć ustawienia CO2 ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Reset!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            co2Service.getState().then(function(data){
                $scope.modelState = data;
            })
            co2Service.getState().then(function(data){
                $scope.modelState = data;
            })
            $scope.$apply();
            swal("Done!", "Zresetowano!", "success");
        });  
    }
    
    $scope.save = function(){
        swal({
            title: "Zapisać ?"
            , text: "Czy chcesz zapisać ustawienia CO2 ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Zapisz!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            co2Service.setSate($scope.modelState).then(function(data){
                $scope.modelState = data;
            })
            co2Service.setTimes($scope.modelTimes).then(function(data){
                $scope.modelTimes = data;
            })
            $scope.$apply()
            swal("Done!", "Zapisano!", "success");
        });
    }
})


.controller('o2Ctrl', function ($scope, o2Service) {
    
    o2Service.getState().then(function(data){
        $scope.modelState = data;
    })
    
    o2Service.getTimes().then(function(data){
        $scope.modelTimes = data;
    })
    
    $scope.resetTimes = function(){
          swal({
            title: "Zresetować ?"
            , text: "Czy chcesz restetowć czasy O2 ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Reset!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            o2Service.getTimes().then(function(data){
                $scope.modelTimes = data;
            })
            $scope.$apply();
            swal("Done!", "Zresetowano!", "success");
        });  
    }
    
    $scope.reset = function(){
        swal({
            title: "Zresetować ?"
            , text: "Czy chcesz restetowć ustawienia O2 ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Reset!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            o2Service.getTimes().then(function(data){
                $scope.modelTimes = data;
            })
            o2Service.getState().then(function(data){
                $scope.modelState = data;
            })
            $scope.$apply();
            swal("Done!", "Zresetowano!", "success");
        });  
    }
    
    $scope.save = function(){
        swal({
            title: "Zapisać ?"
            , text: "Czy chcesz zapisać ustawienia O2 ?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#F44336"
            , confirmButtonText: "Zapisz!"
            , cancelButtonText: "Anuluj"
            , closeOnConfirm: false
        }, function () {
            o2Service.setSate($scope.modelState).then(function(data){
                $scope.modelState = data;
            })
            o2Service.setTimes($scope.modelTimes).then(function(data){
                $scope.modelTimes = data;
            })
            swal("Done!", "Zapisano!", "success");
        });
    }
})















