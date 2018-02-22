(function () {

var names = ["Chiara", "Giusy", "Jo", "Justine", "Jennifer", "Federica", 
              "Laurence", "Paola", "Laura", "Jim", "Serena", "Gabriele",
              "Johnny", "Jerry", "Michele"];

for (var i = 0; i < names.length; i++) {
  var firstLetter = names[i].charAt(0).toLowerCase();

  if (firstLetter === 'j') {
    byeSpeaker.speak(names[i]);
  } else {
    helloSpeaker.speak(names[i]);
  }
}

})();
