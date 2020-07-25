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



function move_vehicle(macchina, move, value, shift, turn, time){

  for (const wheel of macchina.children) {
    wheel.rotation.y = 2*time;
  }

  if(move < value) { //if (x - x+value) < 0
  macchina.rotation.z =  lerp2(macchina.rotation.z, turn, 0.04)
  macchina.position.x -= shift;
  }
  else if(move < 2*value){
    macchina.rotation.z =  lerp2(macchina.rotation.z, turn, 0.04)
    macchina.position.z -= shift;
    }
  else if(move < 3*value){
    macchina.rotation.z =  lerp2(macchina.rotation.z, turn, 0.04)
    macchina.position.x += shift;
    }
  else{
    macchina.rotation.z =  lerp2(macchina.rotation.z, turn, 0.04)
    macchina.position.z += shift;
    }
}
