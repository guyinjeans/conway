import Conway from './Components/Conway.js';
import View from './Components/View.js';

//const simulation = new Conway();
//simulation.run();

const ctx = document.getElementById('renderer').getContext('2d');
ctx.canvas.width = window.screen.width;
ctx.canvas.height = window.screen.height;
const v = new View(ctx);
v.render();
