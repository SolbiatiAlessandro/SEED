_uuid = 0
var xpath = [];
var ypath = [];
function newchicken(x,y) {
	if(!x){x=-1}
	if(!y){y=0}
	var uuid = _uuid;
	_uuid++
	$("#grid").append("<div id='chicken"+uuid+"' class='chicken'><img src='img/chicken00.png' height='50'>chicken"+uuid+"</div>")
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
			
			//BUG NOT WORKING WIHT MULTIPLE CHICKENS

			cnt = 0
			id = this.uuid
			xpath.push([])
			ypath.push([])
			while((x-this.x)>0){	
				this.x++;
				xpath[id].push(this.x)
				setTimeout(function(){
					t = xpath[id].splice(1)
					$("#chicken"+id).css("right",(xpath[id]*20)+"%")
					xpath[id] = t
				},cnt)
				cnt+=200
			}
			while((y-this.y)>0){
				this.y++;
				ypath[id].push(this.y)
				setTimeout(function(){
					t = ypath[id].splice(1)
					$("#chicken"+id).css("bottom",(ypath[id]*20)+"%")
					ypath[id] = t
				},cnt)
				cnt+=200
			}
			//eat fruit
			cnt+=500
			while((6-this.y)>0){
				this.y++;
				ypath[id].push(this.y)
				setTimeout(function(){
					t = ypath[id].splice(1)
					$("#chicken"+id).css("bottom",(ypath[id]*20)+"%")
					ypath[id] = t
				},cnt)
				cnt+=200
			}

		console.log(xpath)
		console.log(ypath)
		}


		
	}
	return chicken
}