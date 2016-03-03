function Follower(word) {
  this.word = word;
  this.timesObserved = 1;
  this.observe = function() {
    this.timesObserved += 1;
  }
}

function vocabWord(word) {
  this.word = word;
  this.timesObserved = 0; // hmm...

  this.followers = {
    list: [],
    search: function(word) {
      //if word is in my followers, return the Follower for that word
      
      for (index in this.list) {
        var currentEntry = this.list[index];
        if (currentEntry.word === word) {
          return currentEntry;
        }  
      }
      return false;
    }
  };

  this.recordFollower = function(word) {
    var exists = this.followers.search(word);

    if (exists) {
      exists.observe();
     
     } else {
      this.followers.list.push(new Follower(word));
      console.log("I learned a new association!");
     }

     this.timesObserved += 1;
  };

  // 
  this.chooseFollower = function() {
    // this is probably a terrible way to do this, will fix later
    var weightedArray = [];
    var list = this.followers.list;

    // add each follower to weightedArray as many times as it has been observed
    for (index in this.followers.list) {
      for (var i = 0; i < list[index].timesObserved; i++) {
        weightedArray.push(list[index]);
      }
    }

    // evenly distributed random choice from weighted array
    var choice = Math.floor(Math.random() * weightedArray.length);
    // console.log(weightedArray);
    return weightedArray[choice];


  };
}

var horton = {
  vocabulary: {
    list: [],
    addWord: function(word) {
      this.list.push(new vocabWord(word));
    },

    search: function(word) {
      // if word is in my vocabulary, return the vocabWord for that word
      // this is WAY not DRY, will refactor later
      for (index in this.list) {
        var currentEntry = this.list[index];
        if (currentEntry.word === word) {
          return currentEntry;
        }  
      }
      return false;
    }
  },

  getRandomWord: function() {
    var choice = Math.floor(Math.random() * this.vocabulary.length);
    return this.vocabulary[choice];
  },

  read: function(text) {
    var vocab = this.vocabulary;
    var daria = text.toLowerCase().replace(/[^a-z|\s]/gi, '');
    var textArray = daria.split(' ');
    console.log(textArray);
    
    // if this is our first word, then go ahead and add it!
    if (vocab.list.length === 0) {
      vocab.addWord(textArray[0]);
      // need to learn first assoc here
    }

    // now lets read each word
    for (var i = 0, length = textArray.length; i < length; i++) {

      var currentWord = textArray[i];
      var followingWord = textArray[i + 1]; 

      // check to see if we know this word
      var wordThatExists = vocab.search(currentWord);

      // if we dont know it, learn it and learn its association!
      if (!wordThatExists) {
        this.vocabulary.addWord(currentWord);
        var lastWord = this.vocabulary.list[this.vocabulary.list.length - 1];
        lastWord.recordFollower(followingWord);
      } else if (wordThatExists) {
        wordThatExists.recordFollower(followingWord);
      }
    }
  },

  write: function(wordCount, seed) {
    
    // blank page
    var poem = [];

    // open to suggestion but not nessecary
    var firstWord = this.vocabulary.search(seed) || this.getRandomWord();
    poem.push(firstWord);

    // write
    for (var i = 1; i < wordCount; i++) {
      poem[i] = poem[i - 1].chooseFollower(); // NOT WORKING
    }

    console.log(poem);
  }


}























