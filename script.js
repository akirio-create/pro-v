gsap.registerPlugin(ScrollTrigger);

// Prevent scrolling initially
document.body.classList.add('no-scroll');

// DOM Elements
const door1 = document.getElementById("d1");
const door2 = document.getElementById("d2");
const circle = document.querySelector(".circle");
const circleContainer = document.querySelector(".circle-c");
const heart = document.querySelector(".heart");
const gallerySection = document.querySelector(".gallery-section");
const rose = document.getElementById("rose");
const allPics = document.querySelectorAll(".pics");

// Circle pulsing animation
const cLoop = gsap.from(circle, {
    opacity: 0.5,
    scale: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "none",
    duration: 2,
});

// Set initial position for intro text
gsap.set(".intro-text-h", {
    xPercent: -50,
    yPercent: -50
});

// Door opening animation on circle click
circleContainer.onclick = function() {
    cLoop.kill();

    const speed = 0.8 / 2;
    const currentS = gsap.getProperty(circle, "scale");
    const targetS = 0.8;
    const difference = Math.abs(targetS - currentS);
    const dynamicTime = difference / speed;

    const tl = gsap.timeline();

    tl.to(circle, {
        duration: dynamicTime,
        scale: 0.8,
        ease: "none"
    });
    
    tl.to(door1, {
        xPercent: -100,
        ease: "expo.inOut",
        duration: 2.5
    });
    
    tl.to(door2, {
        xPercent: 100,
        ease: "expo.inOut",
        duration: 2.5
    }, "<");
    
    tl.set(["#d1", "#d2"], {
        display: "none",
    });
    
    tl.to(circle, {
        scale: 0,
        opacity: 0,
        duration: 2.5,
        ease: "power2.out"
    });
    
    tl.to(heart, {
        strokeDashoffset: 0,
        duration: 1.5
    }, "-=0.5");
    
    tl.to(heart, {
        fillOpacity: 1,
        duration: 2,
    });
    
    tl.to(heart, {
        scale: 0.9,
        duration: 1,
    });
    
    tl.to(heart, {
        scale: 1,
        duration: 1,
        stroke: "#FFAEC0",
        filter: "drop-shadow(0 0 10px #FFAEC0)",
    });
    
    tl.to(heart, {
        scale: 0.9,
        duration: 1
    });
    
    tl.to(heart, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
    });
    
    tl.set([".circle-c", ".heart-c"], { display: "none" });
    
    tl.to(".bg", {
        opacity: 1,
        duration: 1,
        ease: "linear"
    });
    
    tl.to(".intro-text-h", {
        opacity: 1,
        duration: 0.1
    });
    
    tl.from(".intro-text-h span", {
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        y: "30px",
        stagger: 0.5,
        force3D: true
    });
    
    tl.to(".scroll-down", {
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.in",
        delay: 1,
    });
    
    tl.set(".gallery-section", { display: "flex" });
    
    // Enable scrolling after animation completes
    tl.call(() => {
        document.body.classList.remove('no-scroll');
    });
    
    // Initialize gallery scroll animation AFTER gallery is displayed
    tl.call(() => {
        initGalleryAnimation();
    });
};

// Function to initialize gallery animation
function initGalleryAnimation() {
    // Split text into characters for animation
    const caption = document.querySelector('.caption');
    const subCap = document.querySelector('.sub-cap');
    const chars1 = caption.textContent.split("");
    const chars2 = subCap.textContent.split("");

    caption.innerHTML = chars1.map(char => `<span class="char1">${char}</span>`).join("");
    subCap.innerHTML = chars2.map(charr => `<span class="char2">${charr}</span>`).join("");

    // Ensure pics are positioned at bottom
    gsap.set(".pics", { 
        xPercent: -50,
        x: 0,
        bottom: "5vh",
        left: "50%",
        top: "auto"
    });

    // Gallery scroll animation timeline
    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".gallery-section",
            start: "top top",
            end: "+=6000",
            scrub: 1,
            pin: true,
        }
    });

    // 1. Rose & Card entrance
    tl2.from("#rose", { 
        opacity: 0, 
        scale: 0.2, 
        duration: 2, 
        ease: "back.out(1.7)" 
    });

    tl2.from(".caption-card", { 
        scale: 0.5, 
        y: 100, 
        opacity: 0, 
        duration: 3 
    }, "-=1");

    // 2. Text Bounce animation
    tl2.from(".char1", { 
        y: -50, 
        opacity: 0, 
        ease: "bounce.out", 
        stagger: 0.1 
    });

    tl2.from(".char2", { 
        y: -30, 
        opacity: 0, 
        ease: "bounce.out", 
        stagger: 0.05 
    }, "-=0.5");

    // 3. Pictures drop animation - they stack at the bottom
    tl2.to({}, { duration: 2 }); // Pause before first pic

    allPics.forEach((pic, i) => {
        tl2.fromTo(pic, 
            {
                y: -1000,
                rotation: i % 2 === 0 ? -15 : 15,
                opacity: 0,
                bottom: "5vh"
            },
            {
                y: 0,
                rotation: [5, -3, 7, -8][i] || 0,
                opacity: 1,
                duration: 3,
                ease: "bounce.out",
                bottom: "5vh"
            }
        );

        // Viewing time pause
        tl2.to({}, { duration: 4 }); 
    });
}
