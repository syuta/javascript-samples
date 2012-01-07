function myClick(){
    $.mobile.changePage("next.html", "slideup",false,false);	
}

function myScroll(){
    $.mobile.silentScroll(300);	
}

function showActivePage(){
    alert($.mobile.activePage.context.title);			
}