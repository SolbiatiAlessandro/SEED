function update_inventory(){
	var temp  = $(".inventory").children().length;
	for (var i = 0; i < temp; i++) {
		$(".inventory").children()[0].remove()
	}
	for (var i=0; i<inventory.length;i++) {
		var item = inventory[i];
		console.log(item)
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
function update_sidevalue(season,seeds,fruits,cash) {
	$("#season").text(season);
	$("#seeds").text(seeds);
	$("#fruits").text(fruits);
	$("#cash").text(cash);
	var percentage = (season/victory_time)*100
	$(".innerprogress").css("width",percentage+"%")
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
		update_sidevalue(season,seeds,fruits,cash)
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
				$("#lifespan"+i).text("")
				$("#"+i).toggleClass("fruit")
				$("#"+i).toggleClass("tinifruit")
			}
		}
	}
	update_sidevalue(++season,seeds,fruits,cash)

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
			sell_fruits()
			seeds=0
			season=0
			update_sidevalue(season,seeds)
			update_values(1)
		},3000)
		return 1;
	}
	return 0;
}
