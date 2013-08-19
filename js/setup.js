if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }
  newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
  window.location.search = newSearch;
}

$(document).ready(function(){

  // Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
  $.ajaxPrefilter(function(settings, _, jqXHR) {
    jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
    jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
  });

  //
  var cleanMessages = function(msgArray) {
    for (var i = 0; i < msgArray.length; i++) {
      var msgString = msgArray[i].text + " " + "created at: " + msgArray[i].createdAt.slice(0,10);
      $('<div></div>').attr('class', 'message').text(msgString).appendTo('#main');
    }
  };

  $.get('https://api.parse.com/1/classes/messages', 'order=-createdAt', function(data) {
    var jsonObj;
    var msgArray = data.results;
    cleanMessages(msgArray);
  });

  var newMessage = {
    'username': 'shawndrost',
    'text': 'trololo',
    'roomname': '4chan' // Optional
  };

  $('#submitMsg').on('click', function(){
    var userMsg = $('.textBox').val();
    var msgObj = JSON.stringify({
      username: 'blake_and_jess',
      text: userMsg
    });
    console.log(msgObj);
    $.ajax('https://api.parse.com/1/classes/messages', {
      type: 'POST',
      contentType: 'application/json',
      data: msgObj
    });

  });
});
