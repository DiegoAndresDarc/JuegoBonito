var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	lienzo = $("#lienzo")[0];
	ctx = lienzo.getContext("2d");
	buffer = document.createElement("canvas");
	persona = new Persona();
	portal = new Portal();
	mina = [new Mina(),new Mina(), new Mina(),new Mina()];
	run();
	$("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38)
		persona.actualizar('arriba');
	if(event.which==40)
		persona.actualizar('abajo');
	if(event.which==39)
		persona.actualizar('derecha');
	if(event.which==37)
		persona.actualizar('izquierda');
}
function aleatorio(piso,techo){
	return Math.floor(Math.random()*(techo-piso+1)) + piso;
}

function run(){
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	
	if(jugando){
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		persona.dibujar(contextoBuffer);
		portal.dibujar(contextoBuffer);
		for(i=0;i<mina.length;i++){
			mina[i].dibujar(contextoBuffer);
			mina[i].actualizar();
			if(persona.colision(mina[i].x,mina[i].y)){
				persona.sprite = 3;
				persona.vida = persona.vida-5;
				mina[i].x = aleatorio(0,620);
				mina[i].y = aleatorio(1,450);
			}
		}
		if(persona.colision(portal.x,portal.y)){
			persona.puntos =persona.puntos+5;
			portal.x = aleatorio(0,620);
			portal.y = aleatorio(1,450);
			persona.x = aleatorio(0,620);
			persona.y = aleatorio(1,450);
			mina.push(new Mina());
		}
		if(persona.vida <=0)
			jugando = false;
			ctx.clearRect(0,0,lienzo.width,lienzo.height);
			ctx.drawImage(buffer,0,0);
			setTimeout("run()",20);
	}else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		persona.sprite = 3;
		persona.vida = 0;
		persona.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAMEOVER", 300, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "15px sans-serif";
		ctx.clearRect(0,0,lienzo.width,lienzo.height);
		ctx.drawImage(buffer, 0, 0);
	}
}