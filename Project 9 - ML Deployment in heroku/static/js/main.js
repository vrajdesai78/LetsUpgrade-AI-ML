(function ($) {
	"use strict";


	/*==================================================================
	[ Validate after type ]*/
	$('.validate-input .input100').each(function () {
		$(this).on('blur', function () {
			if (validate(this) == false) {
				showValidate(this);
			} else {
				$(this).parent().addClass('true-validate');
			}
		})
	})


	/*==================================================================
	[ Validate ]*/
	var input = $('.validate-input .input100');

	$('.validate-form').on('submit', function () {
		var check = true;

		for (var i = 0; i < input.length; i++) {
			if (validate(input[i]) == false) {
				showValidate(input[i]);
				check = false;
			}
		}
		if (check == true) {
			var modal = document.getElementById("myModal");

			// Get the button that opens the modal
			var btn = document.getElementById("myBtn");

			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];

			// When the user clicks the button, open the modal 
			btn.onclick = function () {
				modal.style.display = "block";
			}

			// When the user clicks on <span> (x), close the modal
			span.onclick = function () {
				modal.style.display = "none";
			}

			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function (event) {
				if (event.target == modal) {
					modal.style.display = "none";
					return check;
				}
			}
			
		}
		return check;
	});


	$('.validate-form .input100').each(function () {
		$(this).focus(function () {
			hideValidate(this);
			$(this).parent().removeClass('true-validate');
		});
	});

	function validate(input) {
		if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
			if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
				return false;
			}
		} else {
			if ($(input).val().trim() == '') {
				return false;
			}
		}
	}

	function showValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).addClass('alert-validate');

		$(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
		$('.btn-hide-validate').each(function () {
			$(this).on('click', function () {
				hideValidate(this);
			});
		});
	}

	function hideValidate(input) {
		var thisAlert = $(input).parent();
		$(thisAlert).removeClass('alert-validate');
		$(thisAlert).find('.btn-hide-validate').remove();
	}



})(jQuery);
