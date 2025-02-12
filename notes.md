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

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

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
