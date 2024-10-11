$(function() {
    const themeToggle = $("#theme-toggle");
    themeToggle.click(function() {
        const body = $("body");
        body.toggleClass("dark-mode");
        const isDarkMode = body.hasClass("dark-mode");
        $(this).text(isDarkMode ? "Modo Nocturno: On" : "Modo Nocturno: Off");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });

    if(localStorage.getItem("theme") === "dark") {
        $("body").addClass("dark-mode");
        themeToggle.text("Modo Nocturno: On");
    }
});

