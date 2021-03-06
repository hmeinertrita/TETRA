// JS alternative for calculating sqrt via CSS calc().
// Once pure CSS trig functions are implemented, this 
// should be uneccessary, meaning all geometry would be
// pure CSS. See `sqrt.css` for more detail.

function handleSqrt() {
    const nodes = document.getElementsByClassName('sqrt')
    for (var i = 0; i < nodes.length; i++) {
        var x = window.getComputedStyle(nodes[i]).getPropertyValue('--sqrt-x')
        x = x.replaceAll('calc', '')
        x = math.evaluate(x)
        nodes[i].style.setProperty('--sqrt', Math.sqrt(x))
    }
}


// Variables for processing audio via Audio API
var audioElement
var contextClass
var audioContext
var source
var audioBuffer
var analyzer
var player
var playing = false
const frequencyData = new Uint8Array(1024)

// Variables for cleaning audio data
var means = [[], [], [], []]
var multipliers = [1, 1, 1, 1]
const smoothingSpeed = 0.08

// Main animation loop
function update() {
    window.requestAnimationFrame(update)

    if (playing) {
        analyser.getByteFrequencyData(frequencyData)
    }

    for (var i = 0; i < 4; i++) {

        var multiplier

        //Clean audio data
        if (playing && !player.paused) {
            const range = 128
            const gap = 0

            var avg = 0
            for (var j = 0; j < range; j++) {
                avg += frequencyData[(i * range) + gap + j]
            }


            avg = avg / range
            const mean = means[i].reduce((s, v) => s + v, 0) / means[i].length
            multiplier = Math.max(Math.min(Math.pow(avg / mean, 3), 2.5), 0)

            means[i].push(avg)
            if (means[i].length > 10) {
                means[i].shift()
            }
        }
        else {
            multiplier = 1
        }

        multipliers[i] += (multipliers[i] < multiplier ? 1 : -1) * (Math.abs(multipliers[i] - multiplier) < smoothingSpeed ? 0 : smoothingSpeed);
        multipliers[i] = Math.max(multipliers[i] == NaN ? 1 : multipliers[i], 0)

        // Pass cleaned audio data to CSS as a simple multiplier
        const visualizer = document.getElementById('visualizer')
        visualizer.style.setProperty('--v' + (i + 1) + '-mult', multipliers[i])
        // Calculate CSS sqrts
        handleSqrt()
    }
}

window.onload = () => {
    // Calculate CSS sqrts
    handleSqrt()

    contextClass = (window.AudioContext || window.webkitAudioContext)
    player = document.getElementById('default-music')
    const playButton = document.getElementById('play-button')
    const buttonText = document.getElementById('button-text')

    //Replaces default music with uploaded music
    document.getElementById('file-input').onchange = e => {
        audioElement = new Audio()
        audioElement.src = URL.createObjectURL(e.target.files[0])
        buttonText.textContent = 'PLAY'
        playButton.classList.remove('paused')
        player.pause()
        player = audioElement
        playing = false
    }
    

    playButton.onclick = () => {
        //If music has started and has bee
        if (player.paused && playing) {
            player.play()
            buttonText.textContent = 'PAUSE'
            playButton.classList.add('paused')
        }
        else if (playing) {
            player.pause()
            buttonText.textContent = 'PLAY'
            playButton.classList.remove('paused')
        }
        else {
            audioContext = new contextClass()
            source = audioContext.createMediaElementSource(player)
            //passing in file
            //source.buffer = audioBuffer
            analyser = audioContext.createAnalyser()
            //creating source node
            //connect to source
            source.connect(analyser)
            //pipe to speakers
            analyser.connect(audioContext.destination)

            buttonText.textContent = 'PAUSE'
            playButton.classList.add('paused')

            //start playing
            player.play()
            playing = true
            player.onended = () => { 
                buttonText.textContent = 'PLAY'
                playButton.classList.remove('paused')
                console.log('ended')
                player.currentTime = 0;
            }

            means = [[], [], [], []]
            multipliers = [1, 1, 1, 1]

            update()
        }

        
    }
}
