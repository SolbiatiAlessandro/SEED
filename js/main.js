var season = 0, seeds = 1, fruits = 0, cash = 0;

var level,victory_time,size,seedprice,MAXfruit_price;


var lifespan = Array.from({length: 100}, () => -1)
var lifespan_vals = Array.from({length: 100}, () => (Math.floor(Math.random() * 5)+1))



$(function(){

	update_inventory()
	update_price()
	update_values(0)
	update_sidevalue()

	$("#achievement").text(achievements[0].name)
	$("#prize").text(achievements[0].prize)
	$("#achievement_tot")[0].innerHTML = (achievements.length)
	$("#achievement_curr")[0].innerHTML = "1"


	for (var i = size; i >= 1; i--) {
		$("#grid").append("<div id='"+i+"' class='row'></div>")
		for (var j = size - 1; j >= 0; j--) {
			$("#"+i).append("<div id='"+i+j+"' class='box gridbox'><span class='debug' id='debug"+i+j+"'></span></div>")
		}
	}

	

	$("body").on('click',function() {
		checkachievements();
	})

	$("#next").on('click',function(){
		next_season()
	})
	$(".gridbox").on('click',function(){

		if($(this).hasClass("choose") && $(this).hasClass("tiniseed") && !($(this).hasClass("choosen"))){

			var index = parseInt($(this).attr("id"))
			lifespan[index] = lifespan_vals[index]
			$(this).append("<img id='img"+index+"' src='img/tiniseed.png' class='grid_tiniseed'><span id='lifespan"+index+"' class='apex'>"+lifespan[index]+"s</span>")

			$(this).toggleClass("choosen")

			inventory[0]["quantity"]--;
			if(inventory[0]["quantity"]==0){
				$(".gridbox").toggleClass("choose")
				$(".gridbox").toggleClass("tiniseed");
			}
			update_inventory()
		}
	})
	$("#sell").on('click',function(){
		sell_fruits();
	})
	$("#shop").on('click',function(){
		$("#shop_box").toggleClass("hidden")
	})
	$("#restart").on('click',function(){
		location.reload()
	})

	$("body").on('click','#tiniseed',function(){
			$(".gridbox").toggleClass("choose");
			$(".gridbox").toggleClass("tiniseed");
			$("#tiniseed").css('background',"#d4eacb")
	})

	$("body").on('click','.tinifruit',function(){
			var i = $(this).attr("id");
			clean(i);
			inventory[3]["quantity"]++;
			update_inventory()
	})
	$("body").on('click','#tinifruit',function(){
			inventory[3]["quantity"]--;
			inventory[0]["quantity"] += (Math.floor(Math.random() * 3)+1)
			update_inventory()
	})
	$("#buy_tiniseed").on('click',function(){
		if(cash<1){
			alert("no money!")
		}
		else{
			cash-=inventory[0]["price"]
			update_sidevalue()
			inventory[0]["quantity"]++
			update_inventory();
		}
	})
	$("#sell_tinifruit").on('click',function(){
		if(inventory[3]["quantity"]<1){
			alert("no fruit!")
		}
		else{
			inventory[3]["quantity"]--
			cash=cash+inventory[3]["price"]
			update_sidevalue()
			update_inventory();
		}
	})

})