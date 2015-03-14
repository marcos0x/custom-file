/*
 * Custom File - jQuery plugin for styling file input elements
 * @author	@marcos0x (marcos0x@gmail.com)
 */

(function(global, $) {
	
	$.fn.customFile = function(params) {
			
		var defaults = {
			button_content: 'Seleccione',
			button_class: 'btn btn-default',
			button_tag: 'span',
			field_text: '',
			field_text_loading: '',
			init: void(0),
			change: void(0)
		};

		var settings = $.extend(true, defaults, params);
				
		return this.each(function() {
			
			var element = $(this);

			var wrapper = $("<div class='form-upload'>").css({
				'position': 'relative',
				'height': element.outerHeight()
			});

			element.parents('.form-upload').css({
				'position': 'relative'
			});
							
			var input = $('<input type="text" readonly="readonly" name="'+element.attr('id')+'_input" class="form-upload-input form-control" placeholder="'+settings.field_text+'">').css({
				'display': 'inline',
				'position': 'absolute',
				'top':0,
				'left':0,
				'box-shadow': 'none',
				'cursor': 'pointer'
			}).focus(function(){
				$(this).blur();
			});

			var button = $('<'+settings.button_tag+' class="'+settings.button_class+'">'+settings.button_content+'</'+settings.button_tag+'>').css({
				'position':'absolute',
				'right':0,
				'top':1
			});

			element.wrap(wrapper);
			element.before(input);
			element.before(button);
			element.wrap($('<div class="form-upload-input">'));
			element.css({
				'position': 'relative',
				'height': settings.imageheight + 'px',
				'width': settings.width + 'px',
				'display': 'inline',
				'cursor': 'pointer',
				'opacity': '0.0'
			});

			if(typeof settings.init == 'function'){
				settings.init(element);
			}

			element.bind('change', function() {
				if(typeof settings.change == 'function'){
					settings.change(element);
				}
				input.val((settings.field_text_loading.length ? settings.field_text_loading+': ' : '')+element.val()).attr('data-name', element.val());
			});
	  
		});

	};
	
})(window, jQuery);
