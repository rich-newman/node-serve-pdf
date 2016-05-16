angular.module("Demo", []).controller("DemoCtrl", function($scope, $http,$window, $q ) {
  var url = 'http://localhost:8000/Example-PDF.pdf';
  //var url = 'http://www.bamfords.co.uk/wp-content/uploads/2014/06/Example-PDF.pdf';
  $scope.works = function() {
      createPDFXMLHttpRequest(url, 'exampleToken');
  }
  
  $scope.doesntWork = function() {
      createPDFHttp(url, 'exampleToken');
  }
  
  function createPDFXMLHttpRequest(url, token) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.setRequestHeader("token", token);
    xhr.onload = function (e) {
        if (this.status == 200) {
            var file = new Blob([this.response], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            $window.open(fileURL, '_blank');
        }
    };

    xhr.send();
  }
  
  function createPDFHttp(url, token){
    var config = {
      url: url,
      method: 'GET',
      responseType: 'arraybuffer',
      headers: {
          'Accept':'*/*',
          "token": token
      }
    }
    
    $http(config)
        .success(function (response) {
            var file = new Blob([response], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank')
        });
  }

});