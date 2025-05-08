/**
 * Main script for SunTech website functionality and animations.
 * Ensures all operations run after the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded. Initializing scripts...");

    /**
     * Helper function to check if an element exists
     */
    function elementExists(selector, context = document) {
        return context.querySelector(selector) !== null;
    }

    /**
     * Mobile Navigation Toggle
     */
    try {
        const hamburger = document.getElementById("hamburger-menu");
        const navLinks = document.querySelector(".nav-links");

        if (hamburger && navLinks) {
            hamburger.addEventListener("click", () => {
                navLinks.classList.toggle("active");
                hamburger.classList.toggle("active");
            });
        } else {
            // Non-critical, don't warn unless debugging specific pages
            // if (!hamburger) console.warn("Hamburger menu element not found.");
            // if (!navLinks) console.warn("Nav links element not found.");
        }
    } catch (error) {
        console.error("Error in Mobile Navigation:", error);
    }

    /**
     * Testimonial Slider
     */
    try {
        const slider = document.getElementById("testimonial-slider");
        if (slider) { // Only run if slider exists
            const prevBtn = document.getElementById("prev-testimonial");
            const nextBtn = document.getElementById("next-testimonial");
            const dotsContainer = slider.querySelector(".dots-container") || slider.querySelector(".slider-dots");
            const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];
            const slides = slider.querySelectorAll(".testimonial-slide");

            if (prevBtn && nextBtn && slides.length > 0) {
                console.log(`Init Testimonial Slider: ${slides.length} slides.`);
                let current = 0;
                const max = slides.length;
                let interval = null;

                const show = (idx) => {
                    if (idx < 0 || idx >= max) return;
                    slides.forEach((s, i) => {
                        s.style.display = (i === idx) ? "block" : "none";
                        s.classList.toggle('active-slide', i === idx);
                    });
                    if (dots.length === max) {
                        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
                    }
                    current = idx;
                };

                const stopInterval = () => clearInterval(interval);
                const startInterval = () => {
                    stopInterval();
                    interval = setInterval(() => show((current + 1) % max), 5000);
                };

                nextBtn.addEventListener("click", () => { stopInterval(); show((current + 1) % max); startInterval(); });
                prevBtn.addEventListener("click", () => { stopInterval(); show((current - 1 + max) % max); startInterval(); });

                if (dots.length === max) {
                    dots.forEach((d, i) => d.addEventListener("click", () => { stopInterval(); show(i); startInterval(); }));
                }

                show(0); // Initial show
                startInterval();
            } else {
                if (!prevBtn) console.warn("Slider prev button missing.");
                if (!nextBtn) console.warn("Slider next button missing.");
                if (slides.length === 0) console.warn("No slides found in slider.");
            }
        }
    } catch (error) {
        console.error("Error in Testimonial Slider:", error);
    }


    /**
     * FAQ Accordion
     */
    try {
        const faqItems = document.querySelectorAll(".faq-item");
        if (faqItems.length > 0) {
            faqItems.forEach((item) => {
                const question = item.querySelector(".faq-question");
                if (question) {
                    question.addEventListener("click", () => item.classList.toggle("active"));
                } else { console.warn("FAQ item missing question.", item); }
            });
        }
    } catch (error) {
        console.error("Error in FAQ Accordion:", error);
    }


    /**
     * Course Filters & Search
     */
    try {
        const courseGrid = document.querySelector(".courses-grid");
        if (courseGrid) { // Only run if grid exists
            const filterBtns = document.querySelectorAll(".filter-btn");
            const courseCards = courseGrid.querySelectorAll(".course-card");
            const searchInput = document.getElementById("course-search");
            const searchBtn = document.getElementById("search-btn");

            // Filter logic
            if (filterBtns.length > 0 && courseCards.length > 0) {
                filterBtns.forEach((btn) => {
                    btn.addEventListener("click", () => {
                        filterBtns.forEach(b => b.classList.remove("active"));
                        btn.classList.add("active");
                        const filter = btn.getAttribute("data-filter") || "all";
                        courseCards.forEach((card) => {
                            const category = card.getAttribute("data-category");
                            card.style.display = (filter === "all" || !category || category === filter) ? "" : "none";
                        });
                    });
                });
                 // Set initial active state based on first button or 'all'
                 const initialActiveFilter = document.querySelector(".filter-btn.active") || document.querySelector(".filter-btn[data-filter='all']");
                 if (initialActiveFilter) {
                     initialActiveFilter.classList.add("active");
                     // Optional: Trigger initial filter on load
                     // initialActiveFilter.click();
                 } else if(filterBtns.length > 0) {
                      filterBtns[0].classList.add("active"); // Default to first if no 'all' or 'active'
                 }
            }

            // Search Logic
            if (searchInput && searchBtn && courseCards.length > 0) {
                const performSearch = () => {
                    const term = searchInput.value.toLowerCase().trim();
                    const activeFilterBtn = document.querySelector(".filter-btn.active");
                    const currentFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";

                    courseCards.forEach((card) => {
                        const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
                        const desc = card.querySelector("p")?.textContent.toLowerCase() || "";
                        const category = card.getAttribute("data-category")?.toLowerCase() || "";
                        const matchesFilter = (currentFilter === "all" || !category || category === currentFilter);
                        const matchesSearch = (term === "" || title.includes(term) || desc.includes(term)); // Show all if search is empty

                        card.style.display = (matchesFilter && matchesSearch) ? "" : "none";
                    });
                };
                searchBtn.addEventListener("click", performSearch);
                searchInput.addEventListener("keyup", (e) => {
                    if (e.key === "Enter") performSearch();
                    // Add live search on keyup if desired
                    // else { performSearch(); }
                });
            }
        }
    } catch (error) {
        console.error("Error in Course Filters/Search:", error);
    }


    /**
     * Contact Form Submission
     */
    try {
        const contactForm = document.getElementById("contact-form");
        if (contactForm) { // Only run if form exists
            const formMessage = document.getElementById("form-message");
            if (formMessage) {
                contactForm.addEventListener("submit", (event) => {
                    event.preventDefault();
                    let isValid = true;
                    contactForm.querySelectorAll("[required]").forEach(field => {
                         if (!field.value.trim()) {
                             isValid = false;
                             field.style.borderColor = 'red'; // Example: Highlight invalid field
                         } else {
                             field.style.borderColor = ''; // Reset border color
                         }
                    });
                    if (!isValid) {
                        formMessage.textContent = "Please fill required fields.";
                        formMessage.className = "form-message error"; return;
                    }
                    formMessage.textContent = "Sending..."; formMessage.className = "form-message";
                    setTimeout(() => { /* Simulate */
                        formMessage.textContent = "Message sent successfully!"; formMessage.className = "form-message success";
                        contactForm.reset();
                         contactForm.querySelectorAll("[required]").forEach(field => field.style.borderColor = ''); // Reset borders on success
                        setTimeout(() => { formMessage.textContent = ''; formMessage.className = 'form-message'; }, 5000);
                    }, 1200);
                });
            } else { console.warn("Contact form message element '#form-message' missing."); }
        }
    } catch (error) {
        console.error("Error in Contact Form:", error);
    }

    /**
     * Newsletter Subscription
     */
    try {
        const newsletterForm = document.getElementById("newsletter-form");
        if (newsletterForm) {
             const feedbackElement = document.createElement('span'); // Create element for feedback
             feedbackElement.style.marginLeft = '10px';
             feedbackElement.style.fontSize = '0.9em';
             newsletterForm.parentNode.insertBefore(feedbackElement, newsletterForm.nextSibling); // Insert after form

            newsletterForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                feedbackElement.textContent = ''; // Clear previous feedback

                if (emailInput && emailInput.value.includes('@') && emailInput.value.includes('.')) {
                    console.log(`Newsletter signup: ${emailInput.value}`);
                    feedbackElement.textContent = 'Subscribed!';
                    feedbackElement.style.color = 'green';
                    emailInput.value = '';
                } else {
                    console.warn("Invalid newsletter email.");
                    feedbackElement.textContent = 'Invalid email.';
                    feedbackElement.style.color = 'red';
                }
                 // Clear feedback after a few seconds
                 setTimeout(() => { feedbackElement.textContent = ''; }, 4000);
            });
        }
    } catch (error) {
        console.error("Error in Newsletter:", error);
    }

    /**
     * Smooth Scrolling for Anchor Links
     */
    try {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                const href = anchor.getAttribute("href");
                if (href && href.length > 1 && href !== '#') { // Check it's not just "#"
                    try {
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            e.preventDefault(); // Prevent default jump ONLY if target exists
                            const header = document.querySelector('header.sticky-header');
                            const headerOffset = header ? header.offsetHeight : 70; // Default offset
                            const elemTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                            window.scrollTo({ top: elemTop - headerOffset, behavior: "smooth" });
                        } else { console.warn(`Smooth scroll target not found: ${href}`); }
                    } catch (err) { console.error(`Smooth scroll selector error for href="${href}":`, err); }
                }
            });
        });
    } catch (error) {
        console.error("Error in Smooth Scrolling:", error);
    }


    // ========================================
    // === ANIMATION LOGIC (Conditional) ===
    // ========================================

    const pathname = window.location.pathname;
    // More robust check for index page (handles root path as well)
    const isIndexPage = pathname === '/' || pathname.endsWith('/index.html') || pathname.endsWith('/index.htm');

    if (!isIndexPage) {
        console.log("Initializing animations (Not Index Page)...");

        /** Typing Animation (About Page) */
        try {
            const typingElem = document.getElementById("about-typing-headline");
            if (typingElem) {
                console.log("Init About Typing Animation.");
                const words = ["About Us.", "Our Mission.", "Our Vision.", "Our Values."];
                let idx = 0, charIdx = 0, deleting = false;
                let timeout;
                const type = () => {
                    // Double check element still exists if page transitions happen fast
                    const currentTypingElem = document.getElementById("about-typing-headline");
                    if (!currentTypingElem || !document.body.contains(currentTypingElem)) {
                        if(timeout) clearTimeout(timeout);
                        console.log("Typing animation stopped: Element removed.");
                        return;
                    }
                    const current = words[idx];
                    let speed = 130;
                    if (deleting) {
                        currentTypingElem.textContent = current.substring(0, charIdx - 1);
                        charIdx--; speed = 65;
                    } else {
                        currentTypingElem.textContent = current.substring(0, charIdx + 1);
                        charIdx++;
                    }
                    if (!deleting && charIdx === current.length) { deleting = true; speed = 2000; }
                    else if (deleting && charIdx === 0) { deleting = false; idx = (idx + 1) % words.length; speed = 500; }
                    timeout = setTimeout(type, speed);
                };
                timeout = setTimeout(type, 1000); // Start after 1s delay
            }
        } catch (e) { console.error("Typing Animation Error:", e); }

        /** Scroll Animations (Fade/Slide) */
        try {
            const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-in-up, .animate-slide-in-left, .animate-slide-in-right');
            if (elements.length > 0) {
                console.log(`Init Scroll Animations: ${elements.length} elements.`);
                 // Ensure IntersectionObserver is supported
                if ('IntersectionObserver' in window) {
                    const obsOptions = { rootMargin: '0px 0px -60px 0px', threshold: 0.1 };
                    const callback = (entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('visible');
                                observer.unobserve(entry.target);
                            }
                        });
                    };
                    const observer = new IntersectionObserver(callback, obsOptions);
                    elements.forEach(el => { // Ensure initial state is set
                        el.style.opacity = '0'; // Start invisible
                        // Set initial transform based on class
                        if(el.classList.contains('animate-slide-in-up')) el.style.transform = 'translateY(40px)';
                        else if(el.classList.contains('animate-slide-in-left')) el.style.transform = 'translateX(-40px)';
                        else if(el.classList.contains('animate-slide-in-right')) el.style.transform = 'translateX(40px)';
                        else el.style.transform = 'translate(0, 0)'; // Default for fade-in
                        // Set transition style
                        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                        observer.observe(el);
                    });
                } else {
                    // Fallback for browsers without IntersectionObserver: just show elements
                    console.warn("IntersectionObserver not supported. Scroll animations disabled.");
                    elements.forEach(el => { el.style.opacity = '1'; el.style.transform = 'translate(0,0)'; });
                }
            }
        } catch (e) { console.error("Scroll Animation Error:", e); }

        /** Animated Number Counters */
        try {
            const counters = document.querySelectorAll('.stat-number[data-count]');
            if (counters.length > 0) {
                console.log(`Init Number Counters: ${counters.length} elements.`);
                 if ('IntersectionObserver' in window) {
                    const obsOptions = { threshold: 0.4 };
                    const callback = (entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !entry.target.dataset.animated) {
                                const el = entry.target;
                                const target = parseInt(el.dataset.count, 10);
                                if (isNaN(target)) { observer.unobserve(el); console.warn("Invalid data-count:", el); return; }

                                el.dataset.animated = "true";
                                let current = 0; const duration = 2000; const step = 16; // ~60fps
                                const increment = target / (duration / step); // Calculate increment based on duration
                                if (target === 0) { // Handle target of 0 immediately
                                    el.textContent = '0';
                                     observer.unobserve(el);
                                     return;
                                }

                                const update = () => {
                                    current += increment;
                                    if (current < target) {
                                        el.textContent = Math.ceil(current).toLocaleString();
                                        requestAnimationFrame(update);
                                    } else {
                                        el.textContent = target.toLocaleString(); // Ensure final value is exact
                                        observer.unobserve(el);
                                    }
                                };
                                requestAnimationFrame(update); // Start animation frame loop
                            }
                        });
                    };
                    const observer = new IntersectionObserver(callback, obsOptions);
                    counters.forEach(el => { el.textContent = '0'; el.dataset.animated = "false"; observer.observe(el); });
                 } else {
                      console.warn("IntersectionObserver not supported. Number counters will show final value immediately.");
                      counters.forEach(el => {
                           const target = parseInt(el.dataset.count, 10);
                           el.textContent = isNaN(target) ? '0' : target.toLocaleString();
                      });
                 }
            }
        } catch (e) { console.error("Number Counter Error:", e); }

    } else {
        console.log("Skipping animations on Index Page.");
        // Optional: Remove animation classes from index page elements if they were added
        // document.querySelectorAll('.animate-fade-in, .animate-slide-in-up, .animate-slide-in-left, .animate-slide-in-right')
        //    .forEach(el => el.classList.remove('animate-fade-in', 'animate-slide-in-up', 'animate-slide-in-left', 'animate-slide-in-right'));
    }

    // ======================================
    // === ANIMATION CODE ENDS HERE ===
    // ======================================

    console.log("All scripts initialized.");

}); // End of DOMContentLoaded

