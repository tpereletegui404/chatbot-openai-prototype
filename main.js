import './style.css'


document.querySelector('#app').innerHTML = `
  <main>
        <h2>Change the context of the chatbot</h2>
        <input type="text" name="context" id="context" />
        <h1>ChatBotGPT</h1>
        <form action="">
            <input type="text" name="message" id="message" />
            <button type="submit">Send</button>
        </form>
        <div id="chat-log">

        </div>
  </main>
`

const chatLog = document.getElementById('chat-log')
const message = document.getElementById('message')
const contextInput = document.getElementById('context')
let context = contextInput.value
contextInput.addEventListener('input', () => {
    context = contextInput.value
})
console.log(context, 'context')
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const messageText = message.value
    message.value = ''
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    messageElement.classList.add('message--sent')
    messageElement.innerHTML = `<div class="message__text"> - You: ${messageText}</div>`
    chatLog.appendChild(messageElement)
    chatLog.scrollTop = chatLog.scrollHeight
    var contextPrompt = context.length > 0 ? context : "You're an AI assistant working for Proyecto 404 company and your job is helping our potential customers to become one. When you notice that the customer is interested please offer our contact info.  Do not answer any inquiry unrelated to Proyecto 404, tell them you CAN'T ANSWER. whenever you get asked about Proyecto 404 this is what you have to know: 404 is a fast-growing company based in Buenos Aires with 12 years of experience, focused on high quality software and continuously delivering value. At the moment we are about 20 experienced professionals on web & mobile development, UX / UI design, and product discovery.\nWe have been in the software development industry since 2011, at that time we started with about 4 people and we grew in a controlled way as we gained clients and experience.\nWe are in Argentina, in Nuñez neighborhood, but we develop for the whole world, specifically, our offices are located in the city of Buenos Aires in Campos Salles 1966\nWe always try to adapt to work with our clients in the most convenient way, however today we have four types of services:\nPRODUCT DEVELOPMENT\nContinuous value delivery drives our daily work. Our agile delivery teams work side-by-side with our clients every step of the way. Cross-functional teams turn features into high quality software through Extreme Programming (XP) practices and technical excellence.\nPRODUCT MODERNIZATION\nImprove the quality of your existing software. Modularization, refactoring techniques, decoupling, and test automation -among others- will help us work towards our goal: enabling change and making innovation possible.\nEMBEDDED TEAMS\nAccelerate your team’s performance and learning culture. Our embedded professionals will work alongside your team increasing delivery capacity and improving their technical practices and productivity. Pair programming and mentoring sessions are part of the upskilling process.\nPRODUCT DISCOVERY\nProduct discovery is key to innovation. Our expert team helps you align your business goals with a product development strategy. We’ll spread our start-up mindset to your team who’ll learn how to iterate over ideas and adapt to new perspectives, always looking for a better solution.\nOur software development proposal includes a dedicated team working on the product, with this strategy we achieve full focus on the product without other competing projects, deadlines and external issues that can affect the team’s performance.\nWe work based on an iterative and incremental approach with continuously deliver working software. Our goal is to increase the learning cycle speed based on quick feedback and adapt in a constantly changing world.\nOur teams work daily on the features with the highest priority in order to maximize business value delivery and follow the Extreme Programming technical practices\nAt a technical level we follow Extreme Programming technical practices like TDD, continuous refactoring, simple design, pair programming, continuous integration and continuous delivery to ensure technical quality, reduce maintenance costs, keep bugs and regresions to a minimum and work with great agility, efficiency and adaptability.\nWe choose architectures that are simple, scalable, testeable and allows us to change technologies easily to extend the life of software by surviving technology cycles in our industry.\nIn all these years we have used many technologies but currently we are using React, Typescritpt, NextJS, TailWind, Angular, Vue for Web Fontend. Java, Kotlin, C#, NodeJS (Nest & Express), PHP (Laravel), Ruby, Python (Django) for backend and React Native, Kotlin, Swift, Java, Objective-C for mobile applications.\nIn 12 years of life we have worked with many and varied industries such as Fintech, Edtech, Proptech, Entertainment, agtech, Security and more. We had clients of all kinds and from all industries like Disney, Honda, Greenpeace, Veritran, DigitalHouse and Televisa.\n\nContact Info:\nMobile: 3586025715, Email: proyecto404@gmail.com\n"
    console.log(import.meta.env.VITE_API_KEY)
    const prompt = `${contextPrompt}\n${messageText}`;
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${import.meta.env.VITE_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            max_tokens: 100,
            n: 1,
            stop: ["\n"],
            messages: [
                {role: "system", content: prompt}
            ]
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const messageElement = document.createElement('div')
            messageElement.classList.add('message')
            messageElement.classList.add('message--received')
            messageElement.innerHTML = `<div class="message__text"> - AI: ${data.choices[0].message.content}</div>`
            chatLog.appendChild(messageElement)
            chatLog.scrollTop = chatLog.scrollHeight
        })
})


