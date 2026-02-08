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

gsap.set(".intro-text-h", {
    xPercent: -50,
    yPercent: -50
})

circle.onclick = function(){
    cLoop.kill();

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
        xPercent: "-100",
        ease: "expo.inOut",
        duration: 2.5
    })
    tl.to(door2, {
        xPercent: "100",
        ease: "expo.inOut",
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
        duration: 1,
    })
    tl.to(heart, {
        scale: 1,
        duration: 1,
        stroke: "#FFAEC0",
        filter: "drop-shadow(0 0 10px #FFAEC0)",
    })
    tl.to(heart, {
        scale: 0.9,
        duration: 1
    })
    tl.to(heart, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
    })
    tl.set([".circle-c", ".heart-c"], { display: "none" });
    tl.to(".bg", {
        opacity: 1,
        duration: 1,
        ease: "linear"
    });
    tl.to(".intro-text-h", {
        opacity: 1,
        duration: 0.1
    })
    tl.from(".intro-text-h span", {
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        y: "30px",
        stagger: 0.5,
        force3D: true
    })
    tl.to(".scroll-down",{
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.in",
        delay: 1
    })
}
