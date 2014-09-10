'use strict';

var app = angular.module('app', [
	'ngAnimate'
]);


app.directive('usps', ['$timeout', function($timeout) {
	return {
		controller: function($scope, $element, $attrs) {
			return {
				killBorders: function(id) {
					this.active = id;

					_.forEach($element.find('.box'), function(box, i) {
						var box = $(box);
						var width = box.width();
						var padding = parseInt(box.css('padding'));

						box.removeClass('fadeOut');

						if(id !== box.data('usp')) {
							box.addClass('fadeOut');
						} else {
							var position = box.position();
							var left = position.left-10;
							var top = position.top;

							box.css({
								position: 'absolute',
								width: width+82
							});

							var translate = 'translate(' + -left + 'px, ' + -top + 'px)';

							$timeout(function() {
								box.css({
									transform: translate,
									zIndex: 200,
									background: '#fff'
								});

								$timeout(function() {
									box.css({
										width: $element.width() - 40,
										height: '100%'
									});

									$timeout(function() {
										var _h3 = $(box.find('h3'));
										_h3.css({
											transform: 'scale(2)'
										});

										$timeout(function() {
											$(box.find('.full')).addClass('show');
										}, 200)
									}, 300);
								}, 300);
							}, 50);
						}
					});	
				},
				close: function() {
					_.forEach($element.find('.box'), function(box, i) {
						var box = $(box);

						if(box.data('usp') === this.active) {
							box.css({
								opacity: '0'
							});

							$(box.find('.full')).removeClass('show');
						}

						$timeout(function() {
							box.css({width: '', height: '', background: '', transform: '', position:'', opacity: ''});
							box.removeClass('fadeOut');	
							$(box.find('h3')).css({transform:''})
						}, 300);
					}.bind(this));

					this.active = false;
				},
				active: false
			};
		},
		link: function(scope, element) {

		}
	}
}]);

app.directive('usp', ['$timeout', function($timeout) {
	return {
		require: '^usps',
		scope: {
			usp: '='
		},
		link: function(scope, element, attrs, ctrl) {
			$timeout(function() {
				$(element).on('click', function() {
					if(!ctrl.active) {
						ctrl.killBorders(scope.usp);
					}
				});
			});
		}
	}
}]);

app.directive('close', ['$timeout', function($timeout) {
	return {
		require: '^usps',
		link: function(scope, element, attrs, ctrl) {
			$timeout(function() {
				element.on('click', function(e) {
					e.stopPropagation();
					ctrl.close();
				});		
			});
		}
	}
}]);