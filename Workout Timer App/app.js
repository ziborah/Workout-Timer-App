const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    const reset = document.getElementById("reset-button");

    //Sounds
    const sounds = document.querySelectorAll(".sound-picker button");

    //Time display
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".timer-buttons");
    //Get the length of the outline
    const outlineLength = outline.getTotalLength();

    //Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function(){
            song.src = this.getAttribute('data-sound');
            play.src='./svg/play.svg'
            video.src = this.getAttribute('data-video');
            play.src = './svg/play.svg'
            
        })
    })
    //Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Select sound
    timeSelect.forEach(Option => {
        Option.addEventListener("click", function() {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    //Create a function to stop and play the sound
    const checkPlaying = song => {
        if(song.paused){
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
        }
        else {
            song.pause();
            video.pause();
            play.src= "./svg/play.svg";
        }
    }

    //Full screen mode
    document.addEventListener('click', function (event) {

        // Ignore clicks that weren't on the toggle button
        if (!event.target.hasAttribute('data-toggle-fullscreen')) return;
    
        // If there's an element in fullscreen, exit
        // Otherwise, enter it
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    
    }, false);
    //End full screen mode

    //Animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed /60);

        //Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src='./svg/play.svg'
        }
    }

    //Reset
    //if(reset != null){
        reset.addEventListener('click', function resetFunction () {
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'                   
        });
    //}
};

app();