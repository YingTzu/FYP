//Developed By
//Ted Lai - www.mynameisted.com
//Nanyang Polytechnic

(function($){
	$.fn.extend({ 
		//custom delay function
		addDelay: function (animationTarget, animationType, animationDelay){
			var setDelay = setTimeout(delayAnimation, animationDelay);
			function delayAnimation(){
				//Add animation class after delay
				animationTarget.addClass(animationType);
			}
		},
		timeOutDelay: function (delayFunction, delayTime){
			var genericDelay = setTimeout(delayFunction, delayTime);
		}, 
		//plugin name - animateThis
		animateThis: function(options) {

			//Settings list and the default values
			var defaults = {
				animationType: "fadeIn", 				//declare type of animation to use
				animationDelay: 0, 						// declare if theres any delay bofore the animation starts
				stayVisible: 1,							//define if u want the target to stay visible after animation
				onComplete:$.noop 						// onComplete Callback, default to empty function
			};
			//setting the received parameters to overwrite default settings if applicable
			var options = $.extend(defaults, options);
			
    		return this.each(function() {
    			//Assign current element to variable
				var obj = $(this);
				//setting options to variable
				var o =options;
				//add default class of animated to the element
    			obj.addClass("animated");
    			//add delay of animation
    			obj.addDelay(obj, o.animationType, o.animationDelay);
				//if chatBubble is defined, do something
    			//Listen for end of animation of character
    			obj.bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
    				//remove the animation type class to prevent duplications
    				obj.removeClass(o.animationType);
    				if (o.stayVisible == 1){
    					obj.css({"opacity":"1","visibility":"visible"});
    				}
	        		// call user provided method
	            	o.onComplete.call();
    			});
    		});
		}
   	});
})(jQuery);