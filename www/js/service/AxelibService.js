MyApp.angular.factory('AxelibService', ['$document', '$http', '$q', function ($document, $http, $q) {

    var service = {};
    let ax = MyApp.ax;
    
    service.test = function() {
        return $http.get('https://api.axelib.io/0.1/');
    };
    
    //LOGIN METHOD
    service.login = function(email, password) {
        
        var deferred = $q.defer();
        
        ax.login(email, password, function(e) {
            deferred.resolve(e);
        }, function(e, a, t) {
            var strMessage = "Désolé, une erreur s'est produite !";
            switch(a.code) {
                case 3002:
                    strMessage = "Email ou mot de passe erroné !";
                    break;
                case 3004:
                    strMessage = "Veuiller valider votre compte en suivant le lien reçu à votre inscription";
                    break;
                default:
                    break;
            }
            deferred.reject(strMessage);
        });
        
        return deferred.promise;
    };
    
    //LOGIN METHOD
    service.register = function(login, password, data) {
        
        var deferred = $q.defer();
        
        ax.register(login, password, function(e) {
            deferred.resolve(e);
        }, function(e) {
            deferred.reject("!!! error : " + e);
        }, data);
        
        return deferred.promise;
    };
    
    //FUNCTION LIST
    service.list = function(entity, data, pagination, listItem) { //pagination ex: "1/25" for 25 items of page 1
        
        var deferred = $q.defer();
        
        ax.ServerCall("list", entity, data, pagination, function(e) {
            deferred.resolve(e);
		}, function(e) {
			deferred.reject("!!! error : " + e);
		}, function(e) {
            deferred.reject("!!! timeout : " + e);
        }, listItem);
        
        return deferred.promise;
    };
    
    //FUNCTION GET
    service.get = function(entity, id) {
        
        var deferred = $q.defer();
        
        ax.ServerCall("get", entity, null, id, function(e) {
            deferred.resolve(e);
		}, function(e) {
			deferred.reject("!!! error : " + e);
		});
        
        return deferred.promise;
    };
    
    //FUNCTION POST
    service.post = function(entity, data) {
        
        var deferred = $q.defer();
        
        ax.ServerCall("post", entity, data, null, function(e) {
            deferred.resolve(e);
		}, function(e) {
			deferred.reject("!!! error : " + e);
		});
        
        return deferred.promise;
    };
    
    //FUNCTION UPDATE
    service.update = function(entity, data, id) {
        
        var deferred = $q.defer();
        
        ax.ServerCall("update", entity, data, id, function(e) {
            deferred.resolve(e);
		}, function(e) {
			deferred.reject("!!! error : " + e);
		});
        
        return deferred.promise;
    };
    
    //FUNCTION DELETE
    service.delete = function(entity, id) {
        
        var deferred = $q.defer();
        
        ax.ServerCall("delete", entity, null, id, function(e) {
            deferred.resolve(e);
		}, function(e) {
			deferred.reject("!!! error : " + e);
		});
        
        return deferred.promise;
    };
    
    //FUNCTION SQL
    service.sql = function(sql) {
        
        var deferred = $q.defer();
        
        ax.ServerCall("sql", "query", { "sql": sql }, id, function(e) {
            deferred.resolve(e);
		}, function(e) {
			deferred.reject("!!! error : " + e);
		});
        
        return deferred.promise;
    };
    
    //FUNCTION QUERY
    service.query = function(query, version, data) {
        
        var deferred = $q.defer();
        
        ax.ServerCall("query", query, data, version, function(e) {
            deferred.resolve(e);
		}, function(e) {
			deferred.reject("!!! error : " + e);
		});
        
        return deferred.promise;
    };
    
    //FUNCTION MAIL
    service.mailTransaction = function(data, id_user) {
        
        var deferred = $q.defer();
        
        ax.mail(id_user, data, function(e) {
            deferred.resolve(e);
		}, function(e) {
            console.log("error mail : " + e);
			deferred.reject("!!! error : " + e);
		});
        
        return deferred.promise;
    };
    
    //FUNCTION WATCH
    service.watch = function(entity, callback) {
        
        var deferred = $q.defer();
        
        ax.watch.Add(entity, ax, function(e) {
            callback(e);
        });
        
        return deferred.promise;
        
    };
    
    //FUNCTION WATCH
    service.stopWatch = function(entity, callback) {
        
        var deferred = $q.defer();
        
        ax.watch.Remove(entity);
        
        return deferred.promise;
        
    };
    
    //FUNCTION WATCH
    service.leave = function(callback) {
        
        var deferred = $q.defer();
        
        ax.leave(function(e) {
            if(callback) callback(e);
            deferred.resolve(e);
        });
        
        return deferred.promise;
        
    };
    
    return service;
    
}]);



