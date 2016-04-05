materialAdmin

    // =========================================================================
    // Header Messages and Notifications list Data
    // =========================================================================

    .service('waterService',[ '$http', function($http){
        this.getTempData = function(){
            //return { "warning": 1, "temp": 30.2 }
            
            return $http.get('http://localhost:5000/api/state/water')
                  .then(function successCallback(response) {
                    return response.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.getWaterTemp = function(){
            //return { temp: 30.2 }
            return $http.get('http://localhost:5000/api/settings/water')
                .then(function successCallback(response) {
                    return response.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        };
        
        this.setWaterTemp = function(temp){
            return $http.put('http://localhost:5000/api/settings/water',temp)
                .then(function successCallback(response) {
                    return response.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        };
    }])

    .service('heaterService', function($http){
        this.getHeaterState = function(){
            //return { on: true, water_change_on: true }
            
             return $http.get('http://localhost:5000/api/settings/heater')
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.setHeaterState = function(model){
            return $http.put('http://localhost:5000/api/settings/heater',model)
                .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
    })

    .service('airService', ['$http', function($http){
        this.getTemp = function(){
            //return { temp: 25.5 }
            
            return $http.get('http://localhost:5000/api/state/air')
                  .then(function successCallback(response) {
                    return response.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
    }])

    .service('lampService', ['$http',function($http){
        this.getTempData = function(){
            //return { warning: 0, temp: 45.4 }
            
            return $http.get('http://localhost:5000/api/state/lamp')
                  .then(function successCallback(response) {
                    return response.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.getLampTimes = function(id){
            return $http.get('http://localhost:5000/api/settings/lamp/'+ id+ '/times')
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        this.getLampState = function(id){
            return $http.get('http://localhost:5000/api/settings/lamp/'+ id + '/state')
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.saveLampState = function(id,state){
            return $http.put('http://localhost:5000/api/settings/lamp/'+ id + '/state',state)
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        this.saveLampTimes = function(id,times){
            return $http.put('http://localhost:5000/api/settings/lamp/'+ id + '/times',times)
                  .then(function successCallback(response) {
                    console.log(response)
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        
    }])
    
    .service('phService',['$http', function($http){
        this.getPh = function(){
            //return { warning: 0, value: 6.5 }
            
            return $http.get('http://localhost:5000/api/state/ph')
                  .then(function successCallback(response) {
                    return response.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
    }])

    .service('bottleService',['$http',function($http){
        this.getBottlePercent = function(){
            
            return $http.get('http://localhost:5000/api/state/bottle')
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
    }])

    .service('switchService',['$http',function($http){
        this.getSwitches = function() {
            //return [
            //    { 'name': 'Filtr 1', 'override': 0, 'on': 1, 'img': 'img/fan-128.png' },
            //    { 'name': 'Filtr 2', 'override': 0, 'on': 0, 'img': 'img/fan-128.png'},
            //    { 'name': 'Grzałka', 'override': 0, 'on': 0, 'img': 'img/heater128.png'},
            //    { 'name': 'Grzałka LED', 'override': 0, 'on': 0, 'img': 'img/heater128.png'},
            //    { 'name': 'O2', 'override': 0, 'on': 1, 'img': 'img/o2v2128.png' },
            //    { 'name': 'CO2', 'override': 0, 'on': 1,'img': 'img/co2128.png' },
            //    { 'name': 'Karmnik', 'override': 0, 'on': 0, 'img': "img/feeder128.png" },
            //]
            
            return $http.get('http://localhost:5000/api/state/switches')
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.toggleSwitch = function(id) {
            return $http.put('http://localhost:5000/api/actions/switches/' + id)
                  .then(function successCallback(response) {
                    return response.data.data
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.unlockSwitch = function(id){
            return $http.delete('http://localhost:5000/api/actions/switches', id)
                  .then(function successCallback(response) {
                    return response.data.data
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.unlockSwitches = function(){
            return $http.delete('http://localhost:5000/api/actions/switches')
                  .then(function successCallback(response) {
                    return response.data.data
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
    }])

    .service('logsService', function($http){
        this.getLogs = function(){
            return $http.get('http://localhost:5000/api/state/logs')
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
            }
        
        this.removeLogs = function(){
            return $http.delete('http://localhost:5000/api/state/logs')
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
    })

    .service('pompService',['$http',function($http){
        this.getPompTimes = function(id){
            return $http.get('http://localhost:5000/api/settings/pomp/'+ id +'/times')
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
                             
        this.getPompState = function(id) {
            return $http.get('http://localhost:5000/api/settings/pomp/'+ id +'/state')
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.refill = function(id){
            return $http.put('http://localhost:5000/api/actions/pomp/'+ id +'/refill')
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.saveTimes = function(id,times){
            return $http.put('http://localhost:5000/api/settings/pomp/'+ id +'/times',times)
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.saveState = function(id,state){
            return $http.put('http://localhost:5000/api/settings/pomp/'+ id +'/state',state)
                  .then(function successCallback(response) {
                    return response.data.data;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.getDosteState = function(id){
            return $http.get('http://localhost:5000/api/settings/pomp/'+ id +'/dose')
                  .then(function successCallback(response) {
                    return response.data.dose;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
        this.dose = function(id,dose){
            return $http.put('http://localhost:5000/api/actions/pomp/'+ id +'/dose',dose)
                  .then(function successCallback(response) {
                    return response.data.dose;
                  }, function errorCallback(response) {
                    console.error(response);
                  })
        }
        
    }])

    .service('filterService',['$http',function($http){
        this.getFilterState = function(id){
            return $http.get('http://localhost:5000/api/settings/filter/'+id+'/state')
                    .then(function successCallback(response) {
                        return response.data.data;
                      }, function errorCallback(response) {
                        console.error(response);
                      })
        }
    
        this.setFilterState = function(id,state){
            return $http.put('http://localhost:5000/api/settings/filter/'+id+'/state',state)
                    .then(function successCallback(response) {
                        return response.data.data;
                      }, function errorCallback(response) {
                        console.error(response);
                      })
        }
    }])

    .service('co2Service',['$http',function($http){
        this.getState = function(){
            return $http.get('http://localhost:5000/api/settings/co2/state')
                    .then(function successCallback(response) {
                        return response.data.data;
                      }, function errorCallback(response) {
                        console.error(response);
                    })
        }

        this.getTimes = function(){
            return $http.get('http://localhost:5000/api/settings/co2/times')
                    .then(function successCallback(response) {
                        return response.data.data;
                      }, function errorCallback(response) {
                        console.error(response);
                    })
        };
        this.setTimes = function(model) {
            return $http.put('http://localhost:5000/api/settings/co2/times',model)
                    .then(function successCallback(response) {
                        return response.data.data;
                      }, function errorCallback(response) {
                        console.error(response);
                    })
        };

        this.setSate = function(model){
            return $http.put('http://localhost:5000/api/settings/co2/state',model)
                    .then(function successCallback(response) {
                        return response.data.data;
                      }, function errorCallback(response) {
                        console.error(response);
                    })
        };
    }])

    .service('o2Service',['$http',function($http){
        this.getState = function(){
            return $http.get('http://localhost:5000/api/settings/o2/state')
                    .then(function successCallback(response) {
                        return response.data.data;
                      }, function errorCallback(response) {
                        console.error(response);
                    })
        }

        this.getTimes = function(){
            return $http.get('http://localhost:5000/api/settings/o2/times')
                    .then(function successCallback(response) {
                        return response.data.data;
                      }, function errorCallback(response) {
                        console.error(response);
                    })
        };
        this.setTimes = function(model) {
            return $http.put('http://localhost:5000/api/settings/o2/times',model)
                    .then(function successCallback(response) {
                        return response.data.data;
                      }, function errorCallback(response) {
                        console.error(response);
                    })
        };

        this.setSate = function(model){
            return $http.put('http://localhost:5000/api/settings/o2/state',model)
                    .then(function successCallback(response) {
                        return response.data.data;
                      }, function errorCallback(response) {
                        console.error(response);
                    })
        };
    }])
