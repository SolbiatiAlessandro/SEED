var lifespan = Array.from({length: 100}, () => -1)
var lifespan_vals = Array.from({length: 100}, () => (Math.floor(Math.random() * 5)+1))


function update_inventory(){
	var temp  = $(".inventory").children().length;
	for (var i = 0; i < temp; i++) {
		$(".inventory").children()[0].remove()
	}
	for (var i=0; i<inventory.length;i++) {
		var item = inventory[i];
		if (item["quantity"]>0) {
			$(".inventory").append("<div style='position:relative;'><img src='img/"+item["name"]+".png' class='inventory_item' id='"+item["name"]+"'><span class='inventory_label'>"+item["quantity"]+"</span></div>");
		}
	}

	//update shop
	if(inventory[3].quantity>0){
		$("#sell_tinifruit").removeClass("hidden");
	}
	else{
		$("#sell_tinifruit").addClass("hidden");
	}
	if(inventory[4].quantity>0){
		$("#sell_ocrefruit").removeClass("hidden");
	}
	else{
		$("#sell_ocrefruit").addClass("hidden");
	}
	if(inventory[5].quantity>0){
		$("#sell_duperfruit").removeClass("hidden");
	}
	else{
		$("#sell_duperfruit").addClass("hidden");
	}
}
// deprecated
function update_values(i){
	level = levels[i]["level"];
	$("#level").text(level)
	seedprice = levels[i]["seedprice"];
	$("#seedprice").text(seedprice+"$")
	MAXfruit_price = levels[i]["MAXfruit_price"];
	victory_time = levels[i]["victory_time"];
	size = levels[i]["size"]
}
function update_sidevalue() {
	$("#seasonhere").text(" "+season);
	$("#seeds").text(seeds);
	$("#fruits").text(fruits);
	$("#cash").text(cash);

	//updating shop
	active_color = "1"
	inactive_color = "0.5"
	if(cash>=inventory[0].price){
		$("#buy_tiniseed").css("opacity",active_color);
	}
	else{
		$("#buy_tiniseed").css("opacity",inactive_color);
	}
	if(cash>=inventory[1].price){
		$("#buy_ocreseed").css("opacity",active_color);
	}
	else{
		$("#buy_ocreseed").css("opacity",inactive_color);
	}
	if(cash>=inventory[2].price){
		$("#buy_duperseed").css("opacity",active_color);
	}
	else{
		$("#buy_duperseed").css("opacity",inactive_color);
	}

	var percentage = (season/victory_time)*100
	$(".innerprogress").css("width",percentage+"%")

}
function update_price(){
	s = season%4
	if(s==3){s=1}
	r = Math.floor(Math.random() * 2) - 1
	inventory[3]["price"] = s+r+2
	r2 = Math.floor(Math.random()*45)
	inventory[4]["price"] = s*15 + r2 + 20
	r3 = Math.floor(Math.random()*500)
	inventory[5]["price"] = s*150 + r3 + 400
	$("#price_tinifruit").text("$"+inventory[3]["price"])
	$("#price_ocrefruit").text("$"+inventory[4]["price"])
	$("#price_duperfruit").text("$"+inventory[5]["price"])
	if(season%4 == 1 || season%4 == 2){
		//$("#price_tinifruit")()[0].remove()
		$("#price_tinifruit").append("<img src='img/up.png' width='15' class='arrow'>")
		$("#price_ocrefruit").append("<img src='img/up.png' width='15' class='arrow'>")
		$("#price_duperfruit").append("<img src='img/up.png' width='15' class='arrow'>")
	}
	else{
		//$("#price_tinifruit").children()[0].remove()
		$("#price_tinifruit").append("<img src='img/down.png' width='15' class='arrow'>")
		$("#price_ocrefruit").append("<img src='img/down.png' width='15' class='arrow'>")
		$("#price_duperfruit").append("<img src='img/down.png' width='15' class='arrow'>")
	}
}
function clean(id){
	$("#"+id).toggleClass("fruit")
	$("#"+id).attr("content","")
	$("#"+id).children()[1].remove()
	$("#"+id).children()[1].remove()
}
function sell_fruits() {
	var res = 0;
		for(var i=0;i<100;i++){
			if(fruit_price[i]!=-1){
				clean(i)
				res+=fruit_price[i];
				fruit_price[i]=-1;
			}
		}
		cash+=res
		update_sidevalue()
}
function next_season(){

	for (var i = lifespan.length - 1; i >= 0; i--) {
		//$("#debug"+i).text(lifespan[i])
		if(lifespan[i]!=-1){
			--lifespan[i];
			if(lifespan[i]!=0 && !$("#"+i).hasClass("fruit")){
				$("#lifespan"+i).text(lifespan[i])
			}
			else if(lifespan[i]==0){
				lifespan[i]==-1
				if($("#"+i).attr("content")=="tiniseed"){
					$("#img"+i).attr("src","img/tinifruit.png")
					$("#img"+i).toggleClass("grid_tiniseed")
					$("#img"+i).toggleClass("grid_tinifruit")
					$("#lifespan"+i).text("")
					$("#"+i).toggleClass("fruit")
					$("#"+i).attr("content","tinifruit")
				}
				else if($("#"+i).attr("content")=="ocreseed"){
					$("#img"+i).attr("src","img/ocrefruit.png")
					$("#img"+i).toggleClass("grid_ocreseed")
					$("#img"+i).toggleClass("grid_ocrefruit")
					$("#lifespan"+i).text("")
					$("#"+i).toggleClass("fruit")
					$("#"+i).attr("content","ocrefruit")
				}
				else if($("#"+i).attr("content")=="duperseed"){
					$("#img"+i).attr("src","img/duperfruit.png")
					$("#img"+i).toggleClass("grid_duperseed")
					$("#img"+i).toggleClass("grid_duperfruit")
					$("#lifespan"+i).text("")
					$("#"+i).toggleClass("fruit")
					$("#"+i).attr("content","duperfruit")
				}
			}

		}
	} 
	season++
	update_sidevalue()
	update_price()

}
function checkvictory(){
	var victory = 1;
	for (var i = size; i >= 1; i--) {
		for (var j = size - 1; j >= 0; j--) {
			if(!($("#"+i+j).hasClass("choosen"))){
				victory = 0;
			}
		}
	}
	if(victory==1){
		for(var i = 0; i<3000; i=i+500){
			setTimeout(function(){
				$("#victory").toggleClass('hidden')
				next_season()
			},i)
		}
		setTimeout(function(){
			season=0
			update_sidevalue()
			update_values(1)
		},3000)
		return 1;
	}
	return 0;
}
function checkachievements(trigger_index){
	//default trigger_index: -1
	var i = 0;
	while(achievements[i].completed==1){i++}
	if(achievements[i].achieved() || i==trigger_index){
		if(trigger_index!=-1){
			//if called with trigger_index!=-1 need to trigger the achievement
			achievements[trigger_index].trigger()	
		} 
		$(".achievement_box").toggleClass("achieved");
		if((++i)+1!=achievements.length+1){
			setTimeout(function(){
				$(".achievement_box").toggleClass("achieved");
				$("#achievement").text(achievements[i].name)
				if(prizes){
					$("#prize")[0].innerHTML = achievements[i].prize+"<img class='prizeimg' src='"+achievements[i].img+"'>"
				}
				$("#achievement_curr")[0].innerHTML = ((i)+1)
			},2000)
		}
		else{
			$("#achievement").text("You completed all the goals! ")
			$("#prize")[0].innerHTML = "EARNED $ "+cash
			$("#achievement_curr")[0].innerHTML = ((i))
		}
	}
}
function removepopup(){
	$("#popup").addClass("hidden")
	$("#opacityscreen").addClass("hidden")
}
function plant(content, index){

	if($("#"+index).attr("content")==""){ //if empty plant it
		lifespan[index] = lifespan_vals[index]
		$("#"+index).append("<img id='img"+index+"' src='img/"+content+".png' class='grid_"+content+"'><span id='lifespan"+index+"' class='apex'>"+lifespan[index]+"</span>")
		$("#"+index).attr("content",content)
		$("#"+index).removeClass("planting")
		$("#"+index).removeClass(content)

		//update inventory
		if(content=="tiniseed"){
			inventory[0]["quantity"]--;
			if(inventory[0]["quantity"]==0){
				$(".gridbox").removeClass("planting")
				$(".gridbox").removeClass("tiniseed")
			}
			update_inventory()
		}
		if(content=="ocreseed"){
			inventory[1]["quantity"]--;
			if(inventory[1]["quantity"]==0){
				$(".gridbox").removeClass("planting")
				$(".gridbox").removeClass("ocreseed")
			}
			update_inventory()
		}
		if(content=="duperseed"){
			inventory[2]["quantity"]--;
			if(inventory[2]["quantity"]==0){
				$(".gridbox").removeClass("planting")
				$(".gridbox").removeClass("duperseed")
			}
			update_inventory()
		}
	}
}
function hasfruit(index) {
	if($("#"+index).attr("content") == "tinifruit" || $("#"+index).attr("content") == "ocrefruit" || $("#"+index).attr("content") == "duperfruit"){
		return 1
	} 
	return 0
}
