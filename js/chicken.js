_uuid = 0
var xpath = [];
var ypath = [];
function newchicken(x,y) {
	if(!x){x=0}
	if(!y){y=-1}
	var uuid = _uuid;
	_uuid++
	$("#grid").append("<div id='chicken"+uuid+"' class='chicken'><img id='imgA"+uuid+"' src='img/chicken/Walkingchick.png' class='chickenimg'><img id='imgB"+uuid+"' src='img/chicken/Eatingchick.png' class='hidden chickenimg'></div>")
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
		eatfruit : function(x,y,speed){ //works only going left to right, down to up
			
			//BUG NOT WORKING WIHT MULTIPLE CHICKENS
			cnt = 0
			id = this.uuid
			$("#chicken"+id).css("bottom",(this.y*20)+"%")
			$("#chicken"+id).css("right",(this.x*20)+"%")
			xpath.push([])
			ypath.push([])
			while((y-this.y)>0){
				this.y++;
				ypath[id].push(this.y)
				setTimeout(function(){
					t = ypath[id].splice(1)
					$("#chicken"+id).css("bottom",(ypath[id]*20)+"%")
					ypath[id] = t
				},cnt)
				cnt+=speed
			}	
			while((x-this.x)>0){	
				this.x++;
				xpath[id].push(this.x)
				setTimeout(function(){

					t = xpath[id].splice(1)
					$("#chicken"+id).css("right",(xpath[id]*20)+"%")
					xpath[id] = t
				},cnt)
				cnt+=speed
			}
			
			//eat fruit
			setTimeout(function(){
					$("#imgB"+uuid).removeClass("hidden")
					$("#imgA"+uuid).addClass("hidden")
			},cnt)
			//discuss with sisi about animation
			console.log(x,y)
			console.log($("#"+y+x).attr("content"))
			cnt+=800
			setTimeout(function(){	
					clean(""+y+x)
			},cnt)
			setTimeout(function(){
					$("#imgA"+uuid).removeClass("hidden")
					$("#imgB"+uuid).addClass("hidden")
			},cnt)
			while((5-this.y)>0){
				this.y++;
				ypath[id].push(this.y)
				setTimeout(function(){
					t = ypath[id].splice(1)
					$("#chicken"+id).css("bottom",(ypath[id]*20)+"%")
					ypath[id] = t
				},cnt)
				cnt+=speed
			}
			setTimeout(function(){
					$("#chicken"+id).addClass("hidden")
				},cnt)

		console.log(xpath)
		console.log(ypath)
		}


		
	}
	return chicken
}