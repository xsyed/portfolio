$(document).ready(function () {



    var images = ["css/images/image2.jpg",
                 "css/images/image3.jpg",
                 "css/images/image4.jpg",
                 "css/images/image5.jpg",
                 "css/images/image6.jpg",
                 "css/images/image1.jpg"];

    function changeImage(selector, images, time) {
        var curImg = 0,
            timer = setInterval(function () {
                if (curImg === images.length)
                    curImg = 0;
                $(selector).css("background-image", 'url(' + images[curImg] + ')');
                curImg++;
            }, time);
    }
    $(window).on("load",function(){
        changeImage(".bg", images, 8000);
    });
    
     $('.email').click(function () {
        window.location.href = "mailto:me@syedsamiuddin.me";
      });

});