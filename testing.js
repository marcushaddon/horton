function test() {
  thing = new vocabWord('dog');

  thing.recordFollower('cat');
  thing.recordFollower('cat');
  thing.recordFollower('cat');

  thing.recordFollower('mouse');
  thing.recordFollower('mouse');

  thing.recordFollower('house');

  // lets see if the distroubution is ~correct
  var catCount = 0;
  var mouseCount = 0;
  var houseCount = 0;

  for (var i = 0; i < 2000; i++) {
    switch(thing.chooseFollower().word) {
      case 'cat':
        catCount += 1;
        break;
      case 'mouse':
        mouseCount += 1;
        break;
      case 'house':
        houseCount += 1;
        break;
    }
  }

  console.log('cat was chosen ' + catCount/20 + ' % of the time');
  console.log('mouse was chosen ' + mouseCount/20 + ' % of the time');
  console.log('house was chosen ' + houseCount/20 + ' % of the time');
  

}