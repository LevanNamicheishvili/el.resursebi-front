function natureGames() {
    var btn = document.querySelectorAll('.btn');
    var imge = document.querySelector('.img-fluid')

    $(btn).on('click', (e) => this.clickMe(e));

    document.querySelector('.cloud').classList.add('opacity-0')




    this.getWeather = (imgClass) => {
        for(var i = 0; i < 30; i++){
            let img = document.createElement('img')
            $(img).attr('class', imgClass)
            $(img).attr('data-weather', imgClass)
            $(img).attr('src', `../../img/gakvetilebi/buneba/snow-12/${imgClass}.svg`);
            $(weatherParent).append(img)
        }
    }

    getMeRandomElements = function(sourceArray, neededElements) {
        var result = [];
        for (var i = 0; i < neededElements; i++) {
            result.push(sourceArray[Math.floor(Math.random()*sourceArray.length)]);
        }

        result.forEach(w => {
            w.setAttribute('src', "../../img/gakvetilebi/buneba/snow-12/snow.svg")
        })
        return result;
    }

    this.clickMe = (e) => {
        btn.forEach(element => {
            element.classList.remove('active')
        });

        e.target.classList.add('active');

        if(e.target.classList.contains('active')){
            if(e.target.getAttribute('data-btn') == 1){
                document.querySelector('#weatherParent').innerHTML = "";
                document.querySelector('.cloud').classList.add('opacity-0')
                imge.src = '../../img/gakvetilebi/buneba/snow-12/N-12-50-1.svg';

            }
            if(e.target.getAttribute('data-btn') == 2){
                document.querySelector('#weatherParent').innerHTML = "";
                document.querySelector('.cloud').classList.add('opacity-1')
                imge.src = '../../img/gakvetilebi/buneba/snow-12/2-mdgomareoba.svg';
                this.getWeather("rain");
            }
            if(e.target.getAttribute('data-btn') == 3){
                imge.src = '../../img/gakvetilebi/buneba/snow-12/3-mdgomareoba.svg';
                document.querySelector('.cloud').classList.add('opacity-1')
                document.querySelector('#weatherParent').innerHTML = "";
                this.getWeather("rain2")
            }
            if(e.target.getAttribute('data-btn') == 4){
                imge.src = '../../img/gakvetilebi/buneba/snow-12/4-mdgomareoba.svg';
                document.querySelector('.cloud').classList.add('opacity-1')
                document.querySelector('#weatherParent').innerHTML = "";
                this.getWeather("rain")

                let items = $('#weatherParent img');

                getMeRandomElements(items, 15)

            }
            if(e.target.getAttribute('data-btn') == 5){
                imge.src = '../../img/gakvetilebi/buneba/snow-12/5-mdgomareoba.svg';
                document.querySelector('.cloud').classList.add('opacity-1')
                document.querySelector('#weatherParent').innerHTML = "";

                this.getWeather("rain")

                let items = $('#weatherParent img');

                getMeRandomElements(items, 15)
            }
        }
    }
}

const naturegame = new natureGames();


