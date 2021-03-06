$(function(){
	
	// loader
	(function(){
		var count = 0;
		//$('.loading_image img').on('load', function(){
		//	$(this).parent('.loading_image').text('loading...');
		//});
		loaderID = setInterval(function(){
			if( count >= 38 ){count = 0;}
			$('.loading_image').css({'background-position': -(count*100) });
			count++;		
		}, 40);
		
		$(window).on('load', function(){
			setTimeout(function(){
				var $loader = $('.loader .loading_image');
				$loader.stop().hide();
				$('.loader').delay(500).fadeOut();
				$('.wrap').delay(500).fadeIn();
				setTimeout(function(){
					$('.loader').remove();
				}, 1000);
			}, 5000);
		});
	})();
	
	// variable
	var $bannerItem = $('.text_area');
	var $currentBanner;
	var $nextBanner;
	var bannerLength;
	var currentIndex = 0;
	var nextIndex;
	var isMoving;
	var bannerHeight = 230;
	var tID;
	var $videoItem = $('.movie');
	var currentVideo = 0;

	var ua = navigator.userAgent;
	
	// function
	function init(){
		bannerLength = $bannerItem.length;
		
		$bannerItem.css({left:980, opacity:0});
		$bannerItem.eq(0).css({left:0, opacity:1});
		
		$('.bg').hide();
		$('.bg').eq(0).show();
	}
	function setIndex(){
		if( currentIndex > bannerLength-2 ){
			move(0);
		}
		else {
			move(currentIndex+1);
		}
	}
	function move(nextIndex){
		
		$currentBanner = $bannerItem.eq(currentIndex);
		$nextBanner = $bannerItem.eq(nextIndex);
		
		if(nextIndex <= 4){
			$currentBanner.stop().animate({
				left:-320, opacity:0,
				width:490, height:260
			}, 1000, function(){ $(this).css({display:'none'}); });
			
			$nextBanner.css({left:980, width:490, height:260, display:'block', opacity:0});
			$nextBanner.stop().animate({
				left:0, opacity:1,
				width:980, height:520
			}, 1000);
			
			
		} else {
			$currentBanner.stop().animate({
				left:-980, opacity:0,
				width:980, height:520
			}, 700, function(){ $(this).css({display:'none'}); });
			
			$nextBanner.css({left:980, top:0, width:980, height:520, display:'block', opacity:0});
			$nextBanner.stop().delay(300).animate({
				left:0, opacity:1,
				width:980, height:520
			}, 1000);
		}
		$('.bg').eq(currentIndex).fadeOut();
		$('.bg').eq(nextIndex).fadeIn();
		
		$('.page_area .current_page').html('0'+ (nextIndex+1) );
		
		$('.page_dot a').removeClass('on');
		$('.page_dot a').eq(nextIndex).addClass('on');
		
		currentIndex = nextIndex;
	}
	
	function videoInit(){
		$videoItem.hide();
		$videoItem.eq(0).show();
	}
	function setVideoIndex(){
		if( currentVideo > 1 ){
			playVideo(0);
		}
		else {
			playVideo(currentVideo+1);
		}
	}
	
	function playVideo(nextVideo){
		$videoItem.eq(currentVideo).fadeOut();
		$videoItem.eq(nextVideo).fadeIn();
		
		currentVideo = nextVideo;
	}
	

	// mobile
	if( ua.toLowerCase().indexOf( 'mobile' ) > 0 ){
		window.location = './m/';
	} else {
		
	}

	//rolling
	init();
	//tID = setInterval(setIndex, 3000);
	
	//video randomize
	videoInit();
	vID = setInterval(setVideoIndex, 10000);
	
	
	$('.page_dot a').on('click', function(e){
		e.preventDefault();
		var clickIndex = $(this).index();
		
		if($('.text_area').is(':animated') || clickIndex == currentIndex){return false;}
		move(clickIndex);
	});
	
















	
	
});



