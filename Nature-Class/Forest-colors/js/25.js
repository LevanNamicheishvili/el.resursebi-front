// შესამოწმებელი მასივები
const green = ["cxratyava", "fichvi", "kedari", "kuneli", "nadzvi", "shqeri"]
const yellow = ["muxa", "tela", "txili"];

$(function () {
   //ელემ. გადაადგილება
   $(".tree").draggable({
      revert: "invalid",
      helper: "clone",
      containment: "document"
   });
   //ელემ. ჩაგდება
   $(".image-box_game").droppable({
      classes: {
         "ui-droppable-active": "ui-state-active",
         "ui-droppable-hover": "ui-state-hover"
      },
      drop: function (event, ui) {
         ui.draggable.appendTo($(this));
      },
   });
});

$(".image-box_game img").draggable('disable');
$('#reset').click(reset);

const greenBox = document.querySelector('.green_box').childNodes;
const yellowBox = document.querySelector('.yellow_box').childNodes;

const check = document.getElementById('check');
let greenTrees = [];
let yellowTree = [];


// მცენარეების შემოწმება და მასივში გადაწერა
check.addEventListener('click', () => {

   greenBox.forEach(evt => {
      greenTrees.push($(evt).attr('alt'))
   });
   yellowBox.forEach(evt => {
      yellowTree.push($(evt).attr('alt'))
   });

   // მასივების გაფილტვრა
   let x = greenTrees.filter((el, i, arr1) => {
      el === (undefined && null) ? arr1.shift() : arr1
   });

   let x2 = greenTrees.sort()


   let y = yellowTree.map((el, i, arr) => {
      el === (undefined && null) ? arr.shift() : arr
   });

   let y2 = yellowTree.sort()

   console.log(x2)
   console.log(y2)



   for (let i = 0; i < green.length; i++) {
      for (let j = 0; j < yellow.length; j++) {
         // თუ ყველა პირობა სწორია ჩაიტვირთოს ახალი გვერდი
         if (x2[i] === green[i] && y2[j] === yellow[j] && x2.length === 6 && y2.length ===3){
            window.location.href = './game-success-25.html';

         }else{
            // თუ მარადმწვანე ჯგუფი არაა სწორად შევსებული ან ცარიელია
            if (x2[i] !== green[i] && x2.length !== 6){
               $('.green_box').addClass('animated bounce');
               $('.green_box').css('background', 'rgb(220, 108, 133)');
               $('#check').addClass('disabled');
            }else if(x2[i] === green[i]){ // თუ მარადმწვანე ჯგუფი სწორადაა შევსებული სტილების მოხსნა
               $('.green_box').removeClass('animated bounce danger');
               $('.green_box').css('background', '');
            }
            // თუ არამარადმწვანე ჯგუფი არაა სწორად შევსებული ან ცარიელია
            if(y2[j] !== yellow[j] && y2.length !== 3){
               $('.yellow_box').addClass('animated bounce danger');
               $('.yellow_box').css('background', 'rgb(220, 108, 133)');
               $('#check').addClass('disabled');
            }else if(y2[j] !== yellow[j]){  // თუ არამარადმწვანე ჯგუფი სწორადაა შევსებული სტილების მოხსნა
               $('.yellow_box').removeClass('animated bounce danger');
               $('.yellow_box').css('background', '');
            }
         }
      }
   }

   // მასივების გაწმენდა
   yellowTree = [];
   greenTrees = [];
});


// თამაშის განულება ახლიდან დასაწყებად
function reset() {
   $('#kedari').append($('img[alt="kedari"]'));
   $('#tela').append($('img[alt="tela"]'));
   $('#muxa').append($('img[alt="muxa"]'));
   $('#nadzvi').append($('img[alt="nadzvi"]'));
   $('#fichvi').append($('img[alt="fichvi"]'));
   $('#txili').append($('img[alt="txili"]'));
   $('#kuneli').append($('img[alt="kuneli"]'));
   $('#shqeri').append($('img[alt="shqeri"]'));
   $('#cxratyava').append($('img[alt="cxratyava"]'));
   $('.green_box').removeClass('animated bounce');
   $('.green_box').css('background', '');
   $('.yellow_box').removeClass('animated bounce');
   $('.yellow_box').css('background', '');
   $('#check').removeClass('disabled');
}
