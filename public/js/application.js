$(document).ready(function() {
   $(".question-container").on("click", ".delete", function(event) {
      event.preventDefault();
      $.ajax ({
        method: 'DELETE',
        url: $(this).attr('href')
      })

      .done(function(){
        event.target.closest("article").remove();
      })
    });

   $("#update_button").on('click', function(event){
    // event.preventDefault()
    $("#update_button").hide();
    $("#question").show();
   });

   $("#update_answer_button").on('click', function(event){
    // event.preventDefault()
    $("#update_answer_button").hide();
    $("#answer").show();
   })

   $(".question-container").on("submit", "#vote-arrows", function(event){
      event.preventDefault();
      var form = $(this)
      var form_opposite = form.siblings().closest('form')
      var url  = $(this).attr('action')
      var data = $(this).serialize()

      $.ajax ({
        method: 'POST',
        url: url,
        data: data
      })
        .done(function(response){
            var voteCountNode = form.parent().find(".vote-count");
            voteCountNode.text(response)
            // var voteCount = parseInt(voteCountNode.text());
            // var voteValue = parseInt(response);
            // voteCountNode.text(voteCount + voteValue);
            form.find("button").addClass("colored");
            form_opposite.find("button").removeClass("colored");
        });
    });


// this call should present the new question form in the home page
// but it doesn't work for some reason

   $(".question_link").click(function(event) {
      event.preventDefault();
      $("#new_question_form").remove();
      var url = $(this).attr('href');
      
      $ .get(url, function(response) {
        $('.undernav').prepend(response);
      });

   });

   $("#register").on("click", function(event){
    event.preventDefault()
    $.ajax({
      method: "GET",
      url: "/register"
    })
      .done(function(request){
        $("#login_div").remove()
        $("fieldset").remove()
        $(".undernav").prepend(request)
        $("fieldset").css("border", "none")
      });
   });

   $("#login").on("click", function(event){
      event.preventDefault()
      $.ajax({
        method: "GET",
        url: "/users/login"
      })
        .done(function(response){
          $("fieldset").remove()
          $("#login_div").remove()
          $(".undernav").prepend(response)
        });
   })

});


