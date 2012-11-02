var QuizConstructor = {
  relationship: null,
  edges : null,
  attrib : null,
  value: null,
  answers: null,
  end:null,
  start:null,
  numberOfRels: 430,
  counter: 0,
  choices: 4,
  getAnswer: function(ind) {
     var jumpingTemp = Math.floor(Math.random()*QuizConstructor.numberOfRels);
     jQuery.ajax({
         url: GraphManager.HOST + "db/data/relationship/" + jumpingTemp,
         success: function(response){
//           if (response.type === QuizConstructor.attrib)
//           {
              jQuery.ajax({
                 url: response.start,
                 success: function(response){
                    QuizConstructor.answers[ind] = response.data.name;
                    QuizConstructor.counter++;
                    if(QuizConstructor.counter < QuizConstructor.choices - 1)
                    {
                    }else
                    {
                    QuizConstructor.setQuiz("FREEBASE_GRAPH");
                    }
                 },
                 failed: function() {
                       console.log('*************************ERROR***********************');
                 }
              });
//            }
          },
          failed: function() {
               console.log('*************************ERROR***********************');
         }
      });
  },
  createQuiz: function(graph_type){
    QuizConstructor.answers = [];
    var jumping = Math.floor(Math.random()*QuizConstructor.numberOfRels);
    jQuery.ajax({
      url: GraphManager.HOST + "db/data/relationship/" + jumping,
      success: function(response){
      QuizConstructor.relationship = response;
      QuizConstructor.answers=[];
      //Adding question and correct answer
      QuizConstructor.attrib = QuizConstructor.relationship.type;
      
      jQuery.ajax({
        url: QuizConstructor.relationship.end,
        success: function(response){
          QuizConstructor.end = response;
          QuizConstructor.answers=[];
          
          QuizConstructor.value = QuizConstructor.end.data.name;
          jQuery.ajax({
            url: QuizConstructor.relationship.start,
            success: function(response){
              QuizConstructor.start = response;
              QuizConstructor.correct = QuizConstructor.start.data.name;
              QuizConstructor.counter = 0;
              console.log(QuizConstructor.correct);
              QuizConstructor.answers[0] = QuizConstructor.correct;
              //Adding incorrect answers
              for(var i=1;i<QuizConstructor.choices;i++)
              {
                  QuizConstructor.getAnswer(i);
              }

            }
        });
      }
    });
  },
  failure : function () {
        console.log('fallo');
        //Ext.Viewport.setMasked(false);
        //Ext.Msg.alert(i18n.gettext('Unable to install'), i18n.gettext('Try again later'), Ext.emptyFn);
    }
    });

  },
  setQuiz: function(graph_type){
              if(graph_type == "FREEBASE_GRAPH")
              {
                  var question = 'Which of the followings has <em>' + QuizConstructor.value +'</em> as ' + QuizConstructor.attrib +'?';
              }
              if(graph_type == "CULTUREPLEX_GRAPH")
              {
                  var question = 'Which of the following is <em>' + attrib + '</em> ' + value +'?';
              }
              var quiz = '<h>' + question + '</h2>';
              
              //Deleting duplicated answers
              var j = 0;
              while ( j < QuizConstructor.answers.length )
              {
                  if ($.inArray(QuizConstructor.answers[j], QuizConstructor.answers)!== j)
                  {
                      QuizConstructor.answers.splice(j,2);
                      console.log('repetido');
                  }
                  j++;
              }
              console.log(QuizConstructor.answers);
              
              //Mixing answers
              var answersmixed = [];
              j = 0;
              while ( j < QuizConstructor.answers.length )
              {
                  var r = parseInt(Math.random(10)*QuizConstructor.answers.length);
                  if ( typeof(answersmixed[r] ) === "undefined")
                  {
                      answersmixed[r] = QuizConstructor.answers[j];
                      j++;
                  }
              }
              for (var i = 0 ; i < 4; i++)
              {
                  $('#answer'+i).removeClass("btn-success");
                  $('#answer'+i).removeClass("btn-danger");
                  
                  $('#answer'+i).hide();
              }
              for (var i = 0 ; i < QuizConstructor.answers.length; i++)
              {
                  $('#answer'+i).html(answersmixed[i]);
                  $('#answer'+i).show();
              }
              
              
              //quiz += '<div>' + 'Correct Answer :' + QuizConstructor.correct + '</div>';
              $('.quizViewer').empty();
              $('.quizViewer').append(quiz);
  },
  checkAnswer: function(i) {
    console.log(QuizConstructor.correct);
    console.log($('#answer'+i).html());
    if($('#answer'+i).html() === QuizConstructor.correct)
    {
        $('#answer'+i).addClass("btn-success");
    }
    else
    {
        $('#answer'+i).addClass("btn-danger");
    }
    setTimeout(function(){
        QuizConstructor.createQuiz();
    },100);


  
  }
}

