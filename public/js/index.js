init();

    function init() {
      if ((window.DeviceMotionEvent) || ('listenForDeviceMovement' in window)) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
      } else {
        document.getElementById("dmEvent").innerHTML = "Not supported on your device or browser.  Sorry."
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

      if (maxZ > 15) {
        console.log(acceleration, info);
        document.getElementById("moAccel").innerHTML = info;

        var vibrateInterval;

        // Starts vibration at passed in level
        function startVibrate(duration) {
            navigator.vibrate([200, 100, 200]);
        }

        // Stops vibration
        function stopVibrate() {
            // Clear interval and stop persistent vibrating
            if([200, 100, 200]) clearInterval([200, 100, 200]);
            navigator.vibrate(0);
        }
      }

    }

    function round(val) {
      var amt = 10;
      return Math.round(val * amt) /  amt;
    }