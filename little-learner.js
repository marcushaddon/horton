// define additional class of Follower with word value and count
// 


function Entry(word) {
  this.word = word;
  this.followers = [];
  this.addFollower = function(value) {
    if (this.followers.indexOf(value) === -1) {
      this.followers.push(value);
    } else {
      return false;
    }
  };
  this.chooseNext = function() {
    var choice = Math.floor(Math.random() * this.followers.length);
    return this.followers[choice];
  }
}

var lib = {
  tree: [],
  getRandEntry: function() {
    var choice = Math.floor(Math.random() * this.tree.length);
    return this.tree[choice];
  },
  read: function(text) {
    var daria = text.toLowerCase().replace(/[^a-z|\s]/gi, '');
    var textArray = daria.split(' ');
    if (this.tree.length === 0) {
      this.tree.push(new Entry(textArray[0]));
    }
    
    console.log(textArray);
    
    //do this for each word in the textArray
    for (var i = 0, length = textArray.length; i < length; i ++) {
      
      var isNew = true;
      var currentWord = textArray[i];
      var nextWord = textArray[i + 1];
      
      //now loop through current tree to see if we already have this word
      for (var x = 0, len = this.tree.length; x < len; x++) {
        var currentEntry = this.tree[x];
        
        //if we have it, add the next word as a follower
        if (currentEntry.word == currentWord) {
          currentEntry.addFollower(nextWord);
          console.log('New follower!');
          isNew = false;
          break;
        }
        
      }
      
      //if we made it through all that and dont have an entry for currentWord, add it and its follower
      if (isNew) {
        this.tree.push(new Entry(currentWord));
        this.tree[this.tree.length - 1].addFollower(nextWord);
      }
    }

  },

  write: function(wordCount) {
    //new empty poem
    var poem = [];

    //choose a first word
    var firstWord = this.getRandEntry();
    poem.push(firstWord);

    //write
    for (i = 1; i < wordCount; i++) {
      poem[i] = chooseNext(poem[i - 1]);
    }

    //translate
    for (word in poem) {
      poem[word] = poem[word].word;
    }

    //print
    return poem.join(' ');
  }
};

function chooseNext(entry) {
  var choice = Math.floor(Math.random() * entry.followers.length);
  var word = entry.followers[choice];

  for (var i = 0, length = lib.tree.length; i < length; i++) {
    if (lib.tree[i].word == word) {
      return lib.tree[i];
    }
  }
}

