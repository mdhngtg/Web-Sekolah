const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuBtn.textContent = navMenu.classList.contains("active")
        ? "✕"
        : "☰";
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});


const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    revealElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounter() {
    const stats = document.querySelector(".stats-section");

    if (!stats) return;

    if (
        stats.getBoundingClientRect().top < window.innerHeight &&
        !counterStarted
    ) {
        counterStarted = true;

        counters.forEach(counter => {
            const target = Number(counter.dataset.target);
            let current = 0;
            const increment = Math.ceil(target / 60);

            function updateCounter() {
                current += increment;

                if (current >= target) {
                    counter.textContent = target + "+";
                    return;
                }

                counter.textContent = current;

                requestAnimationFrame(updateCounter);
            }

            updateCounter();
        });
    }
}

window.addEventListener("scroll", startCounter);


const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;

    if (nama === "" || email === "" || pesan === "") {
        alert("Silakan isi semua data terlebih dahulu.");
        return;
    }

    alert("Terima kasih " + nama + "! Pesan berhasil dikirim.");

    contactForm.reset();
});