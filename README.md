# what is this?
\> var text = "This is a crude little predictive text engine that learns word association from text that you feed it, and then can spit out psuedo-poetic... strings of words. Why did I make this in Javascript, for the browser, with no persistent memory? Because I think it's fun to play with because the text you feed it has such a profound effect on the weird poetry it writes.";

\> horton.read(text);

\> horton.write(20);<br>
<i>predictive text you feed it and then can spit out a profound effect on the weird poetry it and then can</i>

\> horton.write(25, 'weird');<br>
<i><strong>weird</strong> poetry it has such a crude little predictive text that learns word association from text engine that learns word association from text engine that learns</i>

// my favorite thing it's done, after being fed quite a few blues lyrics (and this function)

function blues() {<br>
   var subject = horton.getRandomWord().word;<br>
   horton.write(7, subject);<br>
   horton.write(7);<br>
   horton.write(12, subject);<br>
 }<br>
 
\> blues();<br>
<i>shading down id rather my gal would ride</i><br>
<i>cry that lets leave you know if i</i><br>
<i>shading down me wrong he slipped the fishing poles oh the sun rose</i>

See it in action [here](https://marcushaddon.github.io/HortonUI/).
