'use strict';

angular.module('jobvacancyApp').controller('JobOfferDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'JobOffer', 'User', 'copy',
        function($scope, $stateParams, $modalInstance, entity, JobOffer, User, copy) {

        $scope.jobOffer = entity;
        $scope.users = User.query();
        $scope.load = function(id) {
            JobOffer.get({id : id}, function(result) {
                $scope.jobOffer = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('jobvacancyApp:jobOfferUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if (copy) {
                $scope.jobOffer.id = null;
            }
            if ($scope.jobOffer.id != null) {
                JobOffer.update($scope.jobOffer, onSaveFinished);
            } else {
                JobOffer.save($scope.jobOffer, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        
        $scope.today = function () {
            $scope.jobOffer.expirationDate = new Date();
        };
        
        $scope.today();
        
        $scope.today =new Date().toISOString();
        
        $scope.open = function($event) {
            $scope.status.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy'
        };

        $scope.status = {
            opened: false
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          var afterTomorrow = new Date();
          afterTomorrow.setDate(tomorrow.getDate() + 2);
          $scope.events =
            [
              {
                date: tomorrow,
                status: 'full'
              },
              {
                date: afterTomorrow,
                status: 'partially'
              }
            ];

          $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
              var dayToCheck = new Date(date).setHours(0,0,0,0);

              for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                  return $scope.events[i].status;
                }
              }
            }

            return '';
          };
}]);
