$(function(){//  $(document).ready(functon{});と同じ

      $("#content_p").hover(
	  function () {
	      $(this).append($("<span> ***</span>"));
	  },
	  function () {
	      $(this).find("span:last").remove();
	  }
      );

  }
 );