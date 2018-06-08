//levels has been taken down 
var levels = [
	{
		"level":1,
		"seedprice":1,
		"MAXfruit_price":4,
		"victory_time":10,
		"size":5
	},
	{
		"level":2,
		"seedprice":25,
		"MAXfruit_price":75,
		"victory_time":12,
		"size":5
	}
]

var prizes = 0
var achievements = [
	{
		name:"Plant a tiniseed",
		completed:0,
		prize:"2 ",
		img:"img/tiniseed.png",
		getprize:function(){
			if(prizes){
				inventory[0].quantity++;
				inventory[0].quantity++;
				update_inventory();		
			}
		},
		achieved:function(){
			if(inventory[0].quantity==2){
				this.completed=1;
				this.getprize()
				return 1;
			}
			return 0;
		}
	},
	/*
	{
		name:"Go to the next season",
		completed:0,
		prize:"UNLOCK ",
		img:"img/tinifruit.png",
		getprize:function(){
			msg = "Tinifruit - Unlocked"
			$("#message")[0].innerHTML = "<div>"+msg+"</div><img src='"+this.img+"' class='popupimg'>"
			$("#opacityscreen").removeClass("hidden")
			$("#popup").removeClass("hidden")
		},
		achieved:function(){
			if(season==1){
				this.completed=1;
				this.getprize()
				return 1;
			}
			return 0;
		}
	},*/
	{
		name:"Harvest a tinifruit",
		completed:0,
		prize:"UNLOCK shop",
		img:"",
		getprize:function(){
			if(prizes){
				msg = "Shop - Unlocked"
				$("#message")[0].innerHTML = "<div>"+msg+"</div><img src='"+this.img+"' class='popupimg'>"
				$("#opacityscreen").removeClass("hidden")
				$("#popup").removeClass("hidden")
			}
		},
		achieved:function(){
			if(inventory[3].quantity==1){
				this.completed=1;
				this.getprize()
				return 1;
			}
			return 0;
		}
	},
	{
		name:"Buy a tiniseed",
		completed:0,
		prize:"1 tiniSEED",
		img:"",
		getprize:function(){
			if(prizes){
				inventory[0].quantity++;
				update_inventory();
			}
		},
		trigger:function(){
			this.completed=1;
			this.getprize()
		},
		achieved:function(){
			return this.completed;
		}
	},
	{
		name:"Have 10 seeds planted at the same time",
		completed:0,
		prize:"$ 5",
		img:"",
		getprize:function(){
			cash+=5
			update_sidevalue()
		},
		achieved:function(){
			res = 0
			for (var i = size; i >= 1; i--) {
				for (var j = size - 1; j >= 0; j--) {
					if(($("#"+i+j).attr("content")=="tiniseed")){
						res++;
					}
				}
			}
			if(res>9){
				this.completed=1;
				this.getprize()
				return 1;
			}
			else{
				return 0;
			}
		}
	},
	{
		name:"Plant an ocreseed",
		completed:0,
		prize:"",
		img:"",
		getprize:function(){alert("warn: getprize()")},
		achieved:function(){
			for (var i = size; i >= 1; i--) {
				for (var j = size - 1; j >= 0; j--) {
					if(($("#"+i+j).attr("content")=="ocreseed")){
						this.completed=1;
						//this.getprize()
						return 1;
					}
				}
			}	
			return 0;
		}
	},
	{
		name:"Have more than 5 ocrefruit in your inventory",
		completed:0,
		prize:"",
		img:"",
		getprize:function(){alert("warn: getprize()")},
		achieved:function(){
			if(inventory[4]["quantity"]>4){
				this.completed=1
				//this.getprize()
				return 1
			}
			return 0;
		}
	},
	{
		name:"Plant a duperseed",
		completed:0,
		prize:"",
		img:"",
		getprize:function(){alert("warn: getprize()")},
		achieved:function(){
			for (var i = size; i >= 1; i--) {
				for (var j = size - 1; j >= 0; j--) {
					if(($("#"+i+j).attr("content")=="duperseed")){
						this.completed=1;
						//this.getprize()
						return 1;
					}
				}
			}	
			return 0;
		}
	},
	{
		name:"Fill the whole map with duperfruits",
		completed:0,
		prize:"",
		img:"",
		getprize:function(){alert("warn: getprize()")},
		achieved:function(){
			for (var i = size; i >= 1; i--) {
				for (var j = size - 1; j >= 0; j--) {
					if(($("#"+i+j).attr("content")!="duperfruit")){
						return 0;
					}
				}
			}
			this.completed=1	
			return 1;
		}
	}
]
