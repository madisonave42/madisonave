$(function(){
	
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
		
		$currentBanner.stop().animate({
			left:-320, opacity:0
		}, 1000);
		
		$nextBanner.css({left:660});
		$nextBanner.stop().animate({
			left:0, opacity:1
		}, 1000);

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

	//rolling
	init();
	//tID = setInterval(setIndex, 3000);
	
	//video randomize
	videoInit();
	vID = setInterval(setVideoIndex, 10000);
	
	
	$('.page_dot a').on('click', function(e){
		
		e.preventDefault();
		
		if($('.text_area').is(':animated')){return false;}
		clearInterval(tID);
		
		var clickIndex = $(this).index();
		move(clickIndex);
	});
	
















	
	
});



