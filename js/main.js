var season = 0, seeds = 1, fruits = 0, cash = 0;

var level,victory_time,size,seedprice,MAXfruit_price;

$(function(){

	//playTrack("sounds/Seeds0.mp3");
	update_inventory()
	update_price()
	update_values(0)
	update_sidevalue()
	/*
	automatic season progress
	$("#progress").circliful()
	*/
	$("#achievement").text(achievements[0].name)
	if(prizes){
		$("#prize")[0].innerHTML = achievements[0].prize+"<img class='prizeimg' src='"+achievements[0].img+"'>"
	}
				
	$("#achievement_tot")[0].innerHTML = (achievements.length)
	$("#achievement_curr")[0].innerHTML = "1"

	$("#price_tiniseed").text("$"+inventory[0]["price"])
	$("#price_ocreseed").text("$"+inventory[1]["price"])
	$("#price_duperseed").text("$"+inventory[2]["price"])


	for (var i = size-1; i >= 0; i--) {
		$("#grid").append("<div id='"+i+"' class='row'></div>")
		for (var j = size - 1; j >= 0; j--) {
			$("#"+i).append("<div id='"+i+j+"' class='box gridbox' content="+"><span class='debug' id='debug"+i+j+"'></span></div>")
		}
	}
	

	$("body").on('click',function() {
		checkachievements(-1);
	})
	$("#next").on('click',function(){
		next_season()
	})
	$(".gridbox").on('click',function(){
		var index = parseInt($(this).attr("id"))
		if($(this).hasClass("tiniseed") && !hasfruit(index)){ //planting tiniseed
			plant("tiniseed",index)
		}
		else if($(this).hasClass("ocreseed") && !hasfruit(index)){ //planting ocreseed
			plant("ocreseed",index)
		}
		else if($(this).hasClass("duperseed") && !hasfruit(index)){ //planting duperseed
			plant("duperseed",index)
		}
		else if($(this).attr("content")=="tinifruit"){ //harvesting tinifruit
			$(".gridbox").removeClass("planting")
			$(".gridbox").removeClass("tiniseed")	
			var i = $(this).attr("id");
			inventory[3]["quantity"]++;
			clean(i)
			update_inventory()
		}
		else if($(this).attr("content")=="ocrefruit"){ //harvesting ocrefruit
			$(".gridbox").removeClass("planting")
			$(".gridbox").removeClass("tiniseed")	
			var i = $(this).attr("id");
			inventory[4]["quantity"]++;
			clean(i)
			update_inventory()
		}
		else if($(this).attr("content")=="duperfruit"){ //harvesting duperfruit
			$(".gridbox").removeClass("planting")
			$(".gridbox").removeClass("tiniseed")	
			var i = $(this).attr("id");
			inventory[5]["quantity"]++;
			clean(i)
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
			$(".gridbox").addClass("planting");
			$(".gridbox").addClass("tiniseed");
			$(".gridbox").removeClass("duperseed");
			$(".gridbox").removeClass("ocreseed");
			$("#tiniseed").css('background',"#d4eacb")
	})
	$("body").on('click','#ocreseed',function(){
			$(".gridbox").addClass("planting");
			$(".gridbox").addClass("ocreseed");
			$(".gridbox").removeClass("tiniseed");
			$(".gridbox").removeClass("duperseed");
			$("#ocreseed").css('background',"#d4eacb")
	})
	$("body").on('click','#duperseed',function(){
			$(".gridbox").addClass("planting");
			$(".gridbox").addClass("duperseed");
			$(".gridbox").removeClass("tiniseed");
			$(".gridbox").removeClass("ocreseed");
			$("#duperseed").css('background',"#d4eacb")
	})

	$("#buy_tiniseed").on('click',function(){
		if(cash>=inventory[0]["price"]){
			checkachievements(2)
			cash-=inventory[0]["price"]
			update_sidevalue()
			inventory[0]["quantity"]++
			update_inventory();
		}
	})
	$("#buy_ocreseed").on('click',function(){
		if(cash>=inventory[1]["price"]){
			cash-=inventory[1]["price"]
			update_sidevalue()
			inventory[1]["quantity"]++
			update_inventory();
		}
	})
	$("#buy_duperseed").on('click',function(){
		if(cash>=inventory[2]["price"]){
			cash-=inventory[2]["price"]
			update_sidevalue()
			inventory[2]["quantity"]++
			update_inventory();
		}
	})
	$("#sell_tinifruit").on('click',function(){
		if(inventory[3]["quantity"]>0){
			inventory[3]["quantity"]--
			cash=cash+inventory[3]["price"]
			update_sidevalue()
			update_inventory();
		}
	})
	$("#sell_ocrefruit").on('click',function(){
		if(inventory[4]["quantity"]>0){
			inventory[4]["quantity"]--
			cash=cash+inventory[4]["price"]
			update_sidevalue()
			update_inventory();
		}
	})
	$("#sell_duperfruit").on('click',function(){
		if(inventory[5]["quantity"]>0){
			inventory[5]["quantity"]--
			cash=cash+inventory[5]["price"]
			update_sidevalue()
			update_inventory();
		}
	})

})