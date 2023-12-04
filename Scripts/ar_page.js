document.addEventListener('DOMContentLoaded', function () {
  AFRAME.registerComponent("ar-controller", {
    init: function () {
        // Disable A-Frame's default loading screen
        this.el.sceneEl.setAttribute('loading-screen', 'enabled', false);
        // Get references to the necessary DOM elements
        const target = document.getElementById("target");
        const Target2 = document.getElementById("Target2");
        const Target3 = document.getElementById("Target3");
        const Target4 = document.getElementById("Target4");
        const Target5 = document.getElementById("Target5");
        const video = document.getElementById("video");
        const video2 = document.getElementById("video2");
        const video3 = document.getElementById("video3");
        const video4 = document.getElementById("video4");
        const video5 = document.getElementById("video5");
        const audioButton = document.getElementById("audioButton");
        const audioPrompt = document.getElementById("audioPrompt");
        const audioPromptIcon = document.getElementById("audioPromptIcon");
        const plane = document.getElementById("videooverlay");
        const plane2 = document.getElementById("videooverlay2");
        const plane3 = document.getElementById("videooverlay3");
        const plane4 = document.getElementById("videooverlay4");
        const plane5 = document.getElementById("videooverlay5");
        const startText = document.getElementById("startText");
        
        const backgroundImage = document.getElementById("background");
        const backButton = document.getElementById("backButton");

        // Initialize variables
        var played = false;
        var played2 = false;
        var userInteracted = false;
        var isMuted = true;

        // Function to check if the device is iOS
        function isIOS() {
            return [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
            ].includes(navigator.platform)
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
        }

        // Event listener for audio prompt button click
        // audioPrompt.addEventListener("click", () => {
        //     // audio.play();
        //     audioPrompt.style.display = "none";
        //     userInteracted = true;
        // });
      
        audioButton.addEventListener("click", () => {
            isMuted = !isMuted;  // Toggle mute status
            let wasVideoPlaying = !video.paused;
            let wasVideo2Playing = !video2.paused;
            let wasVideo3Playing = !video3.paused;
            let wasVideo4Playing = !video4.paused;
            let wasVideo5Playing = !video5.paused;

            video.muted = isMuted;
            video2.muted = isMuted;
            video3.muted = isMuted; 
            video4.muted = isMuted;
            video5.muted = isMuted;

            if (wasVideoPlaying) video.play();
            if (wasVideo2Playing) video2.play();
            if (wasVideoPlaying) video3.play();
            if (wasVideoPlaying) video4.play();
            if (wasVideoPlaying) video5.play();

            if (isMuted) {
                audioButton.innerHTML = '<img id="audioPromptIcon" src="./Assets/mute-icon.svg" alt="Audio Icon"> Enable Audio';
            } else {
                audioButton.innerHTML = '<img id="audioPromptIcon" src="./Assets/unmute-icon.svg" alt="Audio Icon"> Disable Audio';
            }
        });


        // Event listener for first target found event
        target.addEventListener("targetFound", () => {
            console.log("target 1 found");
            this.found = true;
            audioPrompt.style.display = "block";
            if (!played) {
                startText.style.display = "none";
                // backgroundImage.style.display = "none";
                plane.emit("fadein");
                video.play();
                video.addEventListener("ended", function videoend(e) {
                    played = true;
                }, false);
                plane.object3D.position.copy(plane.object3D.position);

            }
        });

        // Event listener for target lost event
        target.addEventListener("targetLost", () => {
            console.log("target 1 lost");
            audioPrompt.style.display = "block";
            this.found = false;
            if (!played) {
                video.pause();
                // audio.pause();
                startText.style.display = "block";
                // backgroundImage.style.display = "block";
            }
        });
    
        // Event listener for second target found event
        Target2.addEventListener("targetFound", () => {
            console.log("target 2 found");
            audioPrompt.style.display = "block";
            this.found2 = true;
            if (!played) {
                startText.style.display = "none";
                // backgroundImage.style.display = "none";
                plane2.emit("fadein");
                video2.play();
                video2.addEventListener("ended", function videoend(e) {
                    played2 = true;
                }, false);
                plane.object3D.position.copy(plane.object3D.position);
            }
        });

        // Event listener for second target lost event
        Target2.addEventListener("targetLost", () => {
            console.log("target 2 lost");
            audioPrompt.style.display = "block";
            this.found2 = false;
            if (!played) {
                video2.pause();
                startText.style.display = "block";
                // backgroundImage.style.display = "block";
            }
        });

        // Event listener for thrid target found event
        Target3.addEventListener("targetFound", () => {
            console.log("target 3 found");
            audioPrompt.style.display = "block";
            this.found2 = true;
            if (!played) {
                startText.style.display = "none";
                // backgroundImage.style.display = "none";
                plane3.emit("fadein");
                video3.play();
                video3.addEventListener("ended", function videoend(e) {
                    played3 = true;
                }, false);
                plane.object3D.position.copy(plane.object3D.position);
            }
        });

        // Event listener for second target lost event
        Target3.addEventListener("targetLost", () => {
            console.log("target 3 lost");
            audioPrompt.style.display = "block";
            this.found2 = false;
            if (!played) {
                video3.pause();
                startText.style.display = "block";
                // backgroundImage.style.display = "block";
            }
        });

      
      
        // Event listener for arframe event
        this.el.addEventListener("arframe", () => {
            if (!this.found && !this.found2 && played) {
                plane.object3D.position.copy(plane.object3D.position);
            }
        });
      
        // Event listener for back button click
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Delay the display of start text and background image
        setTimeout(function() {
            startText.style.display = "block";
            backgroundImage.style.display = "block";
        }, 3000);  // Delay of 3000ms (3 seconds)

        window.addEventListener("orientationchange", () => {
          // Reload the page
            location.reload();
        });
        // let scene = document.querySelector("a-scene");
        // scene.addEventListener("loaded", function () {
        //   console.log("Scene loaded");
        //   let customLoadingScreen = document.getElementById("customLoadingScreen");
        //   let defaultLoadingScreen = document.getElementById("loading-screen");
        //   console.log("Before hiding: ", customLoadingScreen, defaultLoadingScreen);
        //   customLoadingScreen.style.display = 'none';
        //   defaultLoadingScreen.style.display = "none";
        //   console.log("After hiding: ", customLoadingScreen, defaultLoadingScreen);
        // });

    },
  });
});
