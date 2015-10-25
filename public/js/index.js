init();

function init() {
  if ((window.DeviceMotionEvent) || ('listenForDeviceMovement' in window)) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
  } else {
    document.getElementById("dmEvent").innerHTML = "Not supported on your device or browser.  Sorry.";
  }
}


var maxZ = 0;

function deviceMotionHandler(eventData) {
  var info, xyz = "[X, Y, Z]";

  // Grab the acceleration including gravity from the results
  var acceleration = eventData.acceleration;

  if (maxZ < acceleration.z) {
    maxZ = acceleration.z;
  }

  info = maxZ;

console.log(acceleration.z);
  if (acceleration.z > 15) {
    console.log(acceleration, info);
    document.getElementById("moAccel").innerHTML = info;

    var monkey = true;
    if (monkey) {
      navigator.vibrate([200, 100, 200]);
    }
  }
}