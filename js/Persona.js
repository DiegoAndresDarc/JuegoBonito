function Persona(){
	this.x = 55;
	this.y = 397;
	this.img = [$("#normal")[0],$("#derecha")[0],$("#izquierda")[0],$("#golpe")[0]];
	this.sprite = 0;
	this.vida = 100;
	this.puntos = 0;
		
	this.dibujar = function(ctx){
		var img = this.img[this.sprite];
		var x = this.x;
		var y = this.y;
		ctx.drawImage(img, x, y);
		ctx.save();
		ctx.fillStyle = "#ffffff";
		ctx.font = "15px sans-serif";
		ctx.fillText("Puntos: "+ this.puntos, 10, 15);
		ctx.fillText("Vida: "+ this.vida, 10, 30)
		ctx.restore();
	}
	
	this.actualizar = function(accion){
		if(accion=="arriba" && this.y >5){
			this.y -= 10;
			this.sprite = 0;
		}
		if(accion=="abajo"  && this.y < 427){
			this.y += 10;
			this.sprite = 0;
		}
		if(accion=="izquierda"){
			this.x -= 10;
			this.sprite = 2;
		}
		if(accion=="derecha"){
			this.x += 10;
			this.sprite = 1;
		}
		this.x = (885 + this.x)%885;	
	}
	
	this.colision = function(x,y){
		var distancia=Math.sqrt( Math.pow( (x-this.x), 2)+Math.pow( (y-this.y),2));
		if(distancia>this.img[this.sprite].width)
		   return false;
		else
		   return true;	
	}
}