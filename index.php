<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Easy sakan - Your Unified Journey in Real Estate</title>
  <link rel="stylesheet" href="assets/css/styles.css" />
</head>
<body class="home-body">
  <header class="home-header">
    <div class="container-wide">
      <div class="header-content">
        <div class="header-logo">
          <a href="index.php">
            <img src="assets/images/logo.jpg" alt="Easy sakan" class="header-logo-img" />
          </a>
        </div>
        <nav class="header-nav">
          <a href="index.php" class="nav-link">Home</a>
          <a href="listings.php" class="nav-link">Listings</a>
          <a href="#services" class="nav-link">Services</a>
          <a href="#contact" class="nav-link">Contact</a>
        </nav>
        <div class="header-actions">
          <a href="login.php" class="btn-header-outline"><img src="assets/images/login.png" alt="Login" style="width: 18px; height: 18px; margin-right: 8px; vertical-align: middle;" />Login</a>
          <a href="signup.php" class="btn-header-solid"><img src="assets/images/add-user.png" alt="Sign Up" style="width: 18px; height: 18px; margin-right: 8px; vertical-align: middle;" />Sign Up</a>
          <button id="logoutBtn" class="btn-header-solid" type="button" style="display:none;">Logout</button>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container-wide">
        <div class="hero-content">
          <h1 class="hero-title">Find Your Perfect Home</h1>
          <p class="hero-subtitle">Your unified journey in real estate begins here</p>
          <div class="hero-actions">
            <a href="listings.php" class="btn-hero-primary">Browse Properties</a>
            <a href="#services" class="btn-hero-secondary">Our Services</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container-wide">
        <div class="stats-grid">
          <div class="stat-item">
            <h3 class="stat-number">1000+</h3>
            <p class="stat-label">Properties Listed</p>
          </div>
          <div class="stat-item">
            <h3 class="stat-number">500+</h3>
            <p class="stat-label">Happy Customers</p>
          </div>
          <div class="stat-item">
            <h3 class="stat-number">50+</h3>
            <p class="stat-label">Expert Agents</p>
          </div>
          <div class="stat-item">
            <h3 class="stat-number">24/7</h3>
            <p class="stat-label">Support Available</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works-section">
      <div class="container-wide">
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle">Your journey to finding the perfect property in three simple steps</p>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3 class="step-title">Browse Properties</h3>
            <p class="step-description">Explore our extensive collection of properties tailored to your needs</p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h3 class="step-title">Schedule a Visit</h3>
            <p class="step-description">Book a tour and experience your future home in person</p>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h3 class="step-title">Make It Yours</h3>
            <p class="step-description">Complete the process with our expert guidance and support</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section" id="services">
      <div class="container-wide">
        <h2 class="section-title">Our Services</h2>
        <p class="section-subtitle">Comprehensive real estate solutions for every need</p>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🏠</div>
            <h3 class="service-title">Buy Properties</h3>
            <p class="service-description">Find your dream home from our curated selection of properties for sale</p>
            <a href="listings.php" class="service-link">Explore →</a>
          </div>
          <div class="service-card">
            <div class="service-icon">🔑</div>
            <h3 class="service-title">Rent Properties</h3>
            <p class="service-description">Discover apartments, villas, and studios available for rent</p>
            <a href="listings.php" class="service-link">Explore →</a>
          </div>
          <div class="service-card">
            <div class="service-icon">🚚</div>
            <h3 class="service-title">Transportation</h3>
            <p class="service-description">Professional moving and transportation services for your convenience</p>
            <a href="listings.php" class="service-link">Explore →</a>
          </div>
          <div class="service-card">
            <div class="service-icon">🔧</div>
            <h3 class="service-title">Maintenance</h3>
            <p class="service-description">Expert maintenance and repair services for your property</p>
            <a href="listings.php" class="service-link">Explore →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Properties Section -->
    <section class="featured-section">
      <div class="container-wide">
        <h2 class="section-title">Featured Properties</h2>
        <p class="section-subtitle">Handpicked properties just for you</p>
        <div class="featured-grid">
          <div class="featured-card">
            <div class="featured-image"></div>
            <div class="featured-content">
              <span class="featured-badge">For Sale</span>
              <h3 class="featured-title">Luxury Apartment in New Cairo</h3>
              <p class="featured-location">📍 New Cairo, Egypt</p>
              <div class="featured-specs">
                <span>3 Beds</span>
                <span>2 Baths</span>
                <span>180 m²</span>
              </div>
              <div class="featured-footer">
                <p class="featured-price">EGP 2,800,000</p>
                <a href="listings.php" class="btn-featured">View Details</a>
              </div>
            </div>
          </div>
          <div class="featured-card">
            <div class="featured-image"></div>
            <div class="featured-content">
              <span class="featured-badge rent">For Rent</span>
              <h3 class="featured-title">Spacious Villa in Sheikh Zayed</h3>
              <p class="featured-location">📍 Sheikh Zayed, Giza</p>
              <div class="featured-specs">
                <span>5 Beds</span>
                <span>4 Baths</span>
                <span>450 m²</span>
              </div>
              <div class="featured-footer">
                <p class="featured-price">EGP 35,000/mo</p>
                <a href="listings.php" class="btn-featured">View Details</a>
              </div>
            </div>
          </div>
          <div class="featured-card">
            <div class="featured-image"></div>
            <div class="featured-content">
              <span class="featured-badge">For Sale</span>
              <h3 class="featured-title">Penthouse with Stunning Views</h3>
              <p class="featured-location">📍 Zamalek, Cairo</p>
              <div class="featured-specs">
                <span>4 Beds</span>
                <span>3 Baths</span>
                <span>320 m²</span>
              </div>
              <div class="featured-footer">
                <p class="featured-price">EGP 8,500,000</p>
                <a href="listings.php" class="btn-featured">View Details</a>
              </div>
            </div>
          </div>
        </div>
        <div class="featured-action">
          <a href="listings.php" class="btn-view-all">View All Properties</a>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container-wide">
        <h2 class="section-title">What Our Clients Say</h2>
        <p class="section-subtitle">Real stories from satisfied customers</p>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">"Easy sakan made finding my dream home so simple! The team was professional and supportive throughout the entire process."</p>
            <div class="testimonial-author">
              <div class="author-avatar">AS</div>
              <div class="author-info">
                <h4 class="author-name">Ahmed Salem</h4>
                <p class="author-title">Homeowner</p>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">"Exceptional service! They helped me find the perfect rental apartment and even assisted with the moving process."</p>
            <div class="testimonial-author">
              <div class="author-avatar">MK</div>
              <div class="author-info">
                <h4 class="author-name">Mona Khalil</h4>
                <p class="author-title">Tenant</p>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">"From property search to maintenance services, Easy sakan is truly a one-stop solution for all real estate needs!"</p>
            <div class="testimonial-author">
              <div class="author-avatar">KM</div>
              <div class="author-info">
                <h4 class="author-name">Karim Mostafa</h4>
                <p class="author-title">Investor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container-wide">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Find Your Perfect Property?</h2>
          <p class="cta-subtitle">Join thousands of satisfied customers who found their dream homes with us</p>
          <div class="cta-actions">
            <a href="signup.php" class="btn-cta-primary"><img src="assets/images/add-user.png" alt="Sign Up" style="width: 18px; height: 18px; margin-right: 8px; vertical-align: middle;" />Get Started</a>
            <a href="#contact" class="btn-cta-secondary">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="home-footer" id="contact">
    <div class="container-wide">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Easy sakan</h4>
          <p>Your unified journey in real estate</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <a href="index.php">Home</a>
          <a href="listings.php">Listings</a>
          <a href="#services">Services</a>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Contact</a>
          <a href="#">Terms</a>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Easy sakan. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="assets/js/app.js"></script>
</body>
</html>
