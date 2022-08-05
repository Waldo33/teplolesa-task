$(document).ready(function() {
    $(".header__menu-list-item").hover(function() {
        var dropdownMenu = 
            $(this).children(".dropdown-menu");
            dropdownMenu.toggleClass("show");
            dropdownMenu.parent().toggleClass("show");
    });
});