function newchicken(x,y) {
	if(!x){x=-1}
	if(!y){y=0}
	var uuid = Math.floor(Math.random() * 1000000)
	$("#grid").append("<div id='chicken"+uuid+"' class='chicken'><img src='img/chicken00.png' height='50'></div>")
	var chicken = {
		x : x,
		y : y,
		uuid : uuid,
		appear : function(){
			$("#chicken"+this.uuid).removeClass("hidden")
		},
		disappear: function(){
			$("#chicken"+this.uuid).addClass("hidden")
		},
		moveleft : function(){
			this.x++;
			right = 20*this.x;
			$("#chicken"+this.uuid).css("right",right+"%")
		},
		moveup : function(){
			this.y++;
			bottom = 20*this.y;
			$("#chicken"+this.uuid).css("bottom",bottom+"%")
		},
		eatfruit : function(x,y){ //works only going left to right, down to up
			cnt = 0
			id = this.uuid
			xpath = []
			ypath = []
			while((x-this.x)>0){	
				this.x++;
				xpath.push(this.x)
				setTimeout(function(){
					t = xpath.splice(1)
					$("#chicken"+id).css("right",(xpath*20)+"%")
					xpath = t
				},cnt)
				cnt+=200
			}
			while((y-this.y)>0){
				this.y++;
				ypath.push(this.y)
				setTimeout(function(){
					t = ypath.splice(1)
					$("#chicken"+id).css("bottom",(ypath*20)+"%")
					ypath = t
				},cnt)
				cnt+=200
			}
			//eat fruit
			cnt+=500
			while((6-this.y)>0){
				this.y++;
				ypath.push(this.y)
				setTimeout(function(){
					t = ypath.splice(1)
					$("#chicken"+id).css("bottom",(ypath*20)+"%")
					ypath = t
				},cnt)
				cnt+=200
			}
		}

		
	}
	return chicken
}