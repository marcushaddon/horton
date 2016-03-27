function test() {
  var longText = "This is a crude little predictive text engine that learns word association from text that you feed it, and then can spit out a psuedo-poetic... string of words. Why did I make this in Javascript, for the browser, with no persistent memory? Because I think it's fun to play with because the text you feed it has such a profound effect on the weird poetry it writes.";
  var sentences = 'I mean its microsoft so not really a plot twist. Im only surprised it didnt change your search engine to bing and delete half your files. Seriously. letting people make it tweet. who thought that was a good idea? I am increasingly becoming convinced that if you eat enough cheese and gravy eventually you will go blind. Omg Im so glad spotify shuffle sucks and is only playing Peaches. Its true. Its a six thousand song playlist and it played five peaches songs in an hour. I mean. Im not complaining right now but I usually would be. I cleaned and am on spring break. Who wants to come over and get their mind blown? Cant wait til next election when the candidate is just a talking cheeseburger with machine gun hands.';
  horton.read(sentences);

  var vocab = horton.vocabulary.list;

  for (word in vocab) {
    var current = vocab[word];
    var lemmings = current.followers.list;
    for (lemming in lemmings) {
      console.log(current.word + " -> " + lemmings[lemming].word);

    }

  }

  

  
}

var seeVocab = function() {
	var collection = horton.vocabulary.list
	for (word in collection) {
		console.log(collection[word].word + " has " + collection[word].followers.list.length + " followers.");
	}
}

var seeTerminators = function() {
	var collection = horton.vocabulary.list
	for (word in collection) {
		if (collection[word].word.indexOf('.') > 0)
		console.log(collection[word].word + " is a terminator and it chooses: " + collection[word].chooseFollower().word);
	}
}

var randomTest = function() {
	for (var i = 0; i < 500; i++) {
		var test = horton.getRandomWord().word;
		if (!horton.vocabulary.search(test)) {
			console.log(test + " failed");
		}
		
	}
}

function blues() {
  var subject = horton.getRandomWord().word;
  horton.write(7, subject);
  horton.write(7);
  horton.write(12, subject);
}