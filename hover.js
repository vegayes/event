const hover = document.getElementById("hover");

hover.addEventListener("mouseenter", function(){
    const none = document.querySelector(".none");
    none.style.display = "flex";
});

hover.addEventListener("mouseout", function(){
    const none = document.querySelector(".none");
    none.style.display = "none";
});