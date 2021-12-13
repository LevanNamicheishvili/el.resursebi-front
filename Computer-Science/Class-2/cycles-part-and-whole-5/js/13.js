function computerGames() {
    var DragGameChilds1 = document.querySelectorAll('.DragGame--childs1');
    var DragGameParent = document.querySelectorAll('.DragGame--Parent');

    var completedBtn = document.getElementById('completedGame');
    var resetBtn = document.getElementById('resetBtn');

    $(DragGameChilds1).on('dragstart', (e) => this.dragStart(e));
    $(DragGameChilds1).on('dragend', (e) => this.dragEnd(e));

    for (const drag of DragGameChilds1) {
        drag.addEventListener('dragover', (e) => this.dragOver(e));
        drag.addEventListener('drop', (e) => this.dragDrop(e));
    }

    document.addEventListener('DOMContentLoaded', () => {
        DragGameParent.forEach(w => {
            w.setAttribute('data-class', w.getAttribute('class'))
        })
        DragGameChilds1.forEach(w => {
            w.setAttribute('data-class', w.getAttribute('class'))
        });
    })

    this.dragOver = (e) => {

        e.preventDefault();
    }

    this.dragStart = (e) => {
        myArray.forEach(element => {
            element.style.border = '';
            $(element).removeClass("error");
            $(element).removeClass("success");
        });
        setTimeout(() => {
            e.target.className += " draggedElement"
        }, 0);
    }

    this.dragEnd = (e) => {
        var elClassName = e.target.getAttribute('data-class')
        e.target.className = elClassName;
    }

    var myArray = [];
    DragGameChilds1.forEach(element => {
        myArray.push(element);
    });

    this.dragDrop = (e) => { e.preventDefault();
        var drag = document.querySelector('.draggedElement');
        var dragParent = drag.parentElement;
        let firstElement = e.target.parentElement.firstElementChild;
        if (e.target.parentElement.classList.contains('DragGame--Parent')) {
            //firstElement.remove();
            e.target.parentElement.appendChild(drag);
            dragParent.appendChild(firstElement)
        }
    }
    this.checkEveryElement = (element) => element.getAttribute('data-place') == element.parentElement.getAttribute('data-place');

    this.successPage = () => {
        let el = myArray.every(this.checkEveryElement);
        if (el == true) {
                location.href = 'game-success-13.html';
        }
        else {
            this.errorPage();
        }
    }


    this.errorPage = () => {
        myArray.forEach(element => {
            if (element.getAttribute('data-place') == element.parentElement.getAttribute('data-place')) {
                $(element).addClass("success");
                element.style.border = "2px solid #a1dd6f"
            }
            else {
                $(element).addClass("error");
                element.style.border = "2px solid #dc6c85"
            }
        });
    }

    this.completGame = () => {
        this.successPage();
    }

    this.init = () => {
        myArray.forEach(element => {
            $(element).removeClass("error");
            element.style.border = '';
            $(element).removeClass("success");
        });
        DragGameParent.forEach(element => {
            element.appendChild(document.getElementById(element.getAttribute('data-side')));

        });
    }


    resetBtn.addEventListener('click', () => this.init());
    completedBtn.addEventListener('click', () => this.completGame());

}




const computergame = new computerGames();