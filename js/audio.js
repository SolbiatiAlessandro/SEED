window.AudioContext = window.AudioContext || window.webkitAudioContext;

var offset = 0;
var context = new AudioContext();

function playTrack(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  var audiobuffer;

  // Decode asynchronously
  request.onload = function() {
    
    if (request.status == 200) {
      
      context.decodeAudioData(request.response, function(buffer) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        console.log('context.currentTime ' + context.currentTime);

        if (offset == 0) {
          source.start();
          offset = context.currentTime;
        } else {
          source.start(0,context.currentTime - offset);
        }

      }, function(e) {
        console.log('Error decoding audio data:' + e);
      });
    } else {
      console.log('Audio didn\'t load successfully; error code:' + request.statusText);
    }
  }
  request.send();
}


