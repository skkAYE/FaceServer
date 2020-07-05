
(function ($) {

    "use strict";

    var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('#menuCollapse').on('click', function () {
        $('#navbarSupportedContent').toggleClass('show');
    });
})(jQuery);

/* 
 *
 * ci dessous rajouté pour le tableau
 *
 *
 
$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})
*/
$(document).on('show.bs.modal', '#suppressionModal', function (event) {
    var button = $(event.relatedTarget)
    var recipient = button.data('name')
    var modal = $(this)
    modal.find('.modal-body #name').text(recipient)
});


window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('img');  // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
		  img.classList.remove("empty")
          img.onload = imageIsLoaded;
      }
  });
});


function imageIsLoaded() { 
  
}



