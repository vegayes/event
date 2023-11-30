function getRandomPosition(container) {

    console.log(Math.random() * (container.offsetWidth-20) + container.offsetLeft+20);

    console.log("offsetWidth :" + container.offsetWidth);
    console.log("offsetHeight :" + container.offsetHeight);


    const x = Math.floor(Math.random() * (container.offsetWidth-100) + container.offsetLeft+70); // 50은 rectangle의 가로 크기
    const y = Math.floor(Math.random() * (container.offsetHeight-120) + container.offsetTop+50); // 50은 rectangle의 세로 크기

    console.log("x:" + x);
    console.log("y:" + y);
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
   
    const rotationSpeed = 110;

    function move() {

        const leftCollision = rectangle.offsetLeft <= container.offsetLeft+30;
        const rightCollision = rectangle.offsetLeft + rectangle.offsetWidth >= container.offsetLeft + container.offsetWidth-30;
        const topCollision = rectangle.offsetTop <= container.offsetTop+20;
        const bottomCollision = rectangle.offsetTop + rectangle.offsetHeight >= container.offsetTop + container.offsetHeight-20;
    
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


//이미지 정보
const quizImgData = [
    [
    {
        variable : "eyes",
        imgUrl : "images/퍼그 눈.jpg"
    },
    {
        variable : "nose",
        imgUrl : "images/퍼그 코.jpg"
    },
    {
        variable : "mouth",
        imgUrl : "images/퍼그 입.jpg"
    },
    {
        variable : "leftEar",
        imgUrl : "images/퍼그 왼쪽 귀.jpg"
    },
    {
        variable : "rightEar",
        imgUrl : "images/퍼그 오른쪽 귀.jpg"
    }
    ],
    [
        {
            variable : "eyes",
            imgUrl : "images/포메 눈.jpg"
        },
        {
            variable : "nose",
            imgUrl : "images/포메 코.jpg"
        },
        {
            variable : "mouth",
            imgUrl : "images/포메 입.jpg"
        },
        {
            variable : "leftEar",
            imgUrl : "images/포메 왼쪽 귀.jpg"
        },
        {
            variable : "rightEar",
            imgUrl : "images/포메 오른쪽 귀.jpg"
        }
        ]

];



document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");

    const firstImageSet = quizImgData[0];

    
    firstImageSet.forEach(data => {
        const rectangle = createRectangle(container, data.variable, data.imgUrl);
        moveRectangle(rectangle, container, 2); // 이미지의 변수를 전달
    });
    
    
    // createRectangle 함수를 통해 rectangle 생성
    //const eyes = createRectangle(container, "eyes", "images/퍼그 눈.jpg");
    //const nose = createRectangle(container, "nose", "images/퍼그 코.jpg");
    //const mouth = createRectangle(container, "mouth", "images/퍼그 입.jpg");
    //const leftEar = createRectangle(container, "leftEar", "images/퍼그 왼쪽 귀.jpg");
    //const rightEar = createRectangle(container, "rightEar", "images/퍼그 오른쪽 귀.jpg");


    //moveRectangle(eyes, container, 2);
    //moveRectangle(nose, container, 2);
    //moveRectangle(mouth, container, 2);
    //moveRectangle(leftEar, container, 2);
    //moveRectangle(rightEar, container, 2);
});


function createRectangle(container, id , imageUrl) {
    const newPosition = getRandomPosition(container);

    const rectangle = document.createElement("div");
    rectangle.classList.add("imgSize");
    rectangle.style.position = "absolute";
    rectangle.style.left = `${newPosition.x}px`;
    rectangle.style.top = `${newPosition.y}px`;

    // id 추가
    rectangle.id = id;

    // 이미지 태그 생성
    const img = document.createElement("img");
    img.classList.add("dogImg");
    img.src = imageUrl; // 이미지 URL 설정
    img.alt = "Image"; // 이미지 대체 텍스트 설정 (필요에 따라 변경 가능)

    // 이미지 태그를 사각형(div) 안에 추가
    rectangle.appendChild(img);

    
    // container에 rectangle 추가
    container.appendChild(rectangle);

    return rectangle;
}

// 정답 이미지 주소
const answerImageUrl = "images/퍼그.jpg";
const quizSubmitBtn = document.querySelector(".quizSubmitBtn");
function displayAnswer() {
    // 기존 이미지 제거
    const dogImgs = document.querySelectorAll(".imgSize");
    for(let i = 0; i<dogImgs.length; i++){
        dogImgs[i].remove();   
    }

    // 새로운 이미지 생성 및 설정
    const container = document.getElementById("container");
    const newDiv = document.createElement("div");
    newDiv.classList.add("correctImg"); // 클래스 추가

    const newImg = document.createElement("img");
    newImg.src = answerImageUrl;

    newDiv.appendChild(newImg); // 이미지를 div에 추가

    container.appendChild(newDiv); // 컨테이너에 새로운 HTML 추가

    
    quizSubmitBtn.remove();   

    const quizSubmit = document.querySelector(".quizSubmit");

    const nextDiv = document.createElement("div");
    nextDiv.classList.add("quizNextBtn"); // 클래스 추가
    nextDiv.id = "nextQuiz";
    nextDiv.innerText = "다음 문제";
    quizSubmit.appendChild(nextDiv);


    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        opacity += 0.2;
        newImg.style.opacity = opacity;

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
        timerElement.fontSize = '11px';
    }
}

// 1초마다 타이머 업데이트
const timerInterval = setInterval(updateTimer, 1000);



quizSubmitBtn.addEventListener("click", function(){
    console.log("정답 제출 누름");
    timerElement.innerText = '정답 공개';
    clearInterval(timerInterval);
    displayAnswer();

})


/* 다음 페이지 이동  숨겨둔 값 나오기
function showNextQuestion(nextQuestionNumber) {
    const currentQuestion = document.getElementById('question' + nextQuestionNumber);
    if (currentQuestion) {
        currentQuestion.style.display = 'block';
    }
    const previousQuestion = document.getElementById('question' + (nextQuestionNumber - 1));
    if (previousQuestion) {
        previousQuestion.style.display = 'none';
    }
}
*/
