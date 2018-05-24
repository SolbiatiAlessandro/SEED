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

var achievements = [
	{
		name:"Plant your first seed",
		completed:0,
		prize:"$ 1",
		img:"",
		getprize:function(){
			cash++;
			update_sidevalue()		
		},
		achieved:function(){
			if(inventory[0].quantity==0){
				this.completed=1;
				this.getprize()
				return 1;
			}
			return 0;
		}
	},
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
	},
	{
		name:"Get your first fruit",
		completed:0,
		prize:"UNLOCK shop",
		img:"",
		getprize:function(){
			msg = "Shop - Unlocked"
			$("#message")[0].innerHTML = "<div>"+msg+"</div><img src='"+this.img+"' class='popupimg'>"
			$("#opacityscreen").removeClass("hidden")
			$("#popup").removeClass("hidden")
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

]
