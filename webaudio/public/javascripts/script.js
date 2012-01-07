$(function(){
	$("#play").click(switchPlay);
	$('#volume').change(changeVolume);
	$('#score').click(function(e) {
		var clicked = $(e.target);
		if(clicked[0].nodeName == "TD") {
			var row = clicked[0].parentElement.rowIndex;
			var cell = clicked[0].cellIndex;
			if(scoreClicked[row][cell] === 0) {

				//同時に音を鳴らすのはできない
				for(var i =0; i < 9 ; i++) {
					if(scoreClicked[i][cell] === 1) {
						return;
					}
				}
				clicked.css('background', 'gray');
				scoreClicked[row][cell] = 1;
			} else {
				clicked.css('background', 'white');
				scoreClicked[row][cell] = 0;
			}
		}
	});
	init();
});

var context;
var bufferLoader;
var currentSource;
var isPlay = false;
var gainNode;
var scoreClicked = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

function init() {
  context = new webkitAudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      '../media/G3/C2.mp3',
      '../media/G3/C3.mp3',//8,添字1 
      '../media/G3/D3.mp3',//7,添字2
      '../media/G3/E3.mp3',//6,添字3
      '../media/G3/F3.mp3',//5,添字4
      '../media/G3/G3.mp3',//4,添字5
      '../media/G3/H3.mp3',//3,添字6
      '../media/G3/I3.mp3',//2,添字7
      '../media/G3/C4.mp3',//1,添字8
      '../media/G3/D4.mp3',
      '../media/G3/E4.mp3',
      '../media/G3/F4.mp3',
      '../media/G3/G4.mp3',
      '../media/G3/H4.mp3',
      '../media/G3/I4.mp3', 
      '../media/G3/C5.mp3'
    ],
    function(){console.log("finish load.");}
    );

  bufferLoader.load();
}


function switchPlay() {
	if(isPlay) {
		stop();
		isPlay = false;
	} else {
		play();
		isPlay = true;
	}
}

function play() {
	console.log("start.");

	var startTime = context.currentTime + 0.100;
	for(var i =0; i < 14; i++) {
		for(var j =0; j < 9 ;j++) {
			console.log("i=" + i + "j=" + j + "=" + scoreClicked[j][i]);
			if(scoreClicked[j][i] === 1) {
				playSound(bufferLoader.bufferList[getSoundIndex(j)],startTime);
				startTime += 2;
			}
		}
	}

//	playSound(bufferLoader.bufferList[3],startTime + 4);
}

function getSoundIndex(scorePoint) {
	switch (scorePoint) {
		case 1:
		  return 8;
		case 2:
		  return 7;
		case 3:
   		  return 6;
		case 4:
		  return 5;
		case 5:
		  return 4;
		case 6:
		  return 3;
		case 7:
		  return 2;
		case 8:
		  return 1;
	}
}


function playSound(buffer, time) {
  gainNode = context.createGainNode();
  currentSource = context.createBufferSource();
  //this.currentSource.playbackRate.value = 2.0;
  currentSource.buffer = buffer;
  //currentSource.loop = true;
  currentSource.connect(this.gainNode);
  gainNode.connect(context.destination);


  currentSource.noteOn(time);
}

function stop() {
  console.log("stop.");
  currentSource.noteOff(0);
}

function changeVolume(element) {
  var volume = $('#volume').val();
  var fraction = parseInt(volume) / 100;
  console.log(fraction * fraction);
  gainNode.gain.value = fraction * fraction;
}