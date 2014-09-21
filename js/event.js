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
		
		$currentBanner.transition({scale:0.3}, 1500);
		$currentBanner.stop().animate({left:-490, opacity:0}, 1000);
		
		$nextBanner.css({left:490, transform:'scale(0.3,0.3)'});
		$nextBanner.transition({scale:1.0}, 700);
		$nextBanner.stop().animate({left:0, opacity:1}, 1000);
		
		$('.bg').eq(currentIndex).fadeOut();
		$('.bg').eq(nextIndex).fadeIn();
		
		$('.page_area .current_page').html('0'+ (nextIndex+1) );
		
		$('.page_dot a').removeClass('on');
		$('.page_dot a').eq(nextIndex).addClass('on');
		
		currentIndex = nextIndex;
	}

	// mobile
	if( ua.toLowerCase().indexOf( 'mobile' ) > 0 ){
		window.location = './m_teaser/';
	} else {
		
	}

	//rolling
	init();
	tID = setInterval(setIndex, 3000);
	
	$('.page_dot a').on('click', function(){
		if($('.text_area').is(':animated')){return false;}
		clearInterval(tID);
		
		var clickIndex = $(this).index();
		move(clickIndex);
	});
	
















	
	
});



