/* 모달 요소 */
const modal = document.getElementById("eventModalBox");
const closeModalBtn = document.getElementById("eventClose");

/* 모달창 띄우기 */
function openEvent(){
    modal.style.display = "flex";
}

/*모달창 닫기 */
function closeEvent(){
    modal.style.display = "none";   
}

closeModalBtn.addEventListener("click", function(){
    closeEvent();
});