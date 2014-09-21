/**
 * GNB동작
 * @namespace GNB 서브메뉴 오픈 함수
 * 
 */
var gnbAction = (function(){
	
	return{
		/**
		 * 각 동작에 따른 gnb 동작들
		 * 
		 */
		checkSubMenu : function( mainMenus,  crtMenu ) {
			mainMenus.removeClass( 'on' );
			crtMenu.parents( 'li' ).each(function(){
				if( $( this ).parent( '.main_menu' ).length == 1 ) {
					$( this ).addClass( 'on' );
				}
			});
		},
		
		closeSubByMouse : function( mainMenus ) {
			mainMenus.removeClass( 'on' );
		},
		
		closeSubByKeyboard : function( mainMenus ) {
			mainMenus.removeClass( 'on' );
		}
	};
})();