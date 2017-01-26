/*
 * Custom File - jQuery plugin for styling file input _this.elements
 * @author	@marcos0x (marcos0x@gmail.com)
 */

(function(global, $) {
	'use strict';

	function customFile(element, settings) {
		var _this = this;
		_this.element = element;
		_this.settings = settings;

		_this.init = function() {
			_this.settings = $.extend(true, {
				button_content: '<span>+</span>',
				button_class: 'btn btn-default',
				field_text: '',
				field_text_loading: '',
				init: void(0),
				change: void(0)
			}, _this.settings);

			_this.element.css({
				position: 'relative',
				display: 'block',
				cursor: 'pointer',
				opacity: '0'
			});

			var input = $('<input type="text" readonly="readonly" name="'+_this.element.attr('id')+'_input" class="form-upload-input form-control" placeholder="'+_this.settings.field_text+'">');
			input.css({
				position: 'absolute',
				top: 0,
				left: 0,
				display: 'block',
				width: '100%',
				boxShadow: 'none',
				cursor: 'pointer'
			}).focus(function(){
				$(this).blur();
			});

			var button = $('<div>'+_this.settings.button_content+'</div>').addClass(_this.settings.button_class);
			button.css({
				position: 'absolute',
				right: 0,
				top: 0
			});

			_this.customFile = $('<div class="form-upload">');
			_this.customFile.css({ position: 'relative' });

			_this.element.wrap(_this.customFile);
			_this.element.before(input);
			_this.element.before(button);
			_this.element.wrap($('<div class="form-upload-input-original">'));
			_this.element.css({
				width: _this.settings.width ? _this.settings.width : '100%',
				height: _this.settings.height ? _this.settings.height : input.outerHeight()
			});

			_this.customFile.css({ height: _this.element.outerHeight() });

			return true;
		};

		_this.bind = function(){
			if (!_this.init()) {
				return;
			}

			if(typeof _this.settings.init == 'function'){
				_this.settings.init(_this.element);
			}

			_this.element.on('change', function() {
				if(typeof _this.settings.change == 'function'){
					_this.settings.change(_this.element);
				}
				_this.customFile.find('.form-upload-input')
					.val((_this.settings.field_text_loading.length ? _this.settings.field_text_loading+': ' : '') + _this.element.val())
					.attr('data-name', _this.element.val())
					.trigger('change').trigger('file').blur();
			});
		};
	}

	$.fn.extend({
		customFile: function(options) {
	    var settings = options || {};
				
			return this.each(function() {
			  var customFile = new customFile($(this), settings);

	      switch(settings) {
	        default:
	        case 'bind':
	          tooltip.bind();
	        break;
	      }
			});
		}
	});
	
})(window, jQuery);
