
$('div').live('pagebeforeshow',function(event, ui){
  alert('This page was bedfore show');
});

$('div').live('pagebeforehide',function(event, ui){
  alert('This page was before hidden');
});
		
$('div').live('pageshow',function(event, ui){
  alert('This page was just hidden: '+ ui.prevPage[0].id);
});

$('div').live('pagehide',function(event, ui){
  alert('This page was just shown: '+ ui.nextPage[0].id);
});

$('div').live('pagebeforecreate',function(event, ui){
  alert('pagebeforecreate');
});

$('div').live('pagecreate',function(event, ui){
  alert('pagecreate');
});
