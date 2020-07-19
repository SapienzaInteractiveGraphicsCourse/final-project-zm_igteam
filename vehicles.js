// vehicles variables
var vehicle_speed = 0.001;
var camion;
var carPink;
var carBrown;
var carGreen;
var carBlack;
var carRed;
var carLimo;
var carPolice;
var carYellow;
var carWhite;

// variables for the vehicles movement
var value = 97;
var gira = 0;
var gira2 = Math.PI/2;
//var move = 0;

//var sterza = 0;



var flag_car1 = 0;


/*function move_vehicle(root, angle, shift){

//move += shift;

if(move < value) { //if (x - x+value) < 0
camion.rotation.z =  lerp2(camion.rotation.z, gira, 0.04)
camion.position.x -= shift;


carBlack.rotation.z =  lerp2(carBlack.rotation.z, gira-Math.PI/2, 0.04) // the -Math.PI is needed to have correct orientation when the car starts the movement
carBlack.position.z += shift;

carBrown.rotation.z =  lerp2(carBrown.rotation.z, gira-Math.PI, 0.04)
carBrown.position.x += shift;

carGreen.rotation.z =  lerp2(carGreen.rotation.z, -gira-Math.PI/2, 0.04)
carGreen.position.z += shift;

carLimo.rotation.z =  lerp2(carLimo.rotation.z, gira, 0.04)
carLimo.position.x -= shift;

carPink.rotation.z =  lerp2(carPink.rotation.z, gira+Math.PI, 0.04)
carPink.position.x += shift;

carPolice.rotation.z =  lerp2(carPolice.rotation.z, gira+Math.PI, 0.04)
carPolice.position.x += shift;

carRed.rotation.z =  lerp2(carRed.rotation.z, gira-Math.PI/2, 0.04)
carRed.position.z += shift;

carWhite.rotation.z =  lerp2(carWhite.rotation.z, gira+Math.PI/2, 0.04)
carWhite.position.z -= shift;

carYellow.rotation.z =  lerp2(carYellow.rotation.z, gira, 0.04)
carYellow.position.x -= shift;

if(move > value-shift){gira += angle;}

}

else if(move < 2*value){
  camion.rotation.z =  lerp2(camion.rotation.z, gira, 0.04)
  camion.position.z -= shift;

  carBlack.rotation.z =  lerp2(carBlack.rotation.z, gira-Math.PI/2, 0.04)
  carBlack.position.x -= shift;

  carBrown.rotation.z =  lerp2(carBrown.rotation.z, gira-Math.PI, 0.04)
  carBrown.position.z += shift;

  carGreen.rotation.z =  lerp2(carGreen.rotation.z, -gira-Math.PI/2, 0.04)
  carGreen.position.x += shift;

  carLimo.rotation.z =  lerp2(carLimo.rotation.z, gira, 0.04)
  carLimo.position.z -= shift;

  carPink.rotation.z =  lerp2(carPink.rotation.z, gira+Math.PI, 0.04)
  carPink.position.z += shift;

  carPolice.rotation.z =  lerp2(carPolice.rotation.z, gira+Math.PI, 0.04)
  carPolice.position.z += shift;

  carRed.rotation.z =  lerp2(carRed.rotation.z, gira-Math.PI/2, 0.04)
  carRed.position.x -= shift;

  carWhite.rotation.z =  lerp2(carWhite.rotation.z, gira+Math.PI/2, 0.04)
  carWhite.position.x += shift;

  carYellow.rotation.z =  lerp2(carYellow.rotation.z, gira, 0.04)
  carYellow.position.z -= shift;

if(move > (2*value)-shift){gira += angle;}

}

else if(move < 3*value){
  camion.rotation.z =  lerp2(camion.rotation.z, gira, 0.04)
  camion.position.x += shift;

  carBlack.rotation.z =  lerp2(carBlack.rotation.z, gira-Math.PI/2, 0.04)
  carBlack.position.z -= shift;

  carBrown.rotation.z =  lerp2(carBrown.rotation.z, gira-Math.PI, 0.04)
  carBrown.position.x -= shift;

  carGreen.rotation.z =  lerp2(carGreen.rotation.z, -gira-Math.PI/2, 0.04)
  carGreen.position.z -= shift;

  carLimo.rotation.z =  lerp2(carLimo.rotation.z, gira, 0.04)
  carLimo.position.x += shift;

  carPink.rotation.z =  lerp2(carPink.rotation.z, gira+Math.PI, 0.04)
  carPink.position.x -= shift;

  carPolice.rotation.z =  lerp2(carPolice.rotation.z, gira+Math.PI, 0.04)
  carPolice.position.x -= shift;

  carRed.rotation.z =  lerp2(carRed.rotation.z, gira-Math.PI/2, 0.04)
  carRed.position.z -= shift;

  carWhite.rotation.z =  lerp2(carWhite.rotation.z, gira+Math.PI/2, 0.04)
  carWhite.position.z += shift;

  carYellow.rotation.z =  lerp2(carYellow.rotation.z, gira, 0.04)
  carYellow.position.x += shift;

if(move > (3*value)-shift){gira += angle;}

}

else{
  camion.rotation.z =  lerp2(camion.rotation.z, gira, 0.04)
  camion.position.z += shift;

  carBlack.rotation.z =  lerp2(carBlack.rotation.z, gira-Math.PI/2, 0.04)
  carBlack.position.x += shift;

  carBrown.rotation.z =  lerp2(carBrown.rotation.z, gira-Math.PI, 0.04)
  carBrown.position.z -= shift;

  carGreen.rotation.z =  lerp2(carGreen.rotation.z, -gira-Math.PI/2, 0.04)
  carGreen.position.x -= shift;

  carLimo.rotation.z =  lerp2(carLimo.rotation.z, gira, 0.04)
  carLimo.position.z += shift;

  carPink.rotation.z =  lerp2(carPink.rotation.z, gira+Math.PI, 0.04)
  carPink.position.z -= shift;

  carPolice.rotation.z =  lerp2(carPolice.rotation.z, gira+Math.PI, 0.04)
  carPolice.position.z -= shift;

  carRed.rotation.z =  lerp2(carRed.rotation.z, gira-Math.PI/2, 0.04)
  carRed.position.x += shift;

  carWhite.rotation.z =  lerp2(carWhite.rotation.z, gira+Math.PI/2, 0.04)
  carWhite.position.x -= shift;

  carYellow.rotation.z =  lerp2(carYellow.rotation.z, gira, 0.04)
  carYellow.position.z += shift;


  if(move >= 4*value){ // if the square movement is complete we can restart it
  gira += angle;
  move = 0;
  }
}

} */


function muovi_macchina(macchina, muovi, valore, sposta, angolo, sterza, time){

  for (const wheel of macchina.children) {
    wheel.rotation.y = 2*time;
  }

  //muovi+= sposta;

  if(muovi < valore) { //if (x - x+value) < 0
  macchina.rotation.z =  lerp2(macchina.rotation.z, sterza, 0.04)
  macchina.position.x -= sposta;

  //console.log("sterza for ", macchina.name," is", sterza);


  }

  else if(muovi < 2*valore){
    macchina.rotation.z =  lerp2(macchina.rotation.z, sterza, 0.04)
    macchina.position.z -= sposta;

    //console.log("sterza for ", macchina.name," is", sterza);



    }

  else if(muovi < 3*valore){
    macchina.rotation.z =  lerp2(macchina.rotation.z, sterza, 0.04)
    macchina.position.x += sposta;

    //console.log("sterza 3 for ", macchina.name," is", sterza);



    }

  else{
    macchina.rotation.z =  lerp2(macchina.rotation.z, sterza, 0.04)
    macchina.position.z += sposta;

    }

}
