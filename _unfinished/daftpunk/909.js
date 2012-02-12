

// daft punk
var matrix = [
	[1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
	[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
	[0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
	[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
	
	[1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
	[1,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,0,0],
	[0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
	[0,0,0,1, 0,0,0,0, 0,0,1,0, 0,0,0,0]
];

var bpm = 120;	// speed

var total_steps = matrix[0].length;
var current_step = 0;
var is_playing = true;




var audio_path = [
    [ 	"dp_1workit.wav", "dp_2makeit.wav", "dp_3doit.wav", "dp_4makesus.wav", 
    	"b_bass.wav", "b_clap.wav", "b_hh.wav", "b_snare.wav"
     ]
];

var audio_objects = [
    [ ],
    [ ],
    [ ]
];




// on page load

$(document).ready(function() {

	//create matrix
	$.each(matrix, function($i) {
    	
    	//create row
    	var row = $("<div>");
    	row.attr({className: "row"});
    	$('#matrix').append(row);
    	
    	
		$.each(matrix[$i], function($j) {
	    	
			//create item
	    	var input = $("<span>");
	    	input.attr({ id: 'r'+$i+'c'+$j });
	    	
	 		
	 		input.click(function() {
				//matrix[$i][this.value] = this.checked;
				
				if( matrix[$i][$j] ) {
					matrix[$i][$j] = 0;
					$(this).css("background-position", "0px");
				} else {
					matrix[$i][$j] = 1;
					$(this).css("background-position", "-25px");
				}
				
			});
	 		
	    
	    	//add checked
	    	if(matrix[$i][$j]) {
	    		input.css("background-position", "-25px");
	    	}
	    	$(row).append(input);
	    	    	
	    	
		});
    	
	});
	
	
	//add audio
	$.each(audio_path[0], function($i) {
		var audio = $("<audio>");
        audio.attr({ id:"audio"+$i, src: "audio/"+this });
        $("body").append(audio);
        audio_objects[0][$i] = audio;
	});
	
	
	// play audio
	var playAudio = function(args) {
		try {
            var a = document.getElementsByTagName("audio")[args.col];  
			a.currentTime = 0;
			a.play();
            
        } catch(e) {
            $("#debug").html(e);
        } 
    };
	
	
	// tick
	var tick = function() {
		
		$("#debug").html(current_step+1);
		
		$('.row').each( function($i) {
			
			var bird = $( '#r'+$i+'c'+current_step );
						
			if(matrix[$i][current_step]) {
				playAudio( {row:0, col:$i} );
												
				bird.css("background-position", "-50px").delay(120).queue(function () {
					$(this).css("background-position", "-25px");
					$(this).dequeue();
				});				
				
			} else {
				//bird.css({opacity: 0.8}).animate({opacity: 1.0}, 100);
			}
			
		});
 		
 	 		
    };
    
    
    
	
	
	
	//init
	$(function() {
		
		
		// start/stop
		$('#switch').click(function() {
			if(is_playing) {
				is_playing = false;
				$('#switch').html("Play");
			} else {
				is_playing = true;
				$('#switch').html("Stop");
			}
		});
		
		
		
		
		var interval = 60 * 1000 / bpm / 4;
	    
	    var timer;
	    var timer = setInterval(function() {
	        
	        if(is_playing) {
	        
		        tick();
		
		        current_step++;
		        if (current_step >= total_steps) {
		            current_step = 0;
		        }
	        }
	    }, interval);
	
	});
	
	
	

});




