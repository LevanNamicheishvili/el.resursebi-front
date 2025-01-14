// images and pencils
const lines = document.querySelectorAll('.img_box-line img');
const penciles = document.querySelectorAll('.img_box');

// canvas and canvas's box selectors
const canvBox = document.querySelector('.canv-box');
const canvas = document.getElementById('imageView');
// drawing pencils
const first = document.querySelector('.b2');
const second = document.querySelector('.b5');
const third = document.querySelector('.b8');
// line size
let size;

//select active pencils
for (var i = 0; i < penciles.length; i++) {
    penciles[i].addEventListener('click', ((j) => {
        return function () {
            penciles.forEach(el => {
                el.style.opacity = "0.5";
            });
            lines.forEach(e => {
                e.style.opacity = "0";
            });
            if (penciles[j].classList.contains('img_box-bg')){
                lines[0].style.opacity = '1';
                lines[0].classList.add('fade-in');
                canvas.style.display = 'none';
                clearArea();
            }
            if (penciles[j].classList.contains(('img_box-blur'))){
                lines[1].style.opacity = '1';
                lines[1].classList.add('fade-in');
                canvas.style.display = 'none';
                clearArea();
            }
            penciles[j].style.opacity = "1";
        };
    })(i));
}

//set canvas width & height onload
window.onload = function sizes(){
    let sizes = canvBox.getBoundingClientRect();
    let cavWidth = sizes.width;
    let cavHeight = sizes.height;
    canvas.width = cavWidth;
    canvas.height = cavHeight;
}

//select line size
first.addEventListener('click', ()=>{
    size = 1;
    canvas.style.display = 'block';
});
second.addEventListener('click', ()=>{
    size = 3;
    canvas.style.display = 'block';
});
third.addEventListener('click', ()=>{
    size = 5;
    canvas.style.display = 'block';
});
// Keep everything in anonymous function, called on window load.
if(window.addEventListener) {
    window.addEventListener('load', function () {
        var canvas, context, tool;

        function init () {
            // Find the canvas element.
            canvas = document.getElementById('imageView');
            // Get the 2D canvas context.
            context = canvas.getContext('2d');


            // Pencil tool instance.
            tool = new tool_pencil();

            // Attach the mousedown, mousemove and mouseup event listeners.
            canvas.addEventListener('mousedown', ev_canvas, false);
            canvas.addEventListener('mousemove', ev_canvas, false);
            canvas.addEventListener('mouseup',   ev_canvas, false);
        }

        // This painting tool works like a drawing pencil which tracks the mouse
        // movements.
        function tool_pencil () {
            var tool = this;
            this.started = false;

            // This is called when you start holding down the mouse button.
            // This starts the pencil drawing.
            this.mousedown = function (ev) {
                context.beginPath();
                context.moveTo(ev._x, ev._y);
                tool.started = true;
                if (size === 1) {
                    context.lineWidth = size;
                }

                if (size === 3) {
                    context.lineWidth = size;
                }

                if (size === 5) {
                    context.lineWidth = size;
                }
            };

            // This function is called every time you move the mouse. Obviously, it only
            // draws if the tool.started state is set to true (when you are holding down
            // the mouse button).
            this.mousemove = function (ev) {
                if (tool.started) {
                    context.lineTo(ev._x, ev._y);
                    context.stroke();
                }
            };

            // This is called when you release the mouse button.
            this.mouseup = function (ev) {
                if (tool.started) {
                    tool.mousemove(ev);
                    tool.started = false;
                }
            };
        }

        // The general-purpose event handler. This function just determines the mouse
        // position relative to the canvas element.
        function ev_canvas (ev) {
            if (ev.layerX || ev.layerX == 0) { // Firefox
                ev._x = ev.layerX;
                ev._y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                ev._x = ev.offsetX;
                ev._y = ev.offsetY;
            }

            // Call the event handler of the tool.
            var func = tool[ev.type];
            if (func) {
                func(ev);
            }
        }
        init();

    }, false);

    function clearArea() {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

