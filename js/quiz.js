(function(){

	var app = angular.module('myQuiz',[]);
    
    app.controller('QuizController',['$scope','$http','$sce',function($scope,$http,$sce){
        
        $scope.score = 0;
        $scope.active_question = -1;
        $scope.active_question_answered = 0;
        $scope.percentage = 0;
        
        $http.get('quiz_data.json').then(function(quizData){
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
        });
        
        $scope.selectAnswer = function(qIndex,aIndex){
            var questionState = $scope.myQuestions[qIndex].questionState;
            
            if(questionState != 'answered'){
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                var correctAnswer = $scope.myQuestions[qIndex].correct;
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;
                
                if(aIndex === correctAnswer){
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                }else{
                    
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                    
                }
                
                $scope.myQuestions[qIndex].questionState = "answered";
                
            }
            
            $scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(2);
        }
        
        $scope.isSelected = function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        }
        
        $scope.isCorrect = function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        }
        
        $scope.selectContinue = function(){
            return $scope.active_question += 1;
        }
        
        $scope.createShareLinks = function(percentage){
            var url = 'www.saturnquiz.com';
            var emaillink = '<a class="btn email" href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored a '+percentage+'% on this quiz about Saturn. Try to beat my score at '+url+'">Email a friend</a>';
            var twitterlink = '<a class="btn twitter" target="_blanc" href="http://twitter.com/share?text=I scored '+percentage+'% on this quiz about Saturn. Try to beat my score at&amp;hashtags=SaturnQuiz&amp;url='+url+'">Tweet your score</a>';
            var newMarkup = emaillink + twitterlink;
            return $sce.trustAsHtml(newMarkup);
        }
        
    }]);

})();