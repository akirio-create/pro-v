const door1 = document.getElementById("d1");
const door2 = document.getElementById("d2");
const circle = document.querySelector(".circle");
const heart = document.querySelector(".heart");

const cLoop = gsap.from(circle, {
    opacity: 0.5,
    scale: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "none",
    duration: 2,
})

circle.onclick = function(){
    cLoop.pause();

    const speed = 0.8/2;
    const currentS = gsap.getProperty(circle, "scale");
    const targetS = 0.8;
    const difference = Math.abs(targetS - currentS);
    const dynamicTime = difference/speed;

    const tl = gsap.timeline();

    tl.to(circle, {
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
    tl.to(circle, {
        scale: 0,
        opacity: 0,
        duration: 2.5,
        ease: "power2.out"
    })
    tl.to(heart, {
        strokeDashoffset: 0,
        duration: 1.5
    }, "-=0.5")
    tl.to(heart, {
        fillOpacity: 1,
        duration: 2,
        
    })
    tl.to(heart, {
        scale: 0.9,
        duration: 1
    })
    tl.to(heart, {
        scale: 1,
        duration: 1,
        stroke: "#FFAEC0",
        filter: "drop-shadow(0 0 10px #FFAEC0)"
    })
    tl.to(heart, {
        scale: 0.9,
        duration: 1
    })
    tl.to(heart, {
        scale: 2,
        opacity: 0,
        duration: 0.5
    })
    tl.to(document.body, {
        backgroundColor: "#800F2F",
        duration: 0.8,
        ease: "power2.inOut"
    }, "<");
}
