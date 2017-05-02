function aleatorio(piso,techo){
	return Math.floor(Math.random()*(techo-piso+1)) + piso;
}

function Portal(x,y){
	var opc = aleatorio(2,100) % 2;
	this.img = $("#portal")[0];		
	this.x = aleatorio(0,920);
	this.y = aleatorio(1,450);

	this.dibujar = function(ctx){
		var img = this.img;
		ctx.drawImage(img,this.x,this.y);
	}
	this.actualizar = function(){
		this.x = (943 + this.x)%943;
	}
}
