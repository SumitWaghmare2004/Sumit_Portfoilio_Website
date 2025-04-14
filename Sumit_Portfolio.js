// Animation for the skills section

document.addEventListener("DOMContentLoaded", function () {
    let skills = document.querySelectorAll(".skill");

    function animateSkill(skill) {
        let percentElement = skill.querySelector(".percent");
        let percent = percentElement.getAttribute("data-percent");
        let current = 0;

        let interval = setInterval(() => {
            if (current < percent) {
                current++;
                percentElement.innerHTML = current + "%";
                percentElement.parentElement.parentElement.style.background = 
                    `conic-gradient(#00c853 ${current * 3.6}deg, #d3d3d3 ${current * 3.6}deg)`;
            } else {
                clearInterval(interval);

                // Restart animation after a few seconds
                setTimeout(() => {
                    resetSkill(skill);
                    animateSkill(skill);
                }, 3000); // Restart after 3 seconds
            }
        }, 20);
    }

    function resetSkill(skill) {
        let percentElement = skill.querySelector(".percent");
        percentElement.innerHTML = "0%";
        percentElement.parentElement.parentElement.style.background = 
            `conic-gradient(#d3d3d3 0deg, #d3d3d3 360deg)`;
    }

    // Start animation for each skill
    skills.forEach(skill => animateSkill(skill));
});

// Certificate Section

document.addEventListener("DOMContentLoaded", function () {
  const certificateTrack = document.querySelector(".certificate-track");
  const scrollLeft = document.getElementById("scrollLeft");
  const scrollRight = document.getElementById("scrollRight");

  let position = 0;
  const cardWidth = document.querySelector(".certificate-card").offsetWidth + 15;
  const totalCards = document.querySelectorAll(".certificate-card").length;

  // Clone first few cards for infinite loop effect
  for (let i = 0; i < 2; i++) {
      let clone = document.querySelectorAll(".certificate-card")[i].cloneNode(true);
      certificateTrack.appendChild(clone);
  }

  scrollRight.addEventListener("click", () => {
      position -= cardWidth;
      if (Math.abs(position) >= totalCards * cardWidth) {
          position = 0; // Reset to beginning
      }
      certificateTrack.style.transform = `translateX(${position}px)`;
  });

  scrollLeft.addEventListener("click", () => {
      if (position >= 0) {
          position = -(totalCards * cardWidth); // Move to last position
      } else {
          position += cardWidth;
      }
      certificateTrack.style.transform = `translateX(${position}px)`;
  });

  // Auto-scroll every 5 seconds (optional)
  setInterval(() => {
      position -= cardWidth;
      if (Math.abs(position) >= totalCards * cardWidth) {
          position = 0;
      }
      certificateTrack.style.transform = `translateX(${position}px)`;
  }, 4000);
});

  
// Achievements section

document.addEventListener("DOMContentLoaded", function () {
    const achievementCards = document.querySelectorAll(".achievement-card");

    function revealAchievements() {
        achievementCards.forEach((card) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 50) {
                card.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealAchievements);
    revealAchievements(); // Call on page load
});


// Animation for titles in different sections

document.addEventListener("DOMContentLoaded", function () {
    const targets = document.querySelectorAll(
        '.my-journey-title, .skills-title, .work-exp-title, .project-title, .certificate-title, .achievement-title'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // animate once
            }
        });
    }, {
        threshold: 0.5
    });

    targets.forEach(el => observer.observe(el));
}); 


// Scroll Animation for Website Scrolls ( Navbar Clicks )

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const scrollType = this.dataset.scroll || "ease"; // default to "ease"
      const target = document.getElementById(targetId);
      if (!target) return;
  
      scrollToTarget(target, scrollType);
    });
  
    function scrollToTarget(target, type) {
      const top = target.getBoundingClientRect().top + window.scrollY - 50; // adjust for fixed navbar
      switch (type) {
        case "ease":
          animatedScroll(top, 750);
          break;
        case "linear":
          smoothScrollLinear(top, 1600);
          break;
        case "bounce":
          bounceScroll(top, 2000);
          break;
        case "spring":
          springScroll(top);
          break;
        case "slow":
          animatedScroll(top, 2000);
          break;
        case "fast":
          animatedScroll(top, 600);
          break;
        case "inertia":
          inertiaScroll(top);
          break;
        case "elastic":
          elasticScroll(top);
          break;
        case "pulse":
          pulseScroll(top, 1800);
          break;
        case "glide":
          glideScroll(top, 2000);
          break;
        default:
          animatedScroll(top, 1600);
      }
    }
  
    function animatedScroll(targetY, duration = 1500) {
      const startY = window.scrollY;
      const diff = targetY - startY;
      const startTime = performance.now();
  
      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const percent = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + diff * percent);
        if (percent < 1) requestAnimationFrame(animate);
      }
  
      requestAnimationFrame(animate);
    }
  
    function smoothScrollLinear(targetY, duration = 1600) {
      let startY = window.scrollY;
      let diff = targetY - startY;
      let startTime = null;
  
      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const time = currentTime - startTime;
        const percent = Math.min(time / duration, 1);
        window.scrollTo(0, startY + diff * percent);
        if (time < duration) requestAnimationFrame(step);
      }
  
      requestAnimationFrame(step);
    }
  
    function bounceScroll(targetY, duration = 2000) {
      let start = window.scrollY;
      let diff = targetY - start;
      let startTime = null;
  
      function bounceEaseOut(t) {
        const c = 1.70158;
        return 1 - (--t) * t * ((c + 1) * t + c);
      }
  
      function step(time) {
        if (!startTime) startTime = time;
        let elapsed = (time - startTime) / duration;
        if (elapsed > 1) elapsed = 1;
        const progress = bounceEaseOut(elapsed);
        window.scrollTo(0, start + diff * progress);
        if (elapsed < 1) requestAnimationFrame(step);
      }
  
      requestAnimationFrame(step);
    }
  
    function springScroll(targetY) {
      let position = window.scrollY;
      let velocity = 0;
      let stiffness = 0.05;
      let damping = 0.8;
  
      function animate() {
        const dist = targetY - position;
        const accel = stiffness * dist;
        velocity = damping * (velocity + accel);
        position += velocity;
        window.scrollTo(0, position);
  
        if (Math.abs(dist) > 0.5 || Math.abs(velocity) > 0.5) {
          requestAnimationFrame(animate);
        }
      }
  
      animate();
    }
  
    function inertiaScroll(targetY) {
      let position = window.scrollY;
      let velocity = (targetY - position) / 12;
  
      function step() {
        velocity *= 0.92;
        position += velocity;
        window.scrollTo(0, position);
        if (Math.abs(velocity) > 0.5) requestAnimationFrame(step);
      }
  
      step();
    }
  
    function elasticScroll(targetY) {
      let position = window.scrollY;
      let velocity = 0;
      const spring = 0.03;
      const friction = 0.85;
  
      function animate() {
        const dist = targetY - position;
        const accel = dist * spring;
        velocity += accel;
        velocity *= friction;
        position += velocity;
        window.scrollTo(0, position);
        if (Math.abs(dist) > 0.5 || Math.abs(velocity) > 0.5) {
          requestAnimationFrame(animate);
        }
      }
  
      animate();
    }
  
    function pulseScroll(targetY, duration = 1800) {
      const startY = window.scrollY;
      const diff = targetY - startY;
      const startTime = performance.now();
  
      function easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }
  
      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const percent = Math.min(elapsed / duration, 1);
        const ease = easeInOut(percent);
        window.scrollTo(0, startY + diff * ease);
        if (percent < 1) requestAnimationFrame(animate);
      }
  
      requestAnimationFrame(animate);
    }
  
    function glideScroll(targetY, duration = 2000) {
      let start = window.scrollY;
      let diff = targetY - start;
      let startTime = null;
  
      function glideEase(t) {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }
  
      function step(time) {
        if (!startTime) startTime = time;
        let elapsed = (time - startTime) / duration;
        if (elapsed > 1) elapsed = 1;
        const progress = glideEase(elapsed);
        window.scrollTo(0, start + diff * progress);
        if (elapsed < 1) requestAnimationFrame(step);
      }
  
      requestAnimationFrame(step);
    }
  
  });
  