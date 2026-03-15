// Carrossel das imagenss

let count = 1;
const totalImages = 5;
const firstImage = document.querySelector('.slide.first');

document.getElementById("radio1").checked = true;

setInterval(()=>{
    nextImage();
}, 5000)

function nextImage(){;  
    count ++
    if(count > totalImages){
        firstImage.style.transition = 'none';
        count = 1;
        document.getElementById("radio1").checked = true;

        firstImage.offsetHeight;

        firstImage.style.transition = `margin-left 1s ease-in-out`;
        return
    }
    document.getElementById("radio" + count).checked = true;
}

// Carrossel das informações 

    const track = document.querySelector('.infos-track');
    const slides = document.querySelectorAll('.info');
    
    const infosPerView = 2;
    let index = 0;

    for(let i = 0; i < infosPerView; i++) {
        track.appendChild(slides[i].cloneNode(true));
    }

    const totalSlides = slides.length;

    function nextSlide() {
        index ++;
        track.style.transition = `transform 0.8s ease-in-out`;
        track.style.transform = `translateX(-${index * 50}%)`
        
        if(index === totalSlides) {
        setTimeout(()=> {
            track.style.transition = 'none';
            index = 0;
            track.style.transform = 'translateX(0)'
        }, 800)
    }
    }

    setInterval(nextSlide, 3000)


