// /<[^>]>/g seems to strip HTML tags pretty wells so far





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
    this.timesObserved += 1;

    var exists = this.followers.search(word);

    if (exists) {
      exists.observe();
      return false;
     } else {
      this.followers.list.push(new Follower(word));
      return true;
     }

     
     

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
        if (currentEntry.word.replace('.', '') === word) {
          return currentEntry;
        }  
      }
      return false; 
      
    },

    knownAssocs: 0
  },

  getRandomWord: function() {
    var choice = Math.floor(Math.random() * this.vocabulary.list.length);
    return this.vocabulary.list[choice];
  },

  read: function(text) {
    var sentences = text.toLocaleLowerCase().split(/[?!.:;]/g);
    for (sentence in sentences) {
      var current = sentences[sentence];
      current !== "" ?
      this.comprehend(sentences[sentence]) : console.log("empty string!") // dont comprehend empty strings (should probably eliminate the empty strings via splitting by regex eventually)
    }
  },

  comprehend: function(text) {
    var vocab = this.vocabulary;
    var daria = text; // text.toLowerCase().replace(/[^a-z|\s]/gi, '');
    var textArray = daria.trim().split(' ');

    // put a period on the last word so we know it was found at the end of a sentence (when we get there)
    var finalWord = textArray[textArray.length -1];
    finalWord += ".";

    // now lets read each word
    for (var i = 0, length = textArray.length - 1; i < length; i++) {

      var currentWord = textArray[i];
      var followingWord = textArray[i + 1]; 

      // check to see if we know this word
      var wordThatExists = vocab.search(currentWord);

      // if we dont know it, learn it and learn its association!
      if (!wordThatExists) {
        this.vocabulary.addWord(currentWord);
        this.onLearnWord();

        var lastWord = this.vocabulary.list[this.vocabulary.list.length - 1];

        lastWord.recordFollower(followingWord);
        this.onLearnAssoc();
        

      } else if (wordThatExists) {
        if (wordThatExists.recordFollower(followingWord)) {
          this.onLearnAssoc();
        } else {
          this.onStrengthenAssoc();
        }
      }
    }

    // now we've read every word but the last of the sentence
    var knownFinalWord = this.vocabulary.search(finalWord);
    if (!knownFinalWord) {
      // we will add this word as a modified vocabWord
      var newTerminator = new vocabWord(finalWord);
      newTerminator.chooseFollower = function() { 
        console.log("This is from a modified chooseFollower function and my executor was " + this.word); // for debugging
        return horton.getRandomWord(); 
      };
      newTerminator.timesObserved = 1; // doing this manually since we aren't using the learnWord function
      horton.vocabulary.list.push(newTerminator);

    } // else increment the known Terminator... later

    

  },

  predict: function(word) {
    var knowsWord = this.vocabulary.search(word);

    if (knowsWord) {
      var suggs = knowsWord.followers.list;
      suggs.sort(function (a, b) { return a.timesObserved - b.timesObserved; });
      suggs = suggs.map( function(index) {
        return index.word;
      });
      return suggs;
    } else {
      return ['No suggestions.'];
    }

  },

  write: function(wordCount, seed) {
    
    var seed = this.vocabulary.search(seed) || this.getRandomWord();

    // blank page
    var poem = [];

    // open to suggestion but not nessecary
    var firstWord = seed;
    poem.push(firstWord);

    // write
    while (poem.length <= wordCount) {
      var lastWord = poem[poem.length - 1];
      console.log(lastWord); // for testing

      
        var nextWord = lastWord.chooseFollower().word.replace('.', ''); // hopefully this will stop terminators spitting out other terminators which cannot be searched
      
      
      

      
      nextWord = this.vocabulary.search(nextWord); // AHA here's the culprit
      poem.push(nextWord);
    }

    // translate
    var output = [];
    for (object in poem) {
      output[object] = poem[object].word;
    }

    // print
    output = output.join(' ');
    return output;
    
  },

  onLearnWord: function() {
    console.log('I learned a new word!');
  },

  onLearnAssoc: function() {
    this.vocabulary.knownAssocs += 1;
    console.log('I learned a new association!');
  },

  onStrengthenAssoc: function() {
    console.log('I strengthened an association!');
  }


}























