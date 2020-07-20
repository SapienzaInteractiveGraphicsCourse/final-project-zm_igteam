// vehicles variables
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



function muovi_macchina(macchina, muovi, valore, sposta, angolo, sterza, time){

  for (const wheel of macchina.children) {
    wheel.rotation.y = 2*time;
  }

  if(muovi < valore) { //if (x - x+value) < 0
  macchina.rotation.z =  lerp2(macchina.rotation.z, sterza, 0.04)
  macchina.position.x -= sposta;
  }
  else if(muovi < 2*valore){
    macchina.rotation.z =  lerp2(macchina.rotation.z, sterza, 0.04)
    macchina.position.z -= sposta;
    }
  else if(muovi < 3*valore){
    macchina.rotation.z =  lerp2(macchina.rotation.z, sterza, 0.04)
    macchina.position.x += sposta;
    }
  else{
    macchina.rotation.z =  lerp2(macchina.rotation.z, sterza, 0.04)
    macchina.position.z += sposta;
    }
}
