/*const swiper = new Swiper('.mySwiper', {
    slidesPerView: 2,　　　　　　　　　　//column count of shown slide
    spaceBetween: 10,　　　　　　　　　　//gap of slides
    grid: {                            //row count of shown slide
      rows: 2,
    },          
    pagination: {                       //pagination(dots)
        el: '.swiper-pagination',
    },
    navigation: {                       //navigation(arrows)
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
})

*/

const mySwiper = new Swiper('.mySwiper', {
    slidesPerView: 2, // 가로갯수
    slidesPerColumn: 3,  // 세로갯수
    grid: {                            //row count of shown slide
        rows: 3,
      },  
    slidesPerGroup :2,
    spaceBetween: 30,

    slidePercolumnFill : 'row',
    direction :'horizontal',

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    navigation: {                       //navigation(arrows)
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {},
      orientationchange: function(){},
      beforeResize: function(){
        let vw = window.innerWidth;
        if(vw > 1000){
          mySwiper.params.slidesPerView = 2
            mySwiper.params.slidesPerColumn = 3
            mySwiper.params.slidesPerGroup = 2;
        } else {
          mySwiper.params.slidesPerView = 1
            mySwiper.params.slidesPerColumn = 3
            mySwiper.params.slidesPerGroup =1;
        }
        mySwiper.init();
      },
    },
});
