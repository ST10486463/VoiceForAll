- README for my VoiceForAll

- I created this webiste because I wabt to creat awarness about the Gender-based Viloencethat is happening around the world
- It has a home page which shows the logo,slogan and hero image about what my organization is about
- The there is an about where you find the brief history,mission,vision,goals and objectives, the video which shows the campaing videos creating awarness and also the anmes of the team members
- there is an enquiry/contact pages there is email,office,shelter adress and the map that shows where we are located
- There is servicepage which show what we offer in our organisation
- There is news which there is the orgaisation blog update and also the victims stories
- And lastly the gallery which shows the images 
PART 2
In my webiste created a style.css file that linked to my about,home,news,services,enquiry and gallery html page.
I then etsablish a base style such font family in my body,headings and also used fon sizes to enlarge the sizes on the headings and header, i used margin to creat space between the image and text and padding.
i used Typogrpahy syles like letter spacing to makes space betwwn the texts, font weight to make the test bold and line height and i used text-decoration to remove them.
I created a nvigation bar that consists of my home,about,service,enquiry,gallery and news and on my naviagtion bar there is a top bar that consists of social media icons and number for help
in my home page i included a button for Get help ehich takes to the enquiry page and i changes the hero imge to my my new one
There also background colours and box shadows and i used color purple for my text word.
I added media quries to help to accomodate the tablets,mobile and desktop by adding maax and min which will accomdate the electonic devices'
i ensured thta there is psudeoclasses like hover,active and focus on my button and also the nav links
on my footer i added a hover and ul.
I ensured that there is also hover on my news "victims stories".

References:
Btc.edu.za. (2025). Available at: https://www.btc.edu.za/wp-content/uploads/2020/01/student-support-counselling-internal-image.jpg [Accessed 26 Sep. 2025].
Nwu.ac.za. (2025). Available at: https://services.nwu.ac.za/sites/services.nwu.ac.za/files/files/com-dev/END-GBV-NOW.jpg [Accessed 26 Sep. 2025].
Website-files.com. (2025). Available at: https://cdn.prod.website-files.com/6272566d49f60869adc23be5/63db1f8939a0ee3dab65ebec_119.jpg [Accessed 26 Sep. 2025].
Www.gov.za. (2025). Available at: https://www.gov.za/sites/default/files/speech_docs/gbvf.png [Accessed 26 Sep. 2025].
# VoiceForAll - GBV Support Platform

Project Overview
Part3
VoiceForAll is a comprehensive web platform dedicated to supporting survivors of Gender-Based Violence (GBV) in South Africa. This responsive website serves as a crucial resource hub providing immediate assistance, educational content, and support services for individuals affected by GBV. The platform features a modern, accessible design with interactive elements that enhance user experience while maintaining a sensitive and supportive tone appropriate for the sensitive nature of GBV support.




 Home Page
- Emergency assistance modal with direct contact options
- Interactive service search functionality
- Expandable FAQ accordion sections
- Animated statistics counter
- Responsive service cards with hover effects

 About Page
- Organizational history and mission information
- Interactive team member profiles
- Tabbed content sections for impact statistics
- Animated counter displays for organizational metrics
- Smooth scrolling navigation

 Services Page
- Comprehensive service offerings with interactive cards
- Advanced form validation with real-time feedback
- Service categorization and filtering system
- Emergency quick-access button
- Success modal for form submissions

Gallery Page
- Responsive image grid with hover effects
- Full-screen lightbox functionality
- Image search and category filtering
- Download and social sharing options
- Keyboard navigation support

Enquiry & Contact Pages
- Multi-step form validation
- Interactive contact information
- Operating hours with real-time status
- Map integration with downloadable directions
- Social media integration
 JavaScript Functionality

The platform implements sophisticated JavaScript features including:
- Form validation with comprehensive error handling
- Interactive modal systems for emergency access
- Dynamic content filtering and search
- Smooth animations and transitions
- Mobile-responsive navigation
- Image loading optimization with error handling
- Accessibility enhancements

 Design & User Experience

The design prioritizes user comfort and accessibility with:
- Purple and white color scheme representing support and hope
- Clear typography and sufficient contrast for readability
- Intuitive navigation structure
- Mobile-first responsive design
- Loading states and user feedback
- Emergency features prominently displayed
 Compliance & Best Practices

The website adheres to web standards including:
- WCAG accessibility guidelines
- SEO best practices with optimized meta data
- Cross-browser compatibility
- Performance optimization
- Security considerations for form handling
- Privacy-focused design for sensitive information

 VoiceForAll - GBV Support Platform: New JavaScript Implementation

 Comprehensive JavaScript Enhancements

I have implemented extensive JavaScript functionality across all pages of the VoiceForAll website, transforming it from a static information platform into an interactive, dynamic support system. These enhancements significantly improve user experience, accessibility, and functionality while maintaining the sensitive nature required for GBV support services.

Page-Specific JavaScript Implementations

 Home Page (`home-script.js`)New Interactive Features:**
- Emergency Modal System**: A prominently displayed emergency button with pulse animation that opens a modal with immediate contact options including direct call
- functionality to police and helplines
- **Service Search Functionality**: Real-time search through support options with intelligent filtering and "no results" messaging with helpful suggestions
- **Interactive Accordion FAQ**: Expandable/collapsible content sections with smooth animations and auto-close functionality
- **Animated Statistics Counter**: Dynamic number counting animation that triggers when statistics come into view
- **Scroll Animations**: Fade-in effects for content as users scroll down the page
- **Enhanced Emergency Button**: Continuous pulse animation for attention with click feedback effects

About Page (`about-script.js`)
**New Dynamic Elements:**
- **Interactive Tab System**: Fully functional tab interface for Impact, Statistics, Partners, and Awards sections
- **Animated Number Counters**: Statistics that animate and count up when scrolled into view
- **Team Member Interactions**: Hover effects and click-to-highlight functionality for team profiles
- **Enhanced Video Controls**: Custom video playback with keyboard support and hover instructions
- **Expandable Info Sections**: Click-to-expand content areas for better information organization
- **Scroll Progress Indicator**: Visual progress bar showing scroll position

 Gallery Page (`gallery-script.js`)
**Advanced Gallery Features:**
- **Full Lightbox Implementation**: Comprehensive image viewing with navigation arrows, keyboard support, and smooth transitions
- **Real-time Search & Filtering**: Instant search through image titles and descriptions with category filtering
- **Image Error Handling**: Robust error management for failed image loads with fallback content
- **Download Functionality**: One-click image downloads with confirmation messages
- **Social Sharing**: Built-in sharing capabilities for images
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Loading States**: Progressive image loading with opacity transitions

### Services Page (`services-script.js`)
**Enhanced Service Discovery:**
- **Interactive Service Cards**: Hover effects and click animations with auto-form filling
- **Advanced Form Validation**: Comprehensive client-side validation for all form fields with real-time feedback
- **Service Search & Filtering**: Dynamic service discovery with category-based filtering
- **Emergency Quick Access**: Prominent emergency button with direct helpline access
- **Success Modal System**: Professional submission confirmation with emergency contact reminders
- **Auto-formatting**: Intelligent formatting for ID numbers and phone numbers

### Enquiry Page (`enquiry-script.js`)
**Complete Form System:**
- **Multi-field Validation**: Comprehensive validation for all form inputs including email format, ID numbers, and phone numbers
- **Interactive Contact Elements**: Clickable email addresses, phone numbers, and social media links
- **Dynamic Operating Hours**: Real-time status showing current open/closed state with visual indicators
- **Map Integration**: Interactive Google Maps with downloadable directions
- **Toast Notifications**: User feedback system for actions like downloads
- **Success Modal**: Professional submission confirmation with detailed summary

## Technical JavaScript Features

### Form Validation System
- **Real-time validation** with immediate user feedback
- **Custom validation rules** for South African ID numbers and phone formats
- **Error message management** with clear, actionable instructions
- **Loading states** during form submission
- **Success confirmation** with submission details

### Interactive Elements
- **Smooth scrolling navigation** for better user experience
- **Hover effects and animations** for visual engagement
- **Keyboard accessibility** throughout all interactive components
- **Mobile-responsive interactions** that work seamlessly across devices

 Dynamic Content Management
Search functionality** across all content types
- Filtering systems** for categorized content
- Real-time content updates** without page reloads
- **Progressive enhancement** ensuring functionality without JavaScript

 User Experience Enhancements
- Loading states and transitions** for all interactive elements
- Error handling and fallbacks** for robust performance
- Accessibility features** including keyboard navigation and ARIA labels
- Performance optimization** with efficient event handling and DOM manipulation

 Security & Privacy Considerations

The JavaScript implementation includes:
- **Client-side validation** to prevent invalid submissions
- **No sensitive data storage** in client-side code
- **Secure form handling** practices
- **Privacy-focused design** for sensitive GBV-related information


‌


