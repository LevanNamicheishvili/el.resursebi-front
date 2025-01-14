createjs.Sound.on("fileload", handleLoadComplete);
createjs.Sound.alternateExtensions = ["wav"];

function handleLoadComplete(event) {
    createjs.Sound.play("sound");
}

function handleLoadstop(event) {
    createjs.Sound.stop("sound");
}


function game() {
    this.answersArray = '';
    this.error = true;


    let listenBtn = document.querySelectorAll('.listen--btn');
    let dragElement1 = document.querySelectorAll('.DragGame—childs1');
    let dragElement2 = document.querySelectorAll('.DragGame—childs2');
    let correctAnswer = document.getElementById('correctAnswer');
    const completeBtn = document.getElementById('completedGame');
    const resetBtn = document.getElementById('resetBtn');
    let numberImages = document.querySelectorAll('.images--parent .DragGame—childs2');



    // listeners
    completeBtn.addEventListener('click', () => this.completGame());
    resetBtn.addEventListener('click', () => this.init());

    $(dragElement2).on('dragstart', (e) => this.dragStart(e));
    $(dragElement2).on('dragend', (e) => this.dragEnd(e));


    // Loop through empty boxes and add listeners
    for (const drag of dragElement1) {
        drag.addEventListener('dragover', (e) => this.dragOver(e));
        drag.addEventListener('drop', (e) => this.dragDrop(e));
    }


    var dragElementMyArray = [];
    for(var i = 0; i < numberImages.length; i++ ){
        dragElementMyArray.push(numberImages[i])
    }




    var dragElement1MyArray = [];
    for(var i = 0; i < dragElement1.length; i++ ){
        dragElement1MyArray.push(dragElement1[i])
    }

    var dragElement2MyArray = [];
    for(var i = 0; i < dragElement2.length; i++ ){
        dragElement2MyArray.push(dragElement2[i])
    }

    $(listenBtn).click((e) => {
        handleLoadstop()
        createjs.Sound.registerSound({src:`${e.target.getAttribute('data-voice')}`, id:"sound"});
        handleLoadComplete()
    })


    document.addEventListener('DOMContentLoaded', () => {
        dragElement2MyArray.forEach(w => {
            w.setAttribute('data-class', w.getAttribute('class'))
        })
    })
    


    // Drag Functions    
    this.dragOver = (e) => {
        e.preventDefault();
    }

    // drag start 
    this.dragStart = (e) => {
        setTimeout(() => {
            e.target.className = "draggedElement"
        }, 0);
    }


    // drag end
    this.dragEnd = e => {
        let elClassName = e.target.getAttribute('data-class');
        e.target.className = elClassName;
    }
    

    this.dragDrop = e => { e.preventDefault();
        e.target.appendChild(document.querySelector('.draggedElement'));
    }


    this.checkEveryElement = (element) => {
        if(element.querySelector('img')){
            return element.getAttribute('data-index') == element.querySelector('.DragGame—childs2').getAttribute('data-index');
        }
    }


    this.checkGameAnswers = () => {
        let el = dragElement1MyArray.every(this.checkEveryElement);

		if(el == true){
            this.checkWhichPageIs()

        } else {

            $('.DragGame—childs1').attr('style', "border: 3px solid #dc6c85")
        }
    }

    this.checkWhichPageIs = () => {
        let myLocation = location.pathname;

        if(myLocation == "/Music-Class/Create-broadcast-hat-7/9.html" || myLocation == "/el.resursebi-front/Music-Class/Create-broadcast-hat-7/9.html"){
            location.href = "game-success-9.html"
            
        } else if (myLocation == "/Music-Class/Create-broadcast-hat-7/11.html" || myLocation == "/el.resursebi-front/Music-Class/Create-broadcast-hat-7/11.html"){
            location.href = "game-success-11.html"
        } 
    }


    this.init = () => {
        $('.DragGame—childs1').removeAttr('style');

        document.querySelector('.images--parent').innerHTML = "";

        dragElement2MyArray.forEach(w => {
            document.querySelector('.images--parent').append(w)
        })

        // stop voice 
        createjs.Sound.stop("sound");
    }
    

    this.completGame = () => {
        this.checkGameAnswers()
    }
}



const Game = new game();
