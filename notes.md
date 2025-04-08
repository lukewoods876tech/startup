# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

I learned a lot about AWS. I had to setup my server twice!
I learned how to lease a domain name as well.

I learned a lot about creating an AWS Server! I actually had to do it twice haha.
I also was able to lease a domain name for my website.
git add notes.md

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

HTTPS is crucial for secure web communication, ensuring data integrity and trust for users.
Caddy simplifies enabling HTTPS with built-in support for Let's Encrypt's automated certificates.
Using vi/vim to edit configuration files is a foundational skill for managing servers.
Restarting services like Caddy applies configuration changes to keep the server updated.
Verifying and troubleshooting server setups helps ensure proper operation and secure connections.

Five things I learned:
1. The Importance of HTTPS for Web Security
2. Configuring HTTPS with Caddy and Let's Encrypt
3. I learned perseverance and the importance of asking for help when you need it
4. When you get frustrated take a deep breath and get up for a few minutes
5. I learned that learning is fun and that computers are complex but there is  always a way to victory


## HTML

Working on the fork of the codepen was a fun and interactive assignment. I got to learn how to make updates to the html code and see the changes occur live. It was a smaller scale practice of editing html code and it provided me with a good learning opportunity. 

I learned how to deploy the Simon code to a live website. I foudn this very interesting and I don't fully understand the deploy script so I would like to go back and learn how to do that better.

Through the process of building out the HTML structure for MyZoo.click, I gained a much deeper understanding of creating well-organized and semantic web pages. I learned how to properly structure a site using essential HTML elements like <header>, <nav>, <main>, and <footer> to improve accessibility and readability. Adding navigation links across multiple pages taught me the importance of ensuring seamless connectivity within a website. I also explored how to integrate placeholders for future features, like database content, WebSocket updates, and 3rd-party APIs, which showed me how to plan for scalability and interactivity. Including images and textual content allowed me to balance visual design with meaningful information, while creating a login placeholder reinforced the need for user-centric design. Overall, this exercise helped me see the importance of thoughtful HTML structure in laying the foundation for a functional, interactive, and user-friendly website.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

I implemented a comprehensive CSS structure for my MyZoo project using a modular approach. I created separate CSS files for each page while maintaining consistency through a shared base.css file. This helped me learn about:

1. CSS Variables: Used root variables for colors and common values, making it easy to maintain a consistent theme
2. Modular CSS: Created separate stylesheets for each page while using @import to share common styles
3. Flexbox Layout: Implemented responsive layouts using flex containers for the header, main content, and footer
4. Mobile-First Design: Ensured the site works well on all screen sizes
5. Form Styling: Created consistent, user-friendly forms across login and management pages
6. Table Design: Built clean, readable tables for displaying animal data

The most challenging part was balancing consistency across pages while giving each its unique style. I learned that organizing CSS into modular files makes the code more maintainable and easier to debug.

Key takeaways:
- CSS variables are powerful for maintaining consistent themes
- Modular CSS files help organize styles logically
- Flexbox is essential for responsive layouts
- Mobile-first design saves time in the long run


## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Advanced Features

I implemented several new features in my zoo application:

1. **Animal Management System**
   - Added weight tracking for each animal
   - Implemented feeding mechanism that increases animal weight
   - Created euthanization functionality for removing animals
   - Built a responsive card-based display system

2. **State Management Learnings**
   - Used React Context (ZooContext) for global state management
   - Implemented localStorage persistence for animal data
   - Learned about state immutability and proper update patterns
   - Managed complex state with multiple user interactions

3. **Component Communication**
   - Used context providers for sharing data
   - Implemented event handlers for user interactions
   - Created reusable components with props
   - Learned about component lifecycle with useEffect

4. **Key Technical Learnings**
   - State updates must be immutable
   - Context provides clean solution for global state
   - localStorage requires JSON serialization
   - React's useState and useEffect are powerful tools
   - Component reusability improves code maintenance

5. **Challenges Overcome**
   - Managing complex state updates
   - Implementing proper data persistence
   - Creating responsive design for all screen sizes
   - Handling multiple user interactions

## React Router Implementation Notes

1. **Project Setup**
   - Used Vite for project bundling and development
   - Configured vite.config.js with React plugin
   - Set up development server on port 3000

2. **Component Structure**
   - Created modular components for each major feature
   - Implemented shared components (Navigation, Footer)
   - Used CSS modules for component-specific styling

3. **Routing Implementation**
   - Wrapped app with BrowserRouter
   - Set up Routes and Route components in App.jsx
   - Implemented client-side navigation using Link components
   - Protected routes based on authentication state

4. **State Management**
   - Used localStorage for persistent login state
   - Implemented useEffect for checking authentication
   - Created state management for user sessions

5. **Navigation Flow**
   - Home page as default route
   - Login required for manage/animals pages
   - Proper redirection after login/logout
   - Consistent navigation across all pages

6. **File Organization**
   - Organized components by feature
   - Created public directory for static assets
   - Maintained consistent file structure

## Service Deliverable

In this deliverable, I focused on setting up a Node.js/Express service to support my zoo application. Here are some key things I learned:

1. **Node.js/Express Setup**:
   - I learned how to set up a basic Express server and define routes for handling HTTP requests.
   - Implementing middleware for JSON parsing and static file serving was crucial for integrating the frontend with the backend.

2. **API Endpoint Creation**:
   - I created endpoints for user registration, login, and animal management. This taught me how to handle different HTTP methods (GET, POST, PUT) and manage request/response cycles.
   - I learned the importance of structuring API endpoints to ensure they are RESTful and intuitive.

3. **Authentication and Authorization**:
   - Implementing token-based authentication using JWTs was a significant learning experience. I understood how to protect routes and ensure that only authenticated users can access certain functionalities.
   - Managing tokens in localStorage and using them in request headers was essential for maintaining user sessions.

4. **Frontend-Backend Integration**:
   - I updated React components to interact with the backend service endpoints. This involved using `fetch` for API calls and handling asynchronous operations with `async/await`.
   - I learned how to manage state updates in React based on API responses, ensuring the UI reflects the current state of the application.

5. **Error Handling**:
   - Implementing error handling both on the server and client sides was crucial. I learned how to provide meaningful error messages to users and log errors for debugging purposes.

6. **Testing and Debugging**:
   - Running the server locally and testing endpoints with tools like Postman helped me verify the functionality of my API.
   - Debugging involved checking server logs and using browser developer tools to inspect network requests.

Overall, this deliverable enhanced my understanding of full-stack development, particularly the interaction between a React frontend and an Express backend. It also highlighted the importance of secure and efficient data handling in web applications.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
Here I plan on writing plenty of notes. My next subject to learn about is markdown

```jsx
function Animals() {
  const { animals } = useContext(ZooContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || animal.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <main>
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search animals..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Animals</option>
          <option value="mammal">Mammals</option>
          <option value="bird">Birds</option>
          <option value="reptile">Reptiles</option>
        </select>
      </div>
      {/* Rest of your table code using filteredAnimals instead of animals */}
    </main>
  )
}
```

## Database Deliverable - What I Learned

### MongoDB Integration

- **Mongoose Schema Design**: I learned how to create proper schemas with Mongoose that define the structure of my data. Creating the `Animal` and `User` schemas helped me understand how to enforce data consistency.

- **MongoDB Atlas Setup**: Setting up a cloud MongoDB instance taught me about database configuration, connection strings, and environment variables for secure credential storage.

- **Data Relationships**: I implemented relationships between users and their animals, learning how MongoDB handles document references differently than SQL databases.

- **Query Operations**: Learned various MongoDB operations through Mongoose:
  - `find()` - To retrieve all animals for a user
  - `findById()` - To get specific animals
  - `findByIdAndUpdate()` - For updating animal weights when feeding
  - `findByIdAndDelete()` - For removing animals from the zoo
  - `save()` - For creating new documents

### Authentication System

- **JWT Implementation**: Learned how to create, sign, and verify JSON Web Tokens for stateless authentication.

- **Password Security**: Implemented bcrypt for secure password hashing, understanding the importance of salt rounds and why we never store plain text passwords.

- **Protected Routes**: Created middleware for protecting routes on both frontend and backend:
  - Backend: Express middleware that verifies JWT tokens
  - Frontend: React component that redirects unauthenticated users

- **LocalStorage**: Used localStorage to persist authentication state between page refreshes, but learned about its security limitations.

### React Context for Auth State

- **Context API**: Implemented a global authentication context that provides login state to all components without prop drilling.

- **useContext Hook**: Used React's useContext hook to access authentication state from any component.

- **State Management**: Learned how to manage complex application state across multiple contexts (Auth, Zoo, Notifications).

### Error Handling

- **Consistent Error Responses**: Created a standardized approach to error handling across the application.

- **Client-Side Validation**: Implemented form validation before sending data to the server.

- **Server-Side Validation**: Added validation on the server to ensure data integrity even if client validation is bypassed.

### Performance Considerations

- **Image Handling**: Learned that image uploads can significantly impact performance and require special handling.

- **Database Indexing**: Created indexes on frequently queried fields to improve performance.

- **Pagination**: Considered implementing pagination for large collections of animals (though not needed yet).

### Security Best Practices

- **Environment Variables**: Used .env files to store sensitive information like database connection strings and JWT secrets.

- **Input Sanitization**: Implemented proper validation to prevent injection attacks.

- **CORS Configuration**: Set up proper CORS policies to control which domains can access the API.

- **Token Expiration**: Added expiration times to JWTs to limit the window of opportunity for token theft.

### Challenges Overcome

- **Asynchronous Operations**: Managing multiple async operations and ensuring proper error handling was challenging.

- **State Synchronization**: Keeping the UI in sync with database changes required careful state management.

- **Authentication Flow**: Creating a smooth authentication flow with proper redirects and protected routes took several iterations to get right.

- **Image Upload**: Handling image uploads with FormData and storing/retrieving them efficiently was more complex than expected.

### WebSocket Implementation

- **WebSocket Protocol**: Learned how WebSockets provide a persistent connection between client and server, enabling real-time bidirectional communication without the overhead of HTTP requests.

- **Connection Management**: Implemented proper connection lifecycle handling including:
  - Establishing connections based on authentication state
  - Handling connection errors gracefully
  - Properly closing connections when components unmount
  - Managing a set of connected clients on the server

- **Message Broadcasting**: Created a system to broadcast messages to all connected clients, ensuring real-time updates for all users.

- **React Context for WebSockets**: Built a dedicated context provider that:
  - Manages WebSocket connection state
  - Stores message history
  - Provides connection status to components
  - Handles message sending with proper user attribution

- **Real-time UI Updates**: Implemented auto-scrolling message containers and immediate UI updates when new messages arrive.

- **User Experience Considerations**: Added visual cues for different message types (system messages, user's own messages, and other users' messages) to improve readability and user experience.

- **Security Aspects**: Tied WebSocket connections to authentication state, ensuring only authenticated users can participate in the chat.

- **Error Handling**: Implemented robust error handling for WebSocket connections, including reconnection strategies and user feedback when connections fail.

- **Performance Optimization**: Learned to efficiently manage WebSocket resources by:
  - Only establishing connections when needed
  - Properly cleaning up connections to prevent memory leaks
  - Using React's useCallback for message sending functions

- **Deployment Considerations**: Discovered the importance of proper proxy configuration for WebSockets when deploying to production environments.
