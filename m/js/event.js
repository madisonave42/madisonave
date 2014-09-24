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
	var contentWidth;

	var ua = navigator.userAgent;
	//console.log(ua);
	//console.log( ua.toLowerCase().indexOf( 'mobile' ) );
	
	
	
	//=================================================================================================
	// function
	
	// background init
	function bgInit(){
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		
		if( (winWidth/winHeight) >= 1.6){
			$('.bg').removeClass('narrow');
			$('.bg').addClass('wide');
			$('.bg img').css({
				position:'relative',
				left:0,
				'margin-left': 0
			});
		} else {
			$('.bg').removeClass('wide');
			$('.bg').addClass('narrow');
			$('.bg img').css({
				position:'relative',
				left:'50%',
				'margin-left': -( $('.bg').eq(currentIndex).find('img').width()/2 )
			});
		}
	}
	
	function contentInit(){
		var winHeight = $(window).height();
		contentWidth = $('.text_crop').width();
		
		$bannerItem.eq(currentIndex).siblings().css({left:contentWidth, opacity:0});
		
		$('.text_area').each(function(i){
			
			var contentHeight = $('.text_area').eq(i).height();
			
			//$('.text_crop, .content_area').css({height:contentHeight});
			//$('.content_area').css({top: ( (winHeight - contentHeight)/2 ) });
			$(this).css({'margin-top' : - ( $(this).height()/2 ) });
			$('.text_area.content_2').css({'margin-top' : 0});
			
		});
		
	}
	
	function init(){
		
		contentWidth = $('.text_crop').width();
		bannerLength = $bannerItem.length;
		
		$bannerItem.css({left:contentWidth, opacity:0});
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
	function moveLeft(nextIndex){
		$currentBanner = $bannerItem.eq(currentIndex);
		$nextBanner = $bannerItem.eq(nextIndex);
		
		$currentBanner.stop().animate({left:-contentWidth, opacity:0}, 1000);
		$nextBanner.css({left:contentWidth});
		$nextBanner.stop().animate({left:0, opacity:1}, 1000);

		$('.bg').eq(currentIndex).fadeOut();
		$('.bg').eq(nextIndex).fadeIn();
		
		$('.page_area .current_page').html('0'+ (nextIndex+1) );
		
		$('.page_dot a').removeClass('on');
		$('.page_dot a').eq(nextIndex).addClass('on');
		
		currentIndex = nextIndex;
	}
	
	function moveRight(nextIndex){
		$currentBanner = $bannerItem.eq(currentIndex);
		$nextBanner = $bannerItem.eq(nextIndex);
		
		$currentBanner.stop().animate({left:contentWidth, opacity:0}, 1000);
		$nextBanner.css({left:-contentWidth});
		$nextBanner.stop().animate({left:0, opacity:1}, 1000);

		$('.bg').eq(currentIndex).fadeOut();
		$('.bg').eq(nextIndex).fadeIn();
		
		$('.page_area .current_page').html('0'+ (nextIndex) );
		
		$('.page_dot a').removeClass('on');
		$('.page_dot a').eq(nextIndex).addClass('on');
		
		currentIndex = nextIndex;
	}
	
	//=============================================================================================================
	// exec & event
	
	$(window).on('load', function(){
		init();	
	});
	
	// window resize
	$(window).on('load resize', function(){
		
		bgInit();
		contentInit();
		
	});
	
	// click dot - page move
	$('.page_dot a').on('click', function(e){
		
		e.preventDefault();
		
		if($('.text_area').is(':animated')){return false;}
		clearInterval(tID);
		
		var clickIndex = $(this).index();
		if( (clickIndex-currentIndex) > 0  ){
			moveLeft(clickIndex);	
		} else {
			moveRight(clickIndex);
		}
		
	});
	
	
	var $swpObjContent = $('.text_area');
	var $swpObjClient = $('.content_frame');
	var $pageDot = $('.page_dot');
	
	var originalLeft = 0;
	var originalTop = 0;
	var originalPosition = 0;
	var oldLeft = 0;
	var oldTop = 0;
	var touchedIndex = 0;
	
	var swpContent = new Swipe( $swpObjContent );
	var swpClient = new Swipe( $swpObjClient );
	
	// touch event - swipe move
	// swipe start 
	$swpObjContent.on('touchstart', function(e){
		
		touchedIndex = $(this).index();
		
		oldLeft = originalLeft = e.originalEvent.touches[0].clientX;
		oldTop = originalTop = e.originalEvent.touches[0].clientY;
		originalPosition = $(this).position().left;
		
		swpContent.swipeStart($swpObjContent, touchedIndex);
		
	});
	// swipe move
	$swpObjContent.on('touchmove', function(e){
		var distanceX = oldLeft - e.originalEvent.touches[0].clientX;
		var distanceY = oldTop - e.originalEvent.touches[0].clientY;
		oldLeft = e.originalEvent.touches[0].clientX;
		oldTop = e.originalEvent.touches[0].clientY;
		var slope = distanceY / distanceX;
		if( Math.abs(slope) < 0.5 ) {
			//e.preventDefault();
			swpContent.swipeMove( $swpObjContent, distanceX );
		} else {
			swpClient.swipeUpDown( $swpObjClient, distanceY );
		}
	});
	
	// swipe end
	$swpObjContent.on('touchend', function(e){
		var diff = originalPosition - $(this).position().left;
		var nextIndex = swpContent.swipeEnd( $swpObjContent, $pageDot, diff );
		
		currentIndex = nextIndex;
	});
	
	// swipe Up & Down end
	$swpObjClient.on('touchend', function(e){
		//oldTop = e.originalEvent.touches[0].clientY;
		//var distanceY = oldTop - e.originalEvent.touches[0].clientY;
		
		swpClient.swipeUpDownEnd( $swpObjClient );
	});
	
	
});



