document.addEventListener('DOMContentLoaded', function() {
  var typed = new Typed('#koch-caption', {
    
    strings: [`A Koch Snowflake is a kind of fractal. In the natural world, we have stochastic fractals, like real snowflakes, and in the abstract world, we have deterministic fractals, like the Koch Snowflake.\n
Deterministic fractals are characterized by having a structure that can be iterated infinitely as long as you have enough patience and RAM. The Koch Snowflake, originally called the Koch curve, was discovered in 1904 by Swedish mathmatcian Helge von Koch. A single line was divided into three equal parts. An equilateral traingle is drawn using the two midpoints as vertices. The base is erased and we repeat this process for as long as we desire. It was later discovered that it can be looped to create a shape that very closely resembles a snowflake, most likely by American mathematician Edward Kasner.\n
Would you like to visit another location? Press the key of the page to do so.\n
[1] The Satellite
[2] The Forest
[3] Go Home`],

typeSpeed: 15,
    showCursor: false,
  });
});

window.addEventListener('keydown', (e) => {
    const choice = e.key;
    const validChoices = ['1', '2', '3'];

    if (validChoices.includes(choice)) {
        const intChoice = parseInt(choice);
        goToChoice(intChoice);
    }
});

function goToChoice(intChoice) {
    if (intChoice === 1) {
        window.location.href = '../attractors/attractors.html';
    } else if (intChoice === 2) {
        window.location.href = "../dla/dla.html";
    } else if (intChoice === 3) {
        window.location.href = "../index.html"
    }
}