const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
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
}


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

    if (!stats || counterStarted) return;

    if (stats.getBoundingClientRect().top < window.innerHeight) {
        counterStarted = true;

        counters.forEach(counter => {
            const target = Number(counter.dataset.target);
            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 60));

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
startCounter();


const detailModal = document.getElementById("detailModal");
const closeDetail = document.getElementById("closeDetail");
const detailImage = document.getElementById("detailImage");
const detailDate = document.getElementById("detailDate");
const detailTitle = document.getElementById("detailTitle");
const detailContent = document.getElementById("detailContent");


function openDetail(title, content, image = "", date = "") {
    if (!detailModal) return;

    detailTitle.textContent = title;
    detailContent.innerHTML = content;
    detailDate.textContent = date;

    if (image) {
        detailImage.src = image;
        detailImage.style.display = "block";
    } else {
        detailImage.style.display = "none";
    }

    detailModal.classList.add("active");
    document.body.style.overflow = "hidden";
}


document.querySelectorAll(".jurusan-card a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const card = link.closest(".jurusan-card");

        const nama = card.querySelector("h3").textContent;
        const jurusan = card.querySelector("h4").textContent;
        const deskripsi = card.querySelector("p").textContent;

        openDetail(
            nama + " - " + jurusan,
            "<p>" + deskripsi + "</p>"
        );
    });
});


document.querySelectorAll(".news-card a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const card = link.closest(".news-card");

        const image = card.querySelector(".news-image img");
        const date = card.querySelector("small");
        const title = card.querySelector("h3");
        const content = card.querySelector("p");

        openDetail(
            title ? title.textContent : "",
            "<p>" + (content ? content.textContent : "") + "</p>",
            image ? image.src : "",
            date ? date.textContent : ""
        );
    });
});


if (closeDetail) {
    closeDetail.addEventListener("click", () => {
        detailModal.classList.remove("active");
        document.body.style.overflow = "";
    });
}


if (detailModal) {
    detailModal.addEventListener("click", event => {
        if (event.target === detailModal) {
            detailModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}


document.addEventListener("keydown", event => {
    if (event.key === "Escape" && detailModal) {
        detailModal.classList.remove("active");
        document.body.style.overflow = "";
    }
});
