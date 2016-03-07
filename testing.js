function test() {
  var vocab = horton.vocabulary.list;

  for (word in vocab) {
    current = vocab[word].followers.list;
     for (follower in current)
        console.log(current[follower]);
  }

}