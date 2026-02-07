const door1 = document.getElementById("d1");
const door2 = document.getElementById("d2");
const heart = document.querySelector(".heart");
const loaderIntro = document.querySelector(".loader-intro");

const hLoop = gsap.from(heart, {
    opacity: 0.5,
    scale: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "none",
    duration: 2,
})

heart.onclick = function(){
    hLoop.pause();

    const speed = 0.8/2;
    const currentS = gsap.getProperty(heart, "scale");
    const targetS = 0.8;
    const difference = Math.abs(targetS - currentS);
    const dynamicTime = difference/speed;

    const tl = gsap.timeline();

    tl.to(heart, {
        duration: dynamicTime,
        scale: 0.8,
        ease: "none"
    })
    tl.to(door1, {
        x: "-50vw",
        ease: "power2.in",
        duration: 2.5
    })
    tl.to(door2, {
        x: "50vw",
        ease: "power2.in",
        duration: 2.5
    }, "<")
    tl.to(heart, {
        scale: 0.7,
        duration: 0.3,
        ease: "power2.inOut"
    })
    tl.to(loaderIntro, {
        strokeDashoffset: 0, 
        duration: 3,
        ease: "none"
    })
    tl.to(heart, {
        scale: 2,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    })
    tl.to(loaderIntro, {
        scale: 2,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    }, "<")
}