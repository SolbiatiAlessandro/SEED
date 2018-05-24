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
}
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
	$("#season").text(season);
	$("#seeds").text(seeds);
	$("#fruits").text(fruits);
	$("#cash").text(cash);
	var percentage = (season/victory_time)*100
	$(".innerprogress").css("width",percentage+"%")
}
function update_price(){
	s = season%4
	if(s==3){s=1}
	r = Math.floor(Math.random() * 2) - 1
	inventory[3]["price"] = s+r+2
	$("#price_tinifruit").text("$"+inventory[3]["price"])
	if(season%4 == 1 || season%4 == 2){
		//$("#price_tinifruit")()[0].remove()
		$("#price_tinifruit").append("<img src='img/up.png' width='15' class='arrow'>")
	}
	else{
		//$("#price_tinifruit").children()[0].remove()
		$("#price_tinifruit").append("<img src='img/down.png' width='15' class='arrow'>")
	}
}
function clean(id){
	$("#"+id).toggleClass("choosen")
	$("#"+id).toggleClass("fruit")
	$("#"+id).toggleClass("tinifruit")
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
				$("#lifespan"+i).text(lifespan[i]+"s")
			}
			if(lifespan[i]==0){
				lifespan[i]==-1
				//fruit_price[i] = (Math.floor(Math.random() * MAXfruit_price)+1)
				$("#img"+i).attr("src","img/tinifruit.png")
				$("#img"+i).toggleClass("grid_tiniseed")
				$("#img"+i).toggleClass("grid_tinifruit")
				$("#lifespan"+i).text("")
				$("#"+i).toggleClass("fruit")
				$("#"+i).toggleClass("tinifruit")
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
function checkachievements(){
	var i = 0;
	while(achievements[i].completed==1){i++}
	if(achievements[i].achieved()){
		$(".achievement_box").toggleClass("achieved");
		if((++i)+1!=achievements.length+1){
			setTimeout(function(){
				$(".achievement_box").toggleClass("achieved");
				$("#achievement").text(achievements[i].name)
				$("#prize")[0].innerHTML = achievements[i].prize+"<img class='prizeimg' src='"+achievements[i].img+"'>"
				$("#achievement_curr")[0].innerHTML = ((i)+1)
			},2000)
		}
		else{
			$("#achievement").text("YOU COMPLETED ALL THE GOALS! ")
			$("#prize")[0].innerHTML = "EARNED $ "+cash
			$("#achievement_curr")[0].innerHTML = ((i))
		}
	}
}
