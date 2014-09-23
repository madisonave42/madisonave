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
	console.log(ua);
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
	
















	
	
});



