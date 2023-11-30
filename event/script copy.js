function getRandomPosition(container) {

    console.log(Math.random() * (container.offsetWidth-20) + container.offsetLeft+20);


    const x = Math.floor(Math.random() * (container.offsetWidth-40) + container.offsetLeft+10); // 50은 rectangle의 가로 크기
    const y = Math.floor(Math.random() * (container.offsetHeight-40) + container.offsetTop+10); // 50은 rectangle의 세로 크기
    return { x, y };
}

function getRandomAngle() {
    return Math.random() * 360; // 0에서 360 사이의 랜덤한 각도
}


function rotateRectangle(rectangle, rotationSpeed) {
    let rotation = 0;

    function rotate() {
        rotation += rotationSpeed / 60; // 60 프레임 기준으로 계산 (1초에 60프레임)
        rectangle.style.transform = `rotate(${rotation}deg)`;

        requestAnimationFrame(rotate);
    }

    rotate();
}





function moveRectangle(rectangle, container, speed) {
    const newPosition = getRandomPosition(container);
    let angle = getRandomAngle();
    let radians = angle * (Math.PI / 180); // 각도를 라디안으로 변환
    let dx = Math.cos(radians) * speed; // x 방향으로의 속도
    let dy = Math.sin(radians) * speed; // y 방향으로의 속도
   
    const rotationSpeed = 90;

    function move() {

        const leftCollision = rectangle.offsetLeft <= container.offsetLeft;
        const rightCollision = rectangle.offsetLeft + rectangle.offsetWidth >= container.offsetLeft + container.offsetWidth;
        const topCollision = rectangle.offsetTop <= container.offsetTop;
        const bottomCollision = rectangle.offsetTop + rectangle.offsetHeight >= container.offsetTop + container.offsetHeight;
    
        if ( leftCollision || rightCollision) {

            let normal = { x: -1, y: 0 };
            let incident = { x: dx, y: dy }; // 진행 방향으로의 벡터
                            // 10 20 
            let reflection = reflect(incident, normal); //두 값을 이용해서 진행방향(반사각) 정하기 
            dx = reflection.x; 
            dy = reflection.y;

        }
        if (topCollision || bottomCollision){
           
            let normal = { x: 0, y: -1 };
            let incident = { x: dx, y: dy }; // 진행 방향으로의 벡터
            let reflection = reflect(incident, normal); //두 값을 이용해서 진행방향(반사각) 정하기 

            dx = reflection.x;
            dy = reflection.y;

            
        }

        rectangle.style.left = `${rectangle.offsetLeft + dx}px`;
        rectangle.style.top = `${rectangle.offsetTop + dy}px`;

        requestAnimationFrame(move);
    }

    move();
    rotateRectangle(rectangle, rotationSpeed);
}

function reflect(incident, normal) {

    if (normal === null) {
        // 충돌 없으면 진행방향으로 계속 진행
        return incident;
    }
    const dotProduct = incident.x * normal.x + incident.y * normal.y;
                        // -10 
    const reflection = {
        x: incident.x - 2 * dotProduct * normal.x,
            // -1-2 * (-10) *(-1)
        y: incident.y - 2 * dotProduct * normal.y,
    };

    return reflection;
}

/*
function getNormal(rectangle, container) {
   
    const leftCollision = rectangle.offsetLeft < container.offsetLeft ;
    const rightCollision = rectangle.offsetLeft + rectangle.offsetWidth > container.offsetLeft + container.offsetWidth;
    const topCollision = rectangle.offsetTop < container.offsetTop;
    const bottomCollision = rectangle.offsetTop + rectangle.offsetHeight > container.offsetTop + container.offsetHeight;

    if (leftCollision || rightCollision) {
        return { x: -1, y: 0 };
    } else if (topCollision || bottomCollision) {
        return { x: 0, y: -1 };
    }

    // No collision, return null
    return null;
}
*/



document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    
    // createRectangle 함수를 통해 rectangle 생성
    const rectangle1 = createRectangle(container, "rectangle1");
    const rectangle2 = createRectangle(container, "rectangle2");
    const rectangle3 = createRectangle(container, "rectangle3");

    moveRectangle(rectangle1, container, 2);
    moveRectangle(rectangle2, container, 2);
    moveRectangle(rectangle3, container, 2);
});

/*
function createRectangle(container, id) {
    const newPosition = getRandomPosition(container);

    const rectangle = document.createElement("div");
    rectangle.classList.add("rectangle");
    rectangle.style.position = "absolute";
    rectangle.style.left = `${newPosition.x}px`;
    rectangle.style.top = `${newPosition.y}px`;


    // const dogImage = document.createElement("img");
    // dogImage.src = "images/20231127102531_11848.jfif";
    // dogImage.classList.add("dogImg"); // 클래스 추가

    // id 추가
    rectangle.id = id;

    // container에 rectangle 추가
    container.appendChild(rectangle);

    return rectangle;
}
*/
function createRectangle(container, id) {
    const newPosition = getRandomPosition(container);

    const rectangle = document.createElement("div");
    rectangle.classList.add("rectangle");
    rectangle.style.position = "absolute";
    rectangle.style.left = `${newPosition.x}px`;
    rectangle.style.top = `${newPosition.y}px`;

    // id 추가
    rectangle.id = id;

    // 이미지 태그 생성
    const img = document.createElement("img");
    img.classList.add("dogImg");
    img.src = "images/20231127102531_11848.jfif"; // 이미지 URL 설정
    img.alt = "Image"; // 이미지 대체 텍스트 설정 (필요에 따라 변경 가능)

    // 이미지 태그를 사각형(div) 안에 추가
    rectangle.appendChild(img);

    
    // container에 rectangle 추가
    container.appendChild(rectangle);

    return rectangle;
}

function displayAnswer() {
    // 기존 이미지 제거
    document.getElementById("rectangle1").remove();
    document.getElementById("rectangle2").remove();
    document.getElementById("rectangle3").remove();

    // 새로운 이미지 생성 및 설정
    const container = document.getElementById("container");
    const newDiv = document.createElement("div");
    newDiv.classList.add("correctImg"); // 클래스 추가

    const newImg = document.createElement("img");
    newImg.src = "1.jpg";

    newDiv.appendChild(newImg); // 이미지를 div에 추가

    container.appendChild(newDiv); // 컨테이너에 새로운 HTML 추가

    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        opacity += 0.1;
        answerImage.style.opacity = opacity;

        if (opacity >= 1) {
            // 나타나기 완료되면 인터벌 종료
            clearInterval(fadeInInterval);
        }
    }, 100);


}



// 10초 타이머
const timerElement = document.getElementById('timer');
let timeLeft = 9;

function updateTimer() {
    timerElement.innerText = `${timeLeft}`;
    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timerInterval);
        displayAnswer();
        timerElement.innerText = '시간 종료';
    }
}

// 1초마다 타이머 업데이트
const timerInterval = setInterval(updateTimer, 1000);
