function qSlider (pic_element,method,from,to){
	console.log("Pictures length - " + pic_element.length)

	var click_func = true;
	var timer_id;	

	//Стили
	var float_element_s = `
		position: absolute;
		z-index: 100;
		top: 0px;
		left: 0px;
		width: 100%`
	var btn = `
		transform: initial;
   	left: initial;
   	position: absolute;
   	height: 100%;
   	width: 20%;
   	cursor: pointer;`
	var btn_style = `
		display:block;
		width:25px;
		height:25px;
		line-height:25px;
		border: 2px solid #f5f5f5;
		border-radius: 50%;
		color:#f5f5f5;
		text-align:center;
		text-decoration:none;
		background: #464646;
		box-shadow: 0 0 8px black;
		font-size:20px;
		font-weight:bold;
		position: absolute;
		top: 50%;`
	var pic_border_s =  `
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		background-color: RGBA(240, 240, 240, 0.41)`

	$.each(pic_element,function(i,img){  //заменяет цыкл for неочень читабельный	
		pic_element[i].onclick = function (){			
			count = i;
			console.log("click")

			function unique_src(n){
				if (Array.isArray(method)){
               				return method[n].getAttribute('src')
				}else{
					if (method == "replace"){
						return pic_element[n].getAttribute('src').replace(from,to);
					}else if (method == "name"){
						return pic_element[n].getAttribute('name');
					}else{
						return pic_element[n].getAttribute('src')
					}
				}
			}

			var opacity_backgrond = document.createElement('div');
				opacity_backgrond.style.cssText = "opacity: 0.7; background-color: #12100F;" + float_element_s;
				opacity_backgrond.id = 'opacity_backgrond';
				opacity_backgrond.style.height = document.documentElement.scrollHeight + 'px';
			document.body.appendChild(opacity_backgrond);

			var conteiner = document.createElement('div');
				conteiner.style.cssText = float_element_s;
				conteiner.id = 'conteiner';
				conteiner.style.height = document.documentElement.scrollHeight + 'px';
			document.body.appendChild(conteiner);    

			var pic_border = document.createElement('div');
				pic_border.style.cssText = pic_border_s;
				pic_border.id = 'pic_border';
				pic_border.style.height = window.innerHeight - 5 + 'px'
			conteiner.appendChild(pic_border);

			if (pic_element.length > 1){
				var left_btn = document.createElement('div');
						var left_btn_img = document.createElement('div');
							left_btn_img.innerHTML = "<"
							left_btn_img.style.cssText = btn_style;		    
						left_btn.appendChild(left_btn_img);
					left_btn.style.cssText = btn;
					left_btn.id = "left_btn";
					left_btn.onclick = function () {
						count--;
						if (count<0){count = pic_element.length-1}
						$("#pic_border")
							.animate({left: "150%"},250,"swing",function() {img.src = unique_src(count)})
							.animate({left: "-50%"},10)
							.animate({left: "50%"},250,"swing");
							//console.log(count)	
					};
				pic_border.appendChild(left_btn);

				var right_btn = document.createElement('div');
						var right_btn_img = document.createElement('div');
							right_btn_img.innerHTML = ">"
							right_btn_img.style.cssText = btn_style + "right: 0px";		    
						right_btn.appendChild(right_btn_img);
					right_btn.style.cssText = btn + "right: 0px";
					right_btn.id = "right_btn";
					right_btn.onclick = function () {
						count++;
						if (count>pic_element.length-1){count = 0}
						$("#pic_border")
							.animate({left: "-50%"},250,"swing",function() {img.src = unique_src(count)})
							.animate({left: "150%"},10)
							.animate({left: "50%"},250,"swing");
							//console.log(count)		
					};
				pic_border.appendChild(right_btn);
		
				var center_btn = document.createElement('div');
					center_btn.style.cssText = btn + "left: 40%";
					center_btn.onmouseenter = function(event){
						var center_btn_img = document.createElement('div');
							center_btn_img.innerHTML = ">";
							center_btn_img.style.cssText = btn_style + "left: 50%;transform: translateX(-50%); transform: scale(2)";
							center_btn_img.id = "center_btn_img";
						center_btn.appendChild(center_btn_img);
					};
					center_btn.onmouseleave = function(event){$("#center_btn_img").remove();};
					center_btn.id = "center_btn";
					center_btn.onclick = function () {
						slideshow ();					
					};
				pic_border.appendChild(center_btn);

				$("body").on("keydown", function(event){
					switch (event.which) {
						case 27: //escape
							img.click();
							break;
						case 39: // --->
							right_btn.click();
							break;
						case 37: // <---
							left_btn.click();
							break;
						case 32: // space
							slideshow ();
							break;
					}
				});

				function slideshow (){
					if (click_func){
							timer_id = setInterval (function(){$("#right_btn").click();},5000);
							click_func = false;
						}else{
							clearInterval(timer_id);
							click_func = true;
						}
				}
			};			

			var img = new Image();
				img.id = 'img';
				img.src = unique_src(count);
				img.style.margin = '10px';
				img.style.height = window.innerHeight - 25 + 'px';
				img.style.borderRadius = "5px"	
				img.onclick = function () {
					$("#opacity_backgrond").remove();
					$("#conteiner").remove();
					$("body").off("keydown");
					if(click_func==false){
						clearInterval(timer_id);
						click_func = true;
					}
				};
			pic_border.appendChild(img);
		};
	});
};