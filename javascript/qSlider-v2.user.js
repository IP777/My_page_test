function qSlider (tumb,full_pic) {  
//Стил слайдера
  addNewStylesheet(`
    #o_p {
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;     
      background: rgba(70, 70, 70, 0.7);
      position: fixed;
      z-index: 100;
    }
    #img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid white;
      border-radius: 20px 20px;
      -webkit-box-shadow: 20px 10px 19px -11px rgba(0,0,0,0.53);
      -moz-box-shadow: 20px 10px 19px -11px rgba(0,0,0,0.53);
      box-shadow: 20px 10px 19px -11px rgba(0,0,0,0.53);
    }
    .navigation {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0px;
    }
    .n_el {
      height: 100px; 
    }`
  );
//Дабавляю HTML-структуру
  var html = new NewHtml(`
    <div id = 'o_p'>
      <div id = 'conteiner'>
        <center><img id = 'img' src='URL' style='HEIGHT' onclick="image_remove()"></center>
          <div class = 'navigation' title = 'COUNT'>
            <img class = 'n_el' id = 'left_btn' src='leftURL' onclick = "left_count()">
            <img class = 'n_el' id = 'center_btn' src='centerURL' onclick = "center_count()">
            <img class = 'n_el' id = 'right_btn' src='rightURL' onclick = "right_count()">
          </div>
      </div>
    </div>`
  );

  html.create_array(full_pic);//Собираю DOM контейнера 

//Подключаю onclick к каждому контейнеру
//Использовал jQuery цыкл так как цыклы for и while не правильно обрабатывали счетчик
  $.each(tumb,function(i,img){  
    tumb[i].onclick = function (){ 
      html.add(i);
    }
  });

}

function NewHtml(html){
  //Переменные тега <body>, и высота экрана - кроссбраузерная верстка )))
  var body = document.body || document.getElementsByTagName('body')[0];
  var scrollHeight = window.innerHeight;

  this.html = html;
  this.arr;
  this.create_array = function (url){
    for(i=0; i < url.length; i++){
      arr[i] = this.html
                .replace(/URL/,url[i])  //Добавляю адреса картинок,
                .replace(/HEIGHT/,'height:' + (scrollHeight-10) + 'px') //Высота на весь экран минус высота рамки
                .replace(/leftURL/,url[left_btn(i,url.length)])
                .replace(/centerURL/,url[center_btn(i)])
                .replace(/rightURL/,url[right_btn(i,url.length)])
                .replace(/leftCOUNT/,left_btn(i,url.length))
                .replace(/centerCOUNT/,center_btn(i))
                .replace(/rightCOUNT/,right_btn(i,url.length))
                .replace(/COUNT/,url.length);
    }
  } 
  this.add = function (i){
    $("body").append(arr[i]);
  }
}

function addNewStylesheet(css){
  var head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

function left_count(){
    var count = $("#left_btn").attr("title")
    var count_lenght = $(".navigation").attr("title")
    
    console.log(count)
  }
function center_count(){
    var count = $("#center_btn").attr("title")
    var count_lenght = $(".navigation").attr("title")
    console.log(count+count_lenght)
  }
function right_count(){
    var count = $("#right_btn").attr("title")
    var count_lenght = $(".navigation").attr("title")
    console.log(count+count_lenght)
  }

function left_btn(i, length){
  i --;
  if (i < 0){
    return length-1;
  }else{
    return i;
  }
}
function center_btn(i){
  return i
}
function right_btn(i, length){
  i ++;
  if (i > length-1){
    return 0
  }else{
    return i
  }
}

function image_remove(){
    $("#o_p").remove()
  }