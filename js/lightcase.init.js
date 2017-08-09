;(function ($) {
	$(function () {
		$('a[data-rel^=lightcase]').lightcase();
		$('a[data-rel="lightcase:myCollection:slideshow"]').lightcase({
			showSequenceInfo: false,
			transition: 'scrollHorizontal',
			transitionOpen: 'elastic',
			transitionClose: 'elastic'
		});
		$('a[data-rel="lightcase:myCollection"]').lightcase({showSequenceInfo: false});

		$('#example1').lightcase({transition: 'none'});
		$('#example2').lightcase({transition: 'fade'});
		$('#example3').lightcase({transition: 'elastic'});
		$('#example4').lightcase({transition: 'scrollTop'});
		$('#example5').lightcase({transition: 'scrollLeft'});
		$('#example6').lightcase({transition: 'scrollRight'});
		$('#example7').lightcase({transition: 'scrollBottom'});
		$('a[data-rel="lightcase:scrollHor"]').lightcase({
			showSequenceInfo: false,
			transition: 'scrollHorizontal'
		});

		// Ajax form
		$('#various2').lightcase({
			showSequenceInfo: false,
			type: 'ajax',
			ajax: {
				width: 550
			},
			onFinish: {
				// We need to initialize lightcase for the form which was loaded subsequently via ajax
				// what we are doing with an 'onFinish' hook function like the following one.
				initializeForm: function () {
					lightcase.get('case').find('form[data-rel=lightcase]').on('submit', function (event) {
						event.preventDefault();
						var $this = $(this);
						$this.lightcase('start', {
							type: 'ajax',
							href: $this.attr('action'),
							ajax: {
								width: 550,
								type: $this.attr('method'),
								dataType: 'html',
								data: $this.serialize()
							}
						});
					});
				}
			}
		});

		// Iframe
		$('#various3').lightcase({
			showSequenceInfo: false,
			fixedRatio: false
		});

		// HTML5 video
		$('#various5').lightcase({
			video: {
				width: 800,
				height: 450,
				poster: '',
				preload: 'auto',
				controls: true,
				autobuffer: true,
				autoplay: true,
				loop: false
			}
		});

		// Vimeo
		$('#various10').lightcase({
			showSequenceInfo: false,
			iframe: {
				width: 1280,
				height: 720,
				allowfullscreen: 1
			}
		});

		// Youtube video
		$('#various6').lightcase({
			showSequenceInfo: false,
			iframe: {
				width: 1280,
				height: 720,
				frameborder: 0
			}
		});
		
		// Google map
		var myGoogleMap = null;

		$('#various8').lightcase({
			showSequenceInfo: false,
			inline: {
				width: 800,
				height: 450
			},
			swipe: false,
			onFinish: {
				// Call a new function after lightcase processing has finished
				// to initialize the map canvas, set markers and so on...
				initializeGoogleMap: function () {
					var mapOptions = {
						zoom: 3,
						center: new google.maps.LatLng(46.8333, 8.3333)
					};

					myGoogleMap = new google.maps.Map(
						$('.lightcase-inlineWrap').get(0),
						mapOptions
					);

					google.maps.event.trigger(myGoogleMap, 'resize');
					myGoogleMap.setCenter(myGoogleMap.getCenter());
				},


				// We need to handle the map dimensions like dimensions of
				// an image, so that's why we change data-type manually here!
				changeType: function () {
					lightcase.get('document').attr('data-lc-type', 'image');
				},
				// We just trigger a resize here so that lightcase will
				// recalculate the dimensions automatically
				reCalculateDimensions: function () {
					lightcase.resize();
				}
			},
			onResize: {
				resizeGoogleMap: function () {
					google.maps.event.trigger(myGoogleMap, 'resize');
					myGoogleMap.setCenter(myGoogleMap.getCenter());
				}
			},
			onCleanup: {
				removeListener: function () {
					google.maps.event.removeListener(myGoogleMap);
				}
			}
		});

		// On the fly
		$('#various9').click(function (event) {
			event.preventDefault();

			lightcase.start({
				href: '#',
				maxWidth: 640,
				maxHeight: 400,
				onFinish: {
					injectContent: function () {
						var content = '<div style="text-align: center;"><h4>On the fly!</h4><p>Yes, right! This popup was called without any DOM object and initialization before by using the tag attributes or so. A common use case for using this could be to automatically invoke a popup after few time, or if lightcase not plays the lead but for instance just needs to show a note, accepting or refusing policy etc.<br><br>Important for this is to set <b>href: \'#\'</b> in your options to open a blank box which you can fill with content afterwards by using the <b>onFinish hook</b>.</p></div>';

						// Find the innermost element and feed with content.
						// Can be different according to the media type!
						lightcase.get('contentInner').children().html(content);
						// Do a resize now after filling in the content
						lightcase.resize();
					}
				}
			});
		});

	});
})(jQuery);
