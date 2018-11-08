var AutoCountry = {};
AutoCountry = function() {
	this.minChars = 0;
	this.field = null;
	this.countryLoopId = 0;
	this.helper = null;
	this.helperContent = "";
}

			

AutoCountry.prototype = {
	init:function(idOfTheField) {
		this.field = document.getElementById(idOfTheField);
		if(!this.field) {
			alert("Wrong input !");
		} else {
			this.createHelper();
			this.field.onfocus = this.onFieldIn;
			this.field.onblur = this.onFieldOut;
		}
	},
	onFieldIn:function() {
		AC.loop();
	},
	onFieldOut:function() {
		clearTimeout(AC.countryLoopId);
		setTimeout("AC.hideHelper()", 600);
	},
	loop:function() {
		var list = "";
		var value = AC.field.value;
		if(value.length >= this.minChars) {
			var numOfCountries = countries.length;
			for(var i=0; i<numOfCountries; i++) {
				if(value.toLowerCase() == countries[i].substr(0, value.length).toLowerCase()) {
					list += '<a href="javascript:AC.setCountry(\'' + countries[i] + '\');">' + countries[i] + '</a>'
				}
			}
		}
		if(list != "") {
			if(this.helperContent != list) {
				this.helperContent = list;
				this.helper.innerHTML = this.helperContent;
			}
			this.showHelper();
		} else {
			this.hideHelper();
		}
		AC.countryLoopId = setTimeout("AC.loop()", 200);
	},
	setCountry:function(country) {
		this.field.value = country;
		this.hideHelper();
	},
	// helper
	createHelper:function() {
		this.helper = document.createElement("div");
		this.helper.style.width = (this.field.offsetWidth - 22) + "px";
		this.helper.setAttribute("id", "helper");
		this.helper.innerHTML = "";
		document.body.appendChild(this.helper);
		this.positionHelper();
		this.hideHelper();
	},
	positionHelper:function() {
		var position = {x:0, y:0};
		var e = this.field;
		while(e) {
			position.x += e.offsetLeft;
			position.y += e.offsetTop;
			e = e.offsetParent;
		}
		this.helper.style.left = position.x + "px";
		this.helper.style.top = (position.y + this.field.offsetHeight)+ "px";
	},
	showHelper:function() {
		this.helper.style.display = "block";
	},
	hideHelper:function() {
		this.helper.style.display = "none";
	}
}

var AC = new AutoCountry();


var countries = [
	"Russia",
	"USA",
	"England",
	"France",
	"Germany"
];
var filter = function(countries) {
	var tmp = {};
	return countries.filter(function (c) {
		return c in tmp ? 0 : tmp[c] = 1;
	});
};

function pushData() {
	var inputText = document.getElementById('addCountry').value;
	countries.push(inputText);
	countries = filter(countries);	
}

function show() {
	var checked = [];
	var count = countries.length;
	var i = 0;
	var x = document.getElementById('countryField').value;

	// for (i = 0; i< count; i++) {
	// 	if (document.getElementById('countryField').selected) {
	// 		console.log("+");
	// 	}
	// }
	
	alert("Выбранная страна :" + "" + x);


	// while (++i <= count) {
		// 	if(document.getElementById('countryField').selected) {
		// 		checked.push(countries.index);
		// 		console.log(countries.index);
		// 	}
		// }
}

function multi() {
	console.log("+");
	var x = document.getElementById('countryField').value;
	var newArr = countries;
	var i =0;
	for (i; i<countries.length; i++) {
		if (x == countries[i]){
			
			newArr =  countries.splice(i, 1);
			
		}
	}
	console.log(newArr, countries);
	// console.log(newArr + x);
}
function multi2() {
	console.log(countries);
}






