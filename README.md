# Easy sakan - Real Estate Platform

## Project Structure

```
easy-sakan/
├── index.php              # Home page (main entry point)
├── login.php              # Login page
├── signup.php             # Sign up page
├── assets/
│   ├── css/
│   │   └── styles.css     # All stylesheets
│   ├── js/
│   │   └── app.js         # JavaScript functionality
│   └── images/
│       └── logo.png       # Logo and images
└── README.md              # This file
```

## Features

- Modern responsive design
- User authentication (signup/login)
- Property listings
- Service integrations
- Egyptian governorate selection
- Session management via localStorage

## Color Palette

- Primary Blue: #1876D3
- Light Blue: #4DAAFF
- Accent Green: #CCFFA5
- Deep Blue: #082D56

## Setup Instructions

### For Development:
1. Place files in your web server directory (htdocs for XAMPP, www for WAMP)
2. Access via browser: `http://localhost/easy-sakan/`

### For PHP Server:
```bash
php -S localhost:8000
```
Then visit: `http://localhost:8000`

## File Descriptions

### PHP Files:
- **index.php**: Landing page with hero, properties, services sections
- **login.php**: User login with email and password
- **signup.php**: User registration with name, email, password, governorate

### Assets:
- **styles.css**: All styling including auth templates, home page, responsive design
- **app.js**: Form validation, localStorage management, navigation logic
- **logo.png**: Platform branding

## Next Steps for PHP Integration

To convert to full PHP backend:

1. Create `config/database.php` for MySQL connection
2. Replace localStorage with PHP sessions
3. Add server-side validation
4. Create database tables for users and properties
5. Add PHP includes for header/footer components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

Built with HTML5, CSS3, and vanilla JavaScript
Ready for PHP backend integration
