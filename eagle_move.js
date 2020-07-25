// control variables
var eagleSpeed = 0.005;
var wingSpeed = 0.07;
var angleSpeed = 0.010;
var flag_eagle = 0;
var flag_eagle2 = 0;
var flag_eagle3 = 0;
var flag_eagle4 = 0;
var flag_eagle5 = 0;
var eagle_moves = []; // bi-dimensional array that contains all the movements positions

// eagle variables
var eagle;
var head;
var body;
var rightWing;
var leftWing;
var rightDownWing;
var leftDownWing;
var rightPaw;
var leftPaw;
var upperBeak;
var lowerBeak;

var startFly = false; // used to control the restarting of eagle movement



// ------------------- points for the eagle movement ----------------------
//         p0  p1   p2    p3    p4    p5     p6    p7    p8    p9    p10   p11   p12   p13   p14   p15    p16   p17   p18   p19   p20  p21    p22   p23   p24   p25   p26  p27
var bzX = [0,  0,    0,   -70,  -225, -225,  -70,   36,   50,   50,   50,   50,   50,   50,   180,  200,  200, -220, -220, -220,  170,  170,  150,  110,  90,   30,   58,  0];  // the positions are added to the 0,0,0
var bzY = [0,  0, -220, -140, -140,  -140,  -140,  -130, -120, -100, -220,  60,  -140, -140, -140, -100, -100, -100, -100, -100, -100, -100, -120, -120,  -120, -100,  0,  0];
var bzZ = [0,  20,  20,   20,   20,   165,   165,  165,  165,  176,  350,  350,  176, -180,  -64,   16,   450,  450,  16,  -150, -120,  -10,   35,   55,    55,  -65,  -10, 0];


eagle_moves = [lerp(2, 12, wingSpeed).concat(lerp(12, 2, wingSpeed)), // for the torso
               lerp(-Math.PI/4, Math.PI/4, wingSpeed).concat(lerp(Math.PI/4, -Math.PI/4, wingSpeed)), // for the upper wings
               lerp(Math.PI/4, 0, wingSpeed).concat(lerp(0, Math.PI/4, wingSpeed)), // for the lower wings on y
               lerp(-Math.PI/8, 0, wingSpeed).concat(lerp(0, -Math.PI/8, wingSpeed)), // for the lower wings on x
               lerp(0, -Math.PI/3, wingSpeed).concat(lerp(-Math.PI/3, 0, wingSpeed)), // for the paws


               bezier2(bzX[0], bzX[1], bzX[2], bzX[3], eagleSpeed).concat( // -5-
                 bezier2(bzX[3], bzX[4], bzX[5], bzX[6], eagleSpeed),
                 bezier2(bzX[6], bzX[7], bzX[8], bzX[9], eagleSpeed),
                 bezier2(bzX[9], bzX[10], bzX[11], bzX[12], eagleSpeed),
                 bezier2(bzX[12], bzX[13], bzX[14], bzX[15], eagleSpeed),
                 bezier2(bzX[15], bzX[16], bzX[17], bzX[18], eagleSpeed/2), //loop around the whole city
                 bezier2(bzX[18], bzX[19], bzX[20], bzX[21], eagleSpeed/2), //loop around the whole city
                 bezier2(bzX[21], bzX[21], bzX[23], bzX[24], eagleSpeed),
                 bezier2(bzX[24], bzX[25], bzX[26], bzX[27], eagleSpeed)),

               bezier2(bzY[0], bzY[1], bzY[2], bzY[3], eagleSpeed).concat( // -6-
                 bezier2(bzY[3], bzY[4], bzY[5], bzY[6], eagleSpeed),
                 bezier2(bzY[6], bzY[7], bzY[8], bzY[9], eagleSpeed),
                 bezier2(bzY[9], bzY[10], bzY[11], bzY[12], eagleSpeed),
                 bezier2(bzY[12], bzY[13], bzY[14], bzY[15], eagleSpeed),
                 bezier2(bzY[15], bzY[16], bzY[17], bzY[18], eagleSpeed/2), //loop around the whole city
                 bezier2(bzY[18], bzY[19], bzY[20], bzY[21], eagleSpeed/2), //loop around the whole city
                 bezier2(bzY[21], bzY[21], bzY[23], bzY[24], eagleSpeed),
                 bezier2(bzY[24], bzY[25], bzY[26], bzY[27], eagleSpeed)),

               bezier2(bzZ[0], bzZ[1], bzZ[2], bzZ[3], eagleSpeed).concat( // -7-
                 bezier2(bzZ[3], bzZ[4], bzZ[5], bzZ[6], eagleSpeed),
                 bezier2(bzZ[6], bzZ[7], bzZ[8], bzZ[9], eagleSpeed),
                 bezier2(bzZ[9], bzZ[10], bzZ[11], bzZ[12], eagleSpeed),
                 bezier2(bzZ[12], bzZ[13], bzZ[14], bzZ[15], eagleSpeed),
                 bezier2(bzZ[15], bzZ[16], bzZ[17], bzZ[18], eagleSpeed/2), //loop around the whole city
                 bezier2(bzZ[18], bzZ[19], bzZ[20], bzZ[21], eagleSpeed/2), //loop around the whole city
                 bezier2(bzZ[21], bzZ[21], bzZ[23], bzZ[24], eagleSpeed),
                 bezier2(bzZ[24], bzZ[25], bzZ[26], bzZ[27], eagleSpeed)),

               lerp(Math.PI/2, Math.PI, angleSpeed).concat( // - 8 -
                 lerp(Math.PI, Math.PI/2, angleSpeed),
                 lerp(Math.PI/2, Math.PI/2, angleSpeed),
                 lerp(Math.PI/2, Math.PI/2, angleSpeed),
                 lerp(Math.PI/2, Math.PI/2, angleSpeed),
                 lerp(Math.PI/2, Math.PI/2, angleSpeed),
                 lerp(Math.PI/2, 0, angleSpeed), // begin the looping , turn on x axis of 180°
                 lerp(0, -Math.PI/2, angleSpeed),
                 lerp(-Math.PI/2, -Math.PI/2, angleSpeed), // start to turn around the ferris wheel
                 lerp(-Math.PI/2, -Math.PI/2, angleSpeed),
                 lerp(-Math.PI/2, -Math.PI/2, angleSpeed),
                 lerp(-Math.PI/2, Math.PI/2, angleSpeed), // turn around itself (1)
                 lerp(Math.PI/2, Math.PI/2, angleSpeed), // turn around itself (2)
                 lerp(Math.PI/2, Math.PI/2, angleSpeed),
                 lerp(Math.PI/2, Math.PI/2, angleSpeed),
                 lerp(Math.PI/2, Math.PI/2, angleSpeed),
                 lerp(Math.PI/2, Math.PI/2, angleSpeed), // turn right at the ferris wheel (1)
                 lerp(Math.PI/2, Math.PI/2, angleSpeed), // turn right at the ferris wheel (2)
                 lerp(Math.PI/2, Math.PI/2, angleSpeed), // turn towards the skyscraper (1)
                 lerp(Math.PI/2, Math.PI/2, angleSpeed), // turn towards the skyscraper (2)
                 lerp(Math.PI/2, Math.PI/4, angleSpeed),
                 lerp(Math.PI/4, Math.PI/2, angleSpeed),

               ),

               lerp(0, 0, angleSpeed).concat(  // - 9 -
                 lerp(0, Math.PI/2, angleSpeed),
                 lerp(Math.PI/2, 0, angleSpeed),
                 lerp(0, -Math.PI/2, angleSpeed),
                 lerp(-Math.PI/2, -Math.PI/2, angleSpeed),
                 lerp(-Math.PI/2, 0, angleSpeed),
                 lerp(0, 0, angleSpeed), // begin the looping
                 lerp(0, 0, angleSpeed),
                 lerp(0, Math.PI/2, angleSpeed), // start to turn around the ferris wheel
                 lerp(Math.PI/2, Math.PI, angleSpeed), // turn right after the wheel
                 lerp(Math.PI, 1.25*Math.PI, angleSpeed), // turn at the corner with restaurant
                 lerp(1.25*Math.PI, 1.5*Math.PI, angleSpeed), // turn around itself
                 lerp(1.5*Math.PI, Math.PI, angleSpeed), // turn right at the airport
                 lerp(Math.PI, Math.PI, angleSpeed),
                 lerp(Math.PI, 1.5*Math.PI, angleSpeed), // turn right at the stadium
                 lerp(1.5*Math.PI, 1.5*Math.PI, angleSpeed),
                 lerp(1.5*Math.PI, 1.75*Math.PI, angleSpeed), // turn right at the ferris wheel (1)
                 lerp(1.75*Math.PI, 2*Math.PI, angleSpeed), // turn right at the ferris wheel (2)
                 lerp(0, Math.PI/4, angleSpeed), // turn towards the skyscraper (1)
                 lerp(Math.PI/4, Math.PI*0.75, angleSpeed), // turn towards the skyscraper (2)
                 lerp(Math.PI*0.75, Math.PI/2, angleSpeed),
                 lerp(Math.PI/2, 0, angleSpeed),
               ),

               lerp(0, Math.PI/4, angleSpeed).concat(  // - 10 -
                 lerp(Math.PI/4, 0, angleSpeed),
                 lerp(0, -Math.PI/4, angleSpeed),
                 lerp(-Math.PI/4, 0, angleSpeed),
                 lerp(0, 0, angleSpeed),
                 lerp(0, 0, angleSpeed),
                 lerp(0, 0, angleSpeed), // begin the looping
                 lerp(0, Math.PI, angleSpeed),
                 lerp(Math.PI, Math.PI, angleSpeed), // start to turn around the ferris wheel
                 lerp(Math.PI, Math.PI, angleSpeed),
                 lerp(Math.PI, Math.PI, angleSpeed),
                 lerp(Math.PI, Math.PI, angleSpeed),
                 lerp(Math.PI, Math.PI, angleSpeed),
                 lerp(Math.PI, 0, angleSpeed), // turn around itself
                 lerp(0, 0, angleSpeed),
                 lerp(0, 0, angleSpeed),
                 lerp(0, 0, angleSpeed),
                 lerp(0, 0, angleSpeed),
                 lerp(0, 0, angleSpeed), // turn right at the ferris wheel (1)
                 lerp(0, 0, angleSpeed), // turn right at the ferris wheel (2)
                 lerp(0, 0, angleSpeed), // turn towards the skyscraper (1)
                 lerp(0, 0, angleSpeed), // turn towards the skyscraper (2)
               )
             ];


function move_eagle(){

// ------ static movement -------
  //body.position.y = eagle_moves[0][flag_eagle];
  rightWing.rotation.y = eagle_moves[1][flag_eagle];
  leftWing.rotation.y = -eagle_moves[1][flag_eagle];

  rightDownWing.rotation.y = eagle_moves[2][flag_eagle];
  rightDownWing.rotation.x = eagle_moves[3][flag_eagle];

  leftDownWing.rotation.y = -eagle_moves[2][flag_eagle];
  leftDownWing.rotation.x = eagle_moves[3][flag_eagle];

  rightPaw.rotation.x = -eagle_moves[4][flag_eagle];
  leftPaw.rotation.x = -eagle_moves[4][flag_eagle];

  upperBeak.rotation.x = -0.5* eagle_moves[2][flag_eagle];
  lowerBeak.rotation.x = 0.5 * eagle_moves[2][flag_eagle];

  body.position.x = eagle_moves[5][flag_eagle2] - 2;
  body.position.y = eagle_moves[6][flag_eagle2] + 180;
  body.position.z = eagle_moves[7][flag_eagle2] - 115 ;
  // rotation while flying
  body.rotation.x = eagle_moves[8][flag_eagle3];
  body.rotation.z = eagle_moves[9][flag_eagle4];
  body.rotation.y = eagle_moves[10][flag_eagle5];

// -------- dynamic movement ------------
  if(startFly){

  flag_eagle = (flag_eagle >= eagle_moves[0].length) ? 0 : flag_eagle+1;
  flag_eagle2 = (flag_eagle2 >= eagle_moves[6].length) ? 0 : flag_eagle2+1;
  flag_eagle3 = (flag_eagle3 >= eagle_moves[8].length) ? 0 : flag_eagle3+1;
  flag_eagle4 = (flag_eagle4 >= eagle_moves[8].length) ? 0 : flag_eagle4+1;
  flag_eagle5 = (flag_eagle5 >= eagle_moves[8].length) ? 0 : flag_eagle5+1;

  if(flag_eagle5 >= eagle_moves[8].length){startFly = false; }

  }

  // ----------------

}
