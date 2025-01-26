<<<<<<< HEAD
# MyZoo
=======
My Zoo

>>>>>>> 681c296 (Readme Update)
[My Notes](notes.md)

Imagine creating your own dream zoo from anywhere in the world! With the Virtual Zoo App, you can explore a wide variety of animals, add them to your personalized zoo, and learn fascinating facts about each species. Perfect for animal lovers, educators, and kids, this app brings the magic of the animal kingdom to your fingertips.

- [x] Reviewed Markdown

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Ever dreamed of being a zookeeper? The Virtual Zoo App lets you create, customize, and manage your own zoo. Add animals from a wide library, learn fascinating facts, and even share your zoo with friends. Built with education and entertainment in mind, the app is perfect for kids, families, and animal enthusiasts. Learn, play, and grow your dream zoo!


### Design

![Animal Browser](animalbrowser.PNG)
![Quizzes](quiz.PNG)
![Home](home.PNG)

Homepage: Features a banner, animal search bar, and "Explore Zoo" button.
Animal Browser: Displays animal cards in a grid with filters and a search option.
Zoo Dashboard: Displays the user's current zoo layout with animal cards and options to remove or view more details.
Profile Settings: Page for managing the user's account and preferences.

```mermaid
sequenceDiagram
    actor User1 as Zoo Keeper (User 1)
    actor User2 as Zoo Visitor (User 2)
    participant Server
    User1->>Server: Add Lion to Zoo
    Server-->>User1: Confirmation: Lion Added
    Server-->>User2: Notification: Lion Added to Zoo
    User2->>Server: Request Zoo Details
    Server-->>User2: Send Updated Zoo Layout
```

### Key features

- Explore a library of animals with detailed profiles (API for profiles).
- Customize your own zoo layout with drag-and-drop sections.
- Take interactive quizzes to test your animal knowledge (extra feature).
- Share your zoo and compete with friends.
- Real-time updates for animal library additions and friend activity (mario added a lion to his zoo).

### Technologies

I am going to use the required technologies in the following ways.

- **HTML**: Structure for pages like the animal browser, zoo dashboard, home, quizzes.
- **CSS**: Responsive design and animations.
- **React**: Componentized structure for animal cards, zoo layouts, quizzes, and more.
- **Web Services**: Use the [Zoo Animal API](https://zoo-animal-api.herokuapp.com/ and custom backend endpoints.
- **Authentication**: Secure login and registration with personalized experiences.
- **Database**: Store user data, zoo layouts, animal information, and quiz results.
- **WebSocket**: Real-time updates for new animals and friend activity.


## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://myzoo.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
