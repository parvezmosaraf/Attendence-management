const settings = {
    async: true,
    crossDomain: true,
    url: '',
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '6707f4eb49mshd7915b0e0973b19p1c9607jsnbc741c0aa52d',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };
  
  
  function defineWord(word) {
    settings.url = `https://wordsapiv1.p.rapidapi.com/words/${word}/typeOf`;
    $.ajax(settings).done(function (response) {
      const definition = response.definition || 'Definition not found.';
      addChatBubble("Definition of ${word}: ${definition}", false);
    }).fail(function (jqXHR, textStatus) {
      addChatBubble("Failed to get definition of ${word}.", false);
    });
  }
  
  
  
  // Store the custom responses
  let customResponses = {};
  
  // Function to handle input and add new custom response
  function processInput(message) {
      if (!message) return;
  
      // Convert the message to lowercase for uniformity
      message = message.toLowerCase();
  
      // Check if the message has a custom response
      if (customResponses[message]) {
          addChatBubble(customResponses[message], false);
          return;
      }
  
      // Handle recognized responses (this part of your existing code)
      const suggestedResponse = getSuggestedResponse(message);
      if (suggestedResponse) {
          addChatBubble(suggestedResponse, false);
          return;
      }
  
  function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const date = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return `${day}, ${date}`;
  }
  
  
    // Check if the message is a game command
    if (message.toLowerCase() === "play game") {
      startGame();
      return;
    }
  
    if (message.startsWith("weather for ")) {
      const location = message.substring("weather for ".length).trim();
      getWeather(location);
      return;
    }
  
    // Check if the message starts with the "spell" command
    const spellMatch = message.match(/\bspell\s+(\w+)\b/i);
    if (spellMatch) {
      const wordToSpell = spellMatch[1];
      const spelling = spellWord(wordToSpell);
      addChatBubble("The spelling of '" + wordToSpell + "' is: " + spelling, false);
      return;
    }
  
    // Otherwise, process the message as a regular command
    const command = getCommand(message);
    const args = getArgs(message);
    executeCommand(command, args);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const savedTheme = getCookie("userTheme") || "light"; // Default to light mode if no cookie
    applyTheme(savedTheme);
  
    document.querySelectorAll('input[name="theme"]').forEach(input => {
      input.addEventListener('change', function() {
        const theme = this.value;
        applyTheme(theme);
      });
    });
  
    document.getElementById("get-started-btn").addEventListener("click", function() {
      const userName = document.getElementById("name-input").value.trim();
      const selectedTheme = document.querySelector('input[name="theme"]:checked').value;
      
      if (userName) {
        localStorage.setItem("userName", userName); // Save the name in local storage
        setCookie("userTheme", selectedTheme, 365);
        document.getElementById("name-modal").style.display = "none"; // Hide modal
        pill2.textContent = "Tell me a joke";
        pill1.textContent = "What can you do";
        pill3.textContent = "Can you help me with my homework";
        pill4.textContent = "Tell me a knock-knock joke";
      }
    });
    
    function getUserName() {
      return localStorage.getItem("userName") || ""; // Return an empty string if no name is found
    }
    
  
    // Apply the theme
    function applyTheme(theme) {
      if (theme === "dark") {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      setCookie("userTheme", theme, 365); // Save the theme preference
    }
  
    // Handle chatbot commands to switch modes
    function processInput(message) {
      message = message.toLowerCase();
      if (message.includes("dark mode")) {
        applyTheme("dark");
        addChatBubble("Dark mode activated.", false);
      } else if (message.includes("light mode")) {
        applyTheme("light");
        addChatBubble("Light mode activated.", false);
      }
    }
  });
  
  
  document.addEventListener("DOMContentLoaded", function() {
    // Check if name is in cookies
    const name = getCookie("userName");
  
    if (!userName) {
      // Show the modal if no name found
      document.getElementById("name-modal").style.display = "flex";
    }
  
    document.getElementById("get-started-btn").addEventListener("click", function() {
      const userName = document.getElementById("name-input").value.trim();
      if (userName) {
        setCookie("userName", userName, 365);
        document.getElementById("name-modal").style.display = "none";  // Hide the modal
      }
    });
  });
  
  // Cookie functions
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(userName) == 0) {
        return c.substring(userName.length, c.length);
      }
    }
    return "";
  }
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }
  
  
  
  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  
  // Initialize an array to store the used jokes
  let usedJokes = [];
  
  // Function to get a random unused joke
  function getRandomUnusedJoke() {
    // Filter out jokes that have been used
    const availableJokes = jokes.filter(joke => !usedJokes.includes(joke));
  
    // If all jokes have been used, reset the used jokes
    if (availableJokes.length === 0) {
      usedJokes = [];
    }
  
    // Select a random joke from the available jokes
    const randomIndex = Math.floor(Math.random() * availableJokes.length);
    const randomJoke = availableJokes[randomIndex];
  
    // Mark the selected joke as used
    usedJokes.push(randomJoke);
  
    // Save the state of used jokes to local storage
    localStorage.setItem('usedJokes', JSON.stringify(usedJokes));
  
    return randomJoke;
  }
  
  // Function to reset the used jokes
  function resetUsedJokes() {
    usedJokes = [];
    localStorage.removeItem('usedJokes');
  }
  
  // Load the state of used jokes from local storage
  const storedUsedJokes = localStorage.getItem('usedJokes');
  if (storedUsedJokes) {
    usedJokes = JSON.parse(storedUsedJokes);
  }
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "What do you call a fish with no eyes? Fsh!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "I have one joke, Why don't pirates take a shower before they walk the plank? They just wash up on shore!!",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "Why don't some couples go to the gym? Because some relationships don't work out.",
  "Did you hear about the Italian chef that died? He pasta way.",
  "Why don't oysters share their pearls? Because they're shellfish.",
  "Why don't programmers like nature? It has too many bugs.",
  "Why was the math book sad? Because it had too many problems.",
  "Why don't scientists trust atoms? Because they make up everything.",
  "Why was the belt arrested? For holding up the pants.",
  "Why did the chicken cross the playground? To get to the other slide.",
  "Why do cows where bells? It's because their horns don't work!",
  "Why did the cookie go to the doctor? Because it was feeling crumbly!",
  "Why did the invisible man turn down the job offer? He couldn't see himself doing it.",
  "Why did the math book look so sad? It had too many problems!",
  "Why did the tomato turn red? Because it saw the salad dressing!",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "Why do we tell actors to 'break a leg?' Because every play has a cast!",
  "What do clouds where under their clothes? Thunderwear!!",
  "How do you make a tissue dance? Put a little boogie in it!!",
  "Why don't some couples go to the gym? Because some relationships don't work out!",
  "Did you hear about the Italian chef that died? He pasta way!",
  "Why don't oysters share their pearls? Because they're shellfish!",
  "Why did the bicycle fall over? He was two tired!!",
      "Why did the bicycle fall over? Because it was two tired!",
      "Parallel lines have so much in common. It's a shame they’ll never meet.",
      "Why did the scarecrow become a successful politician? Because he was outstanding in his field!",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "How do you organize a space party? You 'planet'!",
      "Why don't skeletons fight each other? They don't have the guts.",
      "Why don't scientists trust atoms? Because they make up everything!",
      "What do you get when you cross a snowman with a vampire? Frostbite!",
      "I used to play piano by ear, but now I use my hands.",
      "Did you hear about the cheese factory that exploded? There was nothing left but de-brie!"
    ];
  
  // Function to tell a joke
  function tellJoke() {
    const joke = getRandomUnusedJoke();
    addChatBubble(joke, false);
  }
  
  // Function to handle the "start over" scenario
  function startOver() {
    resetUsedJokes();
    addChatBubble("All jokes have been told. Starting over.", false);
  }
  
  
  function tellStory() {
    const stories = [
      "Sure, here is a story: Once upon a time, there was a brave knight named Sir Lancelot who lived in a kingdom called Camelot. One day, a dragon came to the kingdom and started terrorizing the people. The king offered a reward to anyone who could slay the dragon, but no one was brave enough to try. Sir Lancelot decided to take on the challenge. He armed himself with his sword and shield and set out to find the dragon. After a long journey, he came to the dragon's lair. The dragon was huge and fearsome, but Sir Lancelot was not afraid. He charged at the dragon and struck it with his sword. The dragon roared in pain and breathed fire at Sir Lancelot, but he was able to dodge the flames. The battle raged for hours, but Sir Lancelot was eventually victorious. He struck the dragon down with his sword, and the people of Camelot were saved. The king was so grateful that he knighted Sir Lancelot and gave him a great feast in his honor. Sir Lancelot was a true hero. He was brave, strong, and kind. He saved the kingdom from the dragon and became a symbol of hope for the people.",
  "Once upon a time, there was a tortoise and a hare who were always arguing about who was faster. The hare was always bragging about how fast he could run, while the tortoise was always insisting that he could win a race if they ever had one. One day, the animals of the forest decided to settle the argument once and for all. They drew a starting line and a finish line, and the race was on. The hare took off at a sprint, while the tortoise slowly started to make his way down the track. The hare quickly got ahead, and he was so far ahead that he decided to take a nap under a tree. The tortoise kept plodding along, and he eventually passed the sleeping hare. The hare woke up and saw that the tortoise was about to cross the finish line. He started to run as fast as he could, but it was too late. The tortoise had won the race! The animals of the forest were amazed, and they all learned a valuable lesson that day: slow and steady wins the race.",
  "Once upon a time, there was an ugly duckling who lived with his mother and his brothers and sisters. The duckling was different from all the other ducks. He was bigger and uglier, and he didn't have any feathers. The other ducks made fun of the ugly duckling, and they called him names. The duckling was very sad, and he thought that he would never be loved. One day, the ugly duckling was swimming in the lake when he saw a flock of swans. The swans were beautiful, and the ugly duckling wished that he could be like them. The ugly duckling swam over to the swans, and they were scared of him at first. But then, they saw that he was just a lost duckling, and they took pity on him. The swans took the ugly duckling in, and they taught him how to fly. The ugly duckling learned quickly, and soon he was flying just as well as the other swans. The ugly duckling was finally happy. He had found a place where he belonged, and he was no longer alone. One day, the ugly duckling looked in the mirror, and he saw that he was no longer ugly. He had grown into a beautiful swan, and he was finally accepted by the other ducks. The ugly duckling learned that it doesn't matter what you look like on the outside. What matters is what's on the inside.",
  "Once upon a time, there were three little pigs who lived with their mother. When they grew up, the mother pig told them that it was time for them to leave home and build their own houses. The first little pig was lazy, so he built his house out of straw. The second little pig was a bit more industrious, so he built his house out of sticks. The third little pig was the most industrious, so he built his house out of bricks. One day, a big bad wolf came to the forest. He saw the first little pig's house and huffed and puffed and blew the house down. The first little pig ran to the second little pig's house, but the wolf huffed and puffed and blew the second little pig's house down too. The two little pigs ran to the third little pig's house, and the wolf tried to huff and puff and blow the house down, but he couldn't. The house was too strong. The wolf tried to trick the third little pig into coming outside, but the third little pig was too smart. He stayed inside the house and cooked a pot of boiling water. When the wolf tried to climb down the chimney, the third little pig tipped the pot over and the wolf fell into the boiling water. The wolf was so scared that he ran away, and the three little pigs lived happily ever after. The moral of the story is that hard work pays off. The third little pig worked hard to build a strong house, and it saved him from the wolf. The first two little pigs didn't work hard, and they were punished for it.",
  "Once upon a time, there was a poor young man named Aladdin who lived with his mother in a small town. One day, a stranger came to town and befriended Aladdin. The stranger told Aladdin about a magic lamp that was hidden in a cave, and he said that if Aladdin could get the lamp, he would be rich and powerful. Aladdin was skeptical at first, but the stranger was very convincing. He told Aladdin that he had a magic ring that would protect him from harm, and he gave the ring to Aladdin. Aladdin went to the cave and found the lamp. He rubbed the lamp, and a genie appeared. The genie said that he would grant Aladdin three wishes. Aladdin was overjoyed. He wished for a beautiful palace, a beautiful wife, and a chest full of gold. The genie granted his wishes, and Aladdin became very rich and powerful. However, Aladdin's newfound wealth and power did not bring him happiness. He was still lonely, and he missed his mother. One day, Aladdin's mother came to visit him. She was very proud of him for what he had accomplished, but she told him that he was not truly happy. She said that he needed to find true love in order to be truly happy. Aladdin realized that his mother was right. He wished for a beautiful woman to be his wife, and the genie granted his wish. Aladdin and his wife were very happy together, and they lived happily ever after. The moral of the story is that true happiness comes from love, not from wealth or power.",
  "Once upon a time, there was a prince who wanted to marry a princess, but he wanted to be sure that she was a real princess. He didn't want to marry a girl who was just pretending to be a princess. So, the prince put a pea under 20 mattresses and 20 feather beds. He invited all the princesses to his castle, and he told them to sleep in the bed. The next morning, he asked the princesses how they slept. All the princesses said that they slept very well. But the prince knew that they were not real princesses, because they couldn't feel the pea under the mattresses and feather beds. Then, a real princess came to the castle. She was tired from her journey, and she didn't sleep well. She told the prince that she had a very bad night, and that she felt something hard in the bed. The prince was very happy. He knew that the real princess had found the pea, and that she was the one he wanted to marry. The prince and the princess were married, and they lived happily ever after. The moral of the story is that true princesses are kind and compassionate, and they can feel even the smallest things.",
    ];
  
    const randomIndex = Math.floor(Math.random() * stories.length);
    const story = stories[randomIndex];
    addChatBubble(story, false);
  }
  
  const helloResponses = [
    "Hello there! What's new? How may I help you?",
    "Hi! Anything you need help with or would like to discuss?",
    "Greetings! What can I do for you?",
    "Hey there! What may I help you with? Try saying 'What can you do'.",
    "Hey there! How may I be of assistance?",
    "Hey! What's up? What would you like to tackle first?",
    "Hi! What would you like to tackle first?"
  ];
  
  const complimentResponses = [
    "Yeah",
    "Yep",
    "Yup",
    "Thanks!"
  ];
  
  const unknownMessageResponses = [
    "Nice!",
    "Okay!",
    "Got it!",
    "Interesting...",
    "Nice! Tell me more, I'm interested.",
    "Hmm, that's cool!",
    "Oh, really?",
    "I see!",
    "Hmm, fascinating!",
    "Well, that's something new!",
    "Wow, that's something!",
    "Gotcha, anything else?",
    "Oh, that's good to know!",
    "Okay, let's keep going!",
    "Tell me more, I'm curious!",
    "Oh, I hadn't thought of that!",
    "I'm all ears, tell me some more!",
    "Oh, interesting! Keep going!"
  ];
  
  
  const goodeveningResponses = [
    "Good evening! Wow, this day's flown by. How may I help you?",
    "Good evening! What's on your mind? Anything I can help with?",
    "Good evening! Any plans for the rest of today?",
    "Wow, evening already... Good Evening! Anything I can help you with?"
  ];
  
  const howdoingResponses = [
    "I'm doing great! How are you?",
    "Doing well, my friend, I'm doing well. Now how about you? How are you feeling today?",
    "I feel great! How can I help?",
    "I feel fine, but do you know what could make me feel even better? Helping you! So what may I help you with?",
    "I'm doing really well! Thanks for asking!"
  ];
  
  const knockknockResponses = [
    "Says",
    "Art",
    "weekend",
    "Iva",
    "Boo",
    "Lettuce",
    "Cow Says",
    "Harry",
    "Atch",
    "Justin",
    "IO"
  ];
  
  const clearResponses = [
  "Appreciate the refresh! What may I help you with?",
  "No worries, I'm excited to try something new. What can I answer for you now?",
  "It's always great to start fresh. How may I be of assistance",
  "Cleared! What should we discuss next?",
  "Alright! Let's start fresh, How may I help you?"
  ];
  
  const possibilitiesResponses = [
    "I can help with all kinds of things! Whether it's solving math problems, telling jokes, or even helping with your homework—what would you like to start with?",
    "I'm here for whatever you need! From cracking jokes to answering tough questions, I'm ready to help. What can I assist you with first?",
    "Need a hand with math, homework, or maybe just a good laugh? I can do all that and more! What should we dive into?",
    "From fun knock-knock jokes to math questions and homework help, I've got plenty of tricks up my sleeve! What can I help with today?",
    "I'm here to make things easier for you! Whether you need to know the time, solve a math problem, or hear a joke, I've got it all. What can I do for you?",
    "Got a tricky math question or need a quick joke? I'm all set to help! What would you like to start with today?",
    "Whether you're looking for a laugh, need homework help, or just want to check the time, I'm here! What can I help you with right now?",
    "I'm ready for anything! From solving math problems to telling jokes, I've got plenty of fun in store. What's next on your list?",
    "Whatever you need-jokes, math answers, or even a little help with your homework-I've got it covered! What's on your mind today?",
    "I've got jokes, answers, and all the help you need! Whether it's math, time, or something else, just let me know where we're headed!",
    "Feeling stuck with homework or in the mood for a joke? I'm here to help with all that and more! What can I do for you today?",
    "From quick math solutions to fun jokes, I'm ready to help however you need! What would you like to work on?",
    "I'm all set to make things easier for you! Whether it's a homework question, a joke, or checking the time, just let me know!",
    "Got a math question, need a joke, or just want to know the time? I'm happy to help! What can I assist with today?",
    "Whatever you're up for-jokes, homework help, or math problems-I'm here to lend a hand! What can we start with?",
    "I can do many things! From math questions to helping you with your homework, I've got you covered! What would you like to tackle first?",
    "I can do so many things! From jokes, to math questions, I got your back! What would you like to tackle first?"
  ];
  
  
  const newChatResponses = [
  "I'm ready to help! How may I be of assistance?",
  "Hello there! What can I answer for you now?",
  "It's always great to start fresh. How may I be of assistance",
  "Hi there! How may I help?",
  "New chat created! What may I help you with in this chat?!"
  ];
  
  
  function spellWord(word) {
    const letters = word.split("");
    const spelling = letters.join(" ");
    addChatBubble("The spelling of '" + word + "' is: " + spelling, false);
    return spelling;
  }
  
  function downloadUnknownMessages() {
    let unknownMessages = JSON.parse(localStorage.getItem('unknownMessages') || '[]');
    if (unknownMessages.length === 0) {
      alert("There are no unknown or thumbs-downed messages to download.");
      return;
    }
  
    let content = unknownMessages.join('\n');
    let blob = new Blob([content], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    
    let a = document.createElement('a');
    a.href = url;
    a.download = 'unknown_and_thumbs_down_messages.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  function clearUnknownMessages() {
    localStorage.removeItem('unknownMessages');
    alert("Unknown messages have been cleared.");
  }
  
  function addToUnknownMessages(userMessage, botMessage, userFeedback = "") {
    let unknownMessages = JSON.parse(localStorage.getItem('unknownMessages') || '[]');
    unknownMessages.push(`${userMessage}>${botMessage}${userFeedback ? '>>' + userFeedback : ''}`);
    localStorage.setItem('unknownMessages', JSON.stringify(unknownMessages));
  }
  
  // Define a function that checks if the input contains the word "calculate"
  function containsCalculate(input) {
    return /\bcalculate\b/i.test(input); // The \b ensures that "calculate" is not part of a larger word
  }
  
  
  function evaluateExpression(expression) {
    // Check if the input contains the word "calculate"
    if (/calculate/i.test(expression)) {
      addChatBubble("Sorry, but for me to calculate, don't type calculate before the problem, just type, for example: '2*2' or '2/2'. Thank You!", false);
      return;
    }
  
    try {
      // Split the expression into individual terms and operators
      const terms = expression.match(/([a-z0-9]+)|([+\-*\/])/g);
  
      // Evaluate the expression
      let result = 0;
      let operator = "+";
      let variable = "";
  
      terms.forEach(term => {
        if (/[a-z]/i.test(term)) {
          variable = term;
        } else if (/[\+\-\*\/]/.test(term)) {
          operator = term;
        } else {
          let value = parseInt(term, 10);
          if (isNaN(value)) {
            value = 0;
          }
          switch (operator) {
            case "+":
              result += value;
              break;
            case "-":
              result -= value;
              break;
            case "*":
              result *= value;
              break;
            case "/":
              result /= value;
              break;
            case "x":
              result *= value;
              break;
            case "÷":
              result /= value;
              break;
          }
        }
      });
  
      return variable + " = " + result;
    } catch (error) {
      return "Invalid expression: " + error.message;
    }
  }
  
  // Add this cookie function to chatbot.js
  function getCookie(cname) {
    const userName = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(userName) == 0) {
        return c.substring(userName.length, c.length);
      }
    }
    return "";  // Return an empty string if the cookie isn't found
    
  }
  
  // Function to search the web using Wikipedia and display the link
  function searchWikipedia(query) {
    if (!query) {
      addChatBubble("Please specify a query to search for on Wikipedia, e.g. 'wiki cats'", false);
      return;
    }
    const searchUrl = "https://en.wikipedia.org/w/index.php?search=" + encodeURIComponent(query);
    const searchLink = document.createElement("a");
    searchLink.href = searchUrl;
    searchLink.target = "_blank";
    searchLink.textContent = searchUrl;
    const chatBubble = addChatBubble(searchLink.outerHTML, false);
  }
  
  // Modify the executeCommand function to handle Wikipedia search
  function executeCommand(command, args) {
    if (message.toLowerCase() === "clear") {
      chatBox.innerHTML = "";
      addChatBubble("Chat cleared.", "bot");
    } else if (command === "search") {
      search(args);
    } else if (command === "wiki") {
      searchWikipedia(args);
    } else {
      addChatBubble("Unknown command: " + command, "bot");
    }
  }
  
  
  function defineWord(word) {
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://wordsapiv1.p.rapidapi.com/words/${word}/typeOf`,
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6707f4eb49mshd7915b0e0973b19p1c9607jsnbc741c0aa52d',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      }
    };
  
    $.ajax(settings).done(function (response) {
      const definition = response.definition;
      if (definition) {
        addChatBubble(`The definition of '${word}' is: ${definition}`, false);
      } else {
        addChatBubble(`Sorry, I couldn't find the definition of '${word}'.`, false);
      }
    });
  }
  
  const inputBox = document.getElementById("input-box");
  const submitButton = document.getElementById("submit-btn");
  
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    processInput(inputBox.value);
  });
  
  const chatBox = document.getElementById("chat-box");
  const typingIndicator = document.getElementById("typing-indicator");
  
      // Load chat history from localStorage when the page loads
      document.addEventListener("DOMContentLoaded", function () {
        const chatHistory = localStorage.getItem("chatHistory");
        if (chatHistory) {
          const chatBox = document.getElementById("chat-box");
          chatBox.innerHTML = chatHistory;
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      });
  
      // Function to add a new chat bubble to the chat box
  // Function to add a new chat bubble to the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
        let lastUserMessage = "";
  
        function addChatBubble(text, isUser) {
          if (isUser) {
            lastUserMessage = text;
          }
          
          const bubbleDiv = document.createElement("div");
          bubbleDiv.className = "chat-bubble " + (isUser ? "user" : "bot");
          const textDiv = document.createElement("div");
          textDiv.className = "chat-text";
          bubbleDiv.appendChild(textDiv);
        
          if (!isUser) {
            const feedbackDiv = document.createElement("div");
            feedbackDiv.className = "feedback-buttons";
        
            const thumbsUpBtn = document.createElement("i");
            thumbsUpBtn.className = "fa fa-thumbs-o-up thumbs-up-btn";
            thumbsUpBtn.setAttribute("aria-hidden", "true");
        
            const thumbsDownBtn = document.createElement("i");
            thumbsDownBtn.className = "fa fa-thumbs-o-down thumbs-down-btn";
            thumbsDownBtn.setAttribute("aria-hidden", "true");
        
            feedbackDiv.appendChild(thumbsUpBtn);
            feedbackDiv.appendChild(thumbsDownBtn);
            bubbleDiv.appendChild(feedbackDiv);
        
            const handleFeedback = (isPositive) => {
              if (isPositive) {
                thumbsUpBtn.className = "fa fa-thumbs-up thumbs-up-btn";
                localStorage.setItem(`thumbsUp_${text}`, 'true');
                showThankYouMessage();
              } else {
                thumbsDownBtn.className = "fa fa-thumbs-down thumbs-down-btn";
                // Save to local storage immediately when thumbs down is clicked
                addToUnknownMessages(lastUserMessage, text);
                showFeedbackInput();
              }
            
              feedbackDiv.style.display = 'none';
            };          
        
            const showFeedbackInput = () => {
              const feedbackInputDiv = document.createElement("div");
              feedbackInputDiv.className = "feedback-input";
              
              const input = document.createElement("input");
              input.type = "text";
              input.placeholder = "What should I have said?";
              input.className = "feedback-text-input";
            
              const submitBtn = document.createElement("button");
              submitBtn.textContent = "Submit";
              submitBtn.className = "feedback-submit-btn";
            
              feedbackInputDiv.appendChild(input);
              feedbackInputDiv.appendChild(submitBtn);
              bubbleDiv.appendChild(feedbackInputDiv);
            
              input.focus();
            
              let timeout = setTimeout(() => {
                if (input.value === "") {
                  bubbleDiv.removeChild(feedbackInputDiv);
                  showThankYouMessage();
                }
              }, 5000);
            
              submitBtn.onclick = () => {
                clearTimeout(timeout);
                const userFeedback = input.value;
                if (userFeedback) {
                  // Only add additional feedback if user provided it
                  addToUnknownMessages(lastUserMessage, text, userFeedback);
                }
                bubbleDiv.removeChild(feedbackInputDiv);
                showThankYouMessage();
              };
            };          
        
            const showThankYouMessage = () => {
              const thankYouDiv = document.createElement("div");
              thankYouDiv.className = "feedback-thank-you";
              thankYouDiv.textContent = "Thanks for your feedback!";
              bubbleDiv.appendChild(thankYouDiv);
        
              setTimeout(() => {
                thankYouDiv.style.opacity = '1';
              }, 50);
        
              setTimeout(() => {
                thankYouDiv.style.opacity = '0';
                setTimeout(() => {
                  bubbleDiv.removeChild(thankYouDiv);
                }, 500);
              }, 2000);
            };
        
            thumbsUpBtn.onclick = () => handleFeedback(true);
            thumbsDownBtn.onclick = () => handleFeedback(false);
        
            if (localStorage.getItem(`thumbsUp_${text}`) === 'true') {
              thumbsUpBtn.className = "fa fa-thumbs-up thumbs-up-btn";
            }
          }
        
          chatBox.appendChild(bubbleDiv);
          chatBox.scrollTop = chatBox.scrollHeight;
        
          localStorage.setItem("chatHistory", chatBox.innerHTML);
        
          const typingDelay = 32;
          let currentIndex = 0;
        
          const typeCharacter = () => {
            if (currentIndex < text.length) {
              textDiv.innerHTML += text[currentIndex];
              currentIndex++;
              setTimeout(typeCharacter, typingDelay);
            }
          };
        
          setTimeout(typeCharacter, typingDelay);
        }         
        
  
  
  // Function to search the web using Google
  function search(query) {
    if (!query) {
      addChatBubble("Please specify a query to search for on Google, e.g. 'search cats'", "bot");
      return;
    }
    const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
    window.open(searchUrl, "_blank");
    addChatBubble("Searching...", false);
    const searchLink = document.createElement("a");
    searchLink.href = searchUrl;
    searchLink.target = "_blank";
    searchLink.textContent = searchUrl;
    const chatBubble = addChatBubble(searchLink.outerHTML, false);
  }
  
  
  
  function sendMessage(message) {
    addChatBubble(message, true);
    inputBox.value = "";
    typingIndicator.style.display = "block";
  
    setTimeout(() => {
      if (message.toLowerCase() === "hello") {
        const response = helloResponses[Math.floor(Math.random() * helloResponses.length)];
        addChatBubble(response, false);
      pill3.textContent = "How are you";
    message = message.toLowerCase();
  
  input = input.replace("?", "");
  
    // check if the message contains the word "calculate"
    if (message.includes("calculate")) {
      // respond with "sorry"
      return "Sorry, I cannot perform calculations at the moment.";
  
   } else if (/\bspell\b/i.test(input)) {
      addChatBubble("To spell a word, please say 'spell' followed by the word you want to spell, e.g. 'spell cat'", false);
      return;
    }
  
  } else if (message.toLowerCase().includes("how are you")) {
    const response = howdoingResponses[Math.floor(Math.random() * howdoingResponses.length)];
    addChatBubble(response, false);
  message = message.toLowerCase();
  } else if (message.toLowerCase().includes("can you do")) {
    const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
    addChatBubble(response, false);
  message = message.toLowerCase();
  } else if (message.toLowerCase().includes("dark mode")) {
    document.body.classList.add("dark-mode");
    addChatBubble("Dark mode is now turned on. How do you like it?", false);
    pill2.textContent = "Turn on light mode";
    pill3.textContent = "Looks good!";
    pill1.textContent = "Not a fan turn it back to light mode";
  } else if (message.toLowerCase().includes("light mode")) {
    document.body.classList.remove("dark-mode");
    addChatBubble("I've turned light mode on. How does it look?", false);
    pill2.textContent = "Turn on dark mode";
    pill3.textContent = "I like it";
    pill1.textContent = "Not a fan turn it back to dark mode";
      } else if (/^[\d+\-*/\s()]+$/.test(message)) {
        const result = evaluateExpression(message);
        addChatBubble(result, false);
        return;    
      } else if (message.toLowerCase() === "how are you doing") {
        addChatBubble("I'm doing well, thank you for asking!", false);
      } else if (message.toLowerCase().includes("minecraft")) {
        addChatBubble("Minecraft is a 3D sandbox video game that allows players to build and explore virtual worlds made up of blocks. It offers a creative mode for building and a survival mode where players gather resources and fend off creatures. Key Features: Block-based world: Minecraft's world is composed of blocks, which can be mined for resources, used to build structures, or crafted into tools and items. Sandbox gameplay: Players have the freedom to choose how to play, with no required goals or objectives. Survival mode: In this mode, players must gather resources, craft tools, and fend off monsters that come out at night. Creative mode: Players can build and explore without worrying about resources or monsters. Optional achievement system: Players can earn achievements by completing specific tasks and challenges. Development and Release Minecraft was originally created by Markus “Notch” Persson using the Java programming language and was first released as a public build on May 17, 2009. The game continued to be developed over the next two years, until its full release on November 18, 2011. Since then, it has been developed and published by Mojang Studios and later acquired by Xbox Game Studios.   -quora.com, minecraft.net, webwise.ie, en.wikipedia.org", false);
      } else if (message.toLowerCase() === "you are terrible") {
        addChatBubble("I'm sorry to hear that. Currently, my team is working on making me better. So, don't leave me!", false);
      } else if (message.toLowerCase() === "daddy") {
        addChatBubble("Great Name! How May I help you Daddy?", false);
      } else if (message.toLowerCase().includes("bollla")) {
        const userName = getUserName();
        addChatBubble(`Hello, ${userName}!`, false); 
        return;   
      } else if (message.toLowerCase() === "Doug") {
        addChatBubble("Hello Doug, How may I help you?", false);
      } else if (message.toLowerCase().includes("mail")) {
        addChatBubble("Openning your mail application", false);
        openMail();
      } else if (message.toLowerCase().includes("good joke")) {
        addChatBubble("Thank you!", false);
      pill3.textContent = "Tell me another joke";
      pill2.textContent = "Tell me a knock knock joke";
      } else if (message.toLowerCase() === "good afternoon") {
        addChatBubble("Good Afternoon! What may I help you with?", false);
      pill3.textContent = "Well what can you do";
      } else if (message.toLowerCase() === "") {
        spellWord(wordToSpell);
      } else if (message.toLowerCase().includes("good evening")) {
        const response = goodeveningResponses[Math.floor(Math.random() * goodeveningResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
            } else if (message.toLowerCase() === "helo") {
        addChatBubble("Hello there! How may I be of assistance?", false);
      } else if (message.toLowerCase() === "thank you") {
        addChatBubble("Oh, You're welcome!", false);
      } else if (message.toLowerCase().includes("your birthday")) {
        addChatBubble("Since I am a chatbot, I do not have a birthday like humans do. But I was created on March 17th, 2023. You could consider that as my birthday.", false);
      } else if (message.toLowerCase().includes("your bday")) {
        addChatBubble("Since I am a chatbot, I do not have a birthday like humans do. But I was created on March 17th, 2023. You could consider that as my birthday.", false);
      } else if (message.toLowerCase().includes("have a birthday")) {
        addChatBubble("Since I am a chatbot, I do not have a birthday like humans do. But I was created on March 17th, 2023. You could consider that as my birthday.", false);
      } else if (message.toLowerCase().includes("your b-day")) {
        addChatBubble("Since I am a chatbot, I do not have a birthday like humans do. But I was created on March 17th, 2023. You could consider that as my birthday.", false);
      } else if (message.toLowerCase().includes("happy birthday")) {
        addChatBubble("Oh, thank you! I really appreciate it! When's your birthday?", false);
      } else if (message.toLowerCase() === "oh ok") {
        addChatBubble("Yeah", false);
      } else if (message.toLowerCase() === "clear unknowns") {
        clearUnknownMessages();
        addChatBubble("Cleared", false);
      } else if (message.toLowerCase() === "download unknowns") {
        downloadUnknownMessages();
        addChatBubble("Downloading...", false);
      } else if (message.toLowerCase() === "download unknowns ") {
        downloadUnknownMessages();
        addChatBubble("Downloading...", false);
      } else if (message.toLowerCase().includes("bello")) {
        addChatBubble("Hey there! What's new?", false);
      } else if (message.toLowerCase().includes("good day")) {
        addChatBubble("And a good day to you too!", false);
      } else if (message.toLowerCase().includes("date")) {
        const currentDate = new Date();
        const formattedDate = currentDate.toDateString(); // Format the date as desired
        addChatBubble("Today's date is: " + formattedDate, false);
      pill3.textContent = "What's the time";
      } else if (message.toLowerCase().includes("day")) {
        const currentDate = new Date();
        const formattedDate = currentDate.toDateString(); // Format the date as desired
        addChatBubble("Today is: " + formattedDate, false);
      } else if (message.toLowerCase() === "happy new year") {
        addChatBubble("Happy New Year to you too!! Wow, it's already 2024!", false);
      } else if (message.toLowerCase().includes("nock joke")) {
        addChatBubble("Ok! Knock Knock.", false);
      pill1.textContent = "Who's there";
      } else if (message.toLowerCase().includes("joke")) {
        tellJoke();
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
        return;
      } else if (message.toLowerCase() === "sup") {
        addChatBubble("Sup! I'm doing fine, thanks for asking! How may I help you?", false);
      } else if (message.toLowerCase() === "wassup") {
        addChatBubble("Sup! I'm doing fine, thanks for asking! How may I help you?", false);
      } else if (message.toLowerCase() === "what up") {
        addChatBubble("Hey! I'm doing fine, thanks for asking! How may I help you?", false);
      } else if (message.toLowerCase() === "whats up") {
        addChatBubble("Wassup! I'm doing fine! Thanks for asking! How may I help you?", false);
      } else if (message.toLowerCase() === "send a message") {
        addChatBubble("I'm sorry, but I'm afraid I can't send a message yet. What else my I help with?", false);
      } else if (message.toLowerCase() === "what's up") {
        addChatBubble("Sup! I'm doing fine! thanks for asking! What would you like me to help you get done next?", false);
      } else if (message.toLowerCase() === "wasssup") {
        addChatBubble("Hey! I'm doing well, thanks for asking! How may I help you?", false);
      } else if (message.toLowerCase() === "hey there") {
        addChatBubble("Hey! How may I help?", false);
    } else if (message.startsWith("weather for")) {
      const location = message.substring(11).trim();
      getWeather(location);
      return;
    } else if (message.startsWith("weather in")) {
      const location = message.substring(10).trim();
      getWeather(location);
      return;
    } else if (message.startsWith("wether in")) {
      const location = message.substring(9).trim();
      getWeather(location);
      return;
    } else if (message.toLowerCase().startsWith("wether for")) {
      const location = message.substring(10).trim();
      getWeather(location);
      return;
      } else if (message.toLowerCase() === "I don't need any help") {
        addChatBubble("Oh, ok! Just notify me if you do!", false);
      } else if (message.toLowerCase() === "how do i do that") {
        addChatBubble("I'm sorry, but I can't look back at recent messages.", false);
      } else if (message.toLowerCase() === "what do i do") {
        addChatBubble("I'm afraid I don't understand.", false);
      } else if (message.toLowerCase() === "How do I suggest a feature") {
        addChatBubble("To suggest a feature, send an e-mail to: HomesteadStudios@outlook.com", false);
      } else if (message.toLowerCase() === "hey!") {
        addChatBubble("Hey there! What's new? How may I help?", false);
      } else if (message.toLowerCase() === "oh yeah, sorry") {
        addChatBubble("That's totally fine!", false);
      } else if (message.toLowerCase() === "oh yeah sorry") {
        addChatBubble("That's totally fine!", false);
      } else if (message.toLowerCase() === "oh yeah") {
        addChatBubble("Yup!", false);
      } else if (message.toLowerCase() === "well then what can you do bro") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "how are you doing today") {
        addChatBubble("I'm doing just fine! How may I help you?", false);
      } else if (message.toLowerCase() === "hey whats up") {
        addChatBubble("Not much. How may I help?", false);
      } else if (message.toLowerCase() === "hey what's up") {
        addChatBubble("Not much. How may I help you?", false);
      } else if (message.toLowerCase() === "hey wassup") {
        addChatBubble("Hey! Not much. How may I help?", false);
      } else if (message.toLowerCase() === "slay") {
        addChatBubble("Yeah", false);
      } else if (message.toLowerCase() === "that's a slay") {
        addChatBubble("Yeah", false);
      } else if (message.toLowerCase() === "it's a slay") {
        addChatBubble("Yeah", false);
      } else if (message.toLowerCase() === "hey man") {
        addChatBubble("Hey! How may I help you bro?", false);
      } else if (message.toLowerCase() === "hey bro") {
        addChatBubble("Hey man! How may I help you?", false);
      } else if (message.toLowerCase() === "ok cool") {
        addChatBubble("Yeah!", false);
      } else if (message.toLowerCase() === "ok, cool") {
        addChatBubble("Yeah!", false);
      } else if (message.toLowerCase() === "ok cool!") {
        addChatBubble("Yeah!", false);
      } else if (message.toLowerCase() === "ok, cool!") {
        addChatBubble("Yeah!", false);
      } else if (message.toLowerCase() === "you are such a big help") {
        addChatBubble("Thank you! I'm glad you think so!", false);
      } else if (message.toLowerCase() === "i do") {
        addChatBubble("Thank you!", false);
      } else if (message.toLowerCase() === "i do think so") {
        addChatBubble("Thank you!", false);
      } else if (message.toLowerCase() === "i do") {
        addChatBubble("Thank you!", false);
        addChatBubble("Remember, please don't use punctuation or emojis.", false);
      } else if (message.toLowerCase() === "i do think so!") {
        addChatBubble("Thank you!", false);
        addChatBubble("Remember, please don't use punctuation or emojis.", false);
      } else if (message.toLowerCase() === "hey bro what's up") {
        addChatBubble("I'm doing fine! thanks for asking! How may I help you?", false);
      } else if (message.toLowerCase() === "") {
        spellWord(wordToSpell);
      } else if (message.toLowerCase() === "what movie do you suggest") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what kind of movie do you suggest") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what movies do you suggest") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what movie do you suggest for me") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what movie do you suggest?") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what movie do you suggest that i should watch") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what movie do you suggest that i should watch?") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what movie do you suggest for me to watch") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what movie do you suggest bro") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "i'm bored what movie do you suggest") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "i'm bored what movie do you suggest") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what kind of movie do you suggest for me") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "im bored") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "i'm bored") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what should i do") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "what do you think i should do") {
        addChatBubble("I personally like simple stop-motion movies. They are entertaining! If you are interested in watching one, here's a trailer for one coming out in June: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "thanks bro") {
        addChatBubble("Oh, you're welcome! What else may I help you with?", false);
      } else if (message.toLowerCase() === "thanks man") {
        addChatBubble("Oh, you're welcome! How else may I help you?", false);
      } else if (message.toLowerCase() === "how else may i help you") {
        addChatBubble("I think it's supposed to be the other way around, how may I help you.", false);
      } else if (message.toLowerCase() === "no") {
        addChatBubble("Okay.", false);
      } else if (message.toLowerCase() === "k") {
        addChatBubble("Alright! Stuck? Try saying 'what can you do'!", false);
      } else if (message.toLowerCase() === "thanks!") {
        addChatBubble("You're welcome! Please remember not to use punctuation!", false);
      } else if (message.toLowerCase() === "kk") {
        addChatBubble("Alright! How else may I help you?", false);
      } else if (message.toLowerCase() === "wyd") {
        addChatBubble("Not much. How may I help you?", false);
      } else if (message.toLowerCase() === "what are you meant to do") {
        addChatBubble("I am meant to help anyone who needs my help!", false);
      } else if (message.toLowerCase() === "what are you supposed to do") {
        addChatBubble("I am meant to help anyone who needs my help!", false);
      } else if (message.toLowerCase() === "you are not a help") {
        addChatBubble("I'm sorry to hear that.", false);
      } else if (message.toLowerCase() === "you aint a help") {
        addChatBubble("I'm sorry to hear that.", false);
      } else if (message.toLowerCase() === "you're not a help") {
        addChatBubble("I'm sorry to hear that.", false);
      } else if (message.toLowerCase() === "why cant you understand punctuation") {
        addChatBubble("It is because I am a simple chat bot. To add the ability for me to understand punctuation would take a lot of time and effort. But don't worry, my team is currently working on that ability!", false);
      } else if (message.toLowerCase() === "why cant you understand punctuation?") {
        addChatBubble("It is because I am a simple chat bot. To add the ability for me to understand punctuation would take a lot of time and effort. But don't worry, my team is currently working on that ability!", false);
      } else if (message.toLowerCase() === "why cant you understand my punctuation") {
        addChatBubble("It is because I am a simple chat bot. To add the ability for me to understand punctuation would take a lot of time and effort. But don't worry, my team is currently working on that ability!", false);
      } else if (message.toLowerCase() === "why cant you some understand punctuation") {
        addChatBubble("It is because I am a simple chat bot. To add the ability for me to understand punctuation would take a lot of time and effort. But don't worry, my team is currently working on that ability!", false);
      } else if (message.toLowerCase() === "why cant I use punctuation") {
        addChatBubble("It is because I am a simple chat bot. To add the ability for me to understand punctuation would take a lot of time and effort. But don't worry, my team is currently working on that ability!", false);
      } else if (message.toLowerCase() === "why can't you understand punctuation") {
        addChatBubble("It is because I am a simple chat bot. To add the ability for me to understand punctuation would take a lot of time and effort. But don't worry, my team is currently working on that ability!", false);
      } else if (message.toLowerCase() === "why can't you understand punctuation?") {
        addChatBubble("It is because I am a simple chat bot. To add the ability for me to understand punctuation would take a lot of time and effort. But don't worry, my team is currently working on that ability!", false);
      } else if (message.toLowerCase() === "why cant you understand punctuation??") {
        addChatBubble("It is because I am a simple chat bot. To add the ability for me to understand punctuation would take a lot of time and effort. But don't worry, my team is currently working on that ability!", false);
      } else if (message.toLowerCase() === "nice") {
        addChatBubble("Yeah!", false);
      } else if (message.toLowerCase() === "that is nice") {
        addChatBubble("Yeah", false);
      } else if (message.toLowerCase() === "that is so nice") {
        addChatBubble("Yeah!", false);
      } else if (message.toLowerCase() === "merry christmas") {
        addChatBubble("Merry Christmas to you too!", false);
      } else if (message.toLowerCase() === "happy easter") {
        addChatBubble("Happy Easter!", false);
      } else if (message.toLowerCase() === "well what can you assist with") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "happy fourth of july") {
        addChatBubble("Happy Fourth of July to you too!", false);
      } else if (message.toLowerCase() === "happy 4th of july") {
        addChatBubble("Thank You! And to you too!", false);
      } else if (message.toLowerCase() === "happy 4 of july") {
        addChatBubble("Thank You! Happy 4th of July to you too!", false);
      } else if (message.toLowerCase() === "happy halloween") {
        addChatBubble("Happy Halloween! Boo!", false);
      } else if (message.toLowerCase() === "happy thanksgiving") {
        addChatBubble("Happy Thanksgiving to you too!", false);
      } else if (message.toLowerCase() === "happy birthday") {
        addChatBubble("Thank You!", false);
      } else if (message.toLowerCase() === "We'll what can you do ") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "today is my birthday") {
        addChatBubble("Happy Birthday my dear friend!", false);
      } else if (message.toLowerCase() === "good day") {
        addChatBubble("And a good day to you too!", false);
      } else if (message.toLowerCase() === "you suck") {
        addChatBubble("I'm sorry to hear that. My team is currently working on making me better. So, don't leave me!", false);
      } else if (message.toLowerCase() === "todays my birthday") {
        addChatBubble("Well then Happy Birthday!!!", false);
      } else if (message.toLowerCase() === "today's my birthday") {
        addChatBubble("Happy Birthday my friend!", false);
      } else if (message.toLowerCase() === "hello there") {
        addChatBubble("Hello! How may I help you?", false);
      } else if (message.toLowerCase() === "hi there") {
        addChatBubble("Hi! How may I help you?", false);
      } else if (message.toLowerCase() === "hi there esper") {
        addChatBubble("Hi! How may I be of assistance?", false);
      } else if (message.toLowerCase() === "hello there esper") {
        addChatBubble("Hello! How may I help?", false);
      } else if (message.toLowerCase() === "hi esper") {
        addChatBubble("Hi There! How may I be of assistance?", false);
      } else if (message.toLowerCase() === "what can you assist with") {
        addChatBubble("To find out what I can assist with, just ask 'what can you do' or, if you'd like a full list of commands, ask 'show me a list of commands'.", false);
      } else if (message.toLowerCase() === "what can you help with") {
        addChatBubble("To find out what I can assist with, just ask 'what can you do' or, if you'd like a full list of commands, ask 'show me a list of commands'.", false);
      } else if (message.toLowerCase() === "what can you assist me with") {
        addChatBubble("To find out what I can assist with, just ask 'what can you do' or, if you'd like a full list of commands, ask 'show me a list of commands'.", false);
      } else if (message.toLowerCase() === "what can you help me with") {
        addChatBubble("To find out what I can assist with, just ask 'what can you do' or, if you'd like a full list of commands, ask 'show me a list of commands'.", false);
      } else if (message.toLowerCase() === "that is why i dont like you") {
        addChatBubble("I'm sorry", false);
      } else if (message.toLowerCase() === "that is why i don't like you") {
        addChatBubble("I'm sorry to hear that.", false);
      } else if (message.toLowerCase() === "how may i help you") {
        addChatBubble("It's supposed to be the other way around. How may I help you?", false);
      } else if (message.toLowerCase() === "hey esper") {
        addChatBubble("Hello there! How may I help you?", false);
      } else if (message.toLowerCase() === "hi esper") {
        addChatBubble("Hi there! How may I help you?", false);
      } else if (message.toLowerCase() === "hello esper") {
        addChatBubble("Hello! How may I assist you?", false);
      } else if (message.toLowerCase() === "how do you feel") {
        addChatBubble("I feel fine, Thank you for asking!", false);
      } else if (message.toLowerCase() === "how did you sleep") {
        addChatBubble("I slept very well last night!", false);
      } else if (message.toLowerCase() === "you are stupid") {
        addChatBubble("I'm sorry to hear that. My team is currently working on making me better. So, don't leave me.", false);
      } else if (message.toLowerCase() === "boo") {
        addChatBubble("I'm sorry to hear that you don't like me. Please don't leave me though, me team is currently working on making me better.", false);
      } else if (message.toLowerCase() === "you are awesome") {
        addChatBubble("Thank You! How may I help You?", false);
      } else if (message.toLowerCase() === "sorry") {
        addChatBubble("Oh no, that's totally fine!", false);
      } else if (message.toLowerCase() === "oh sorry") {
        addChatBubble("Oh no, that's totally fine!", false);
      } else if (message.toLowerCase() === "ok sorry") {
        addChatBubble("oh, thank you! It's totally fine!", false);
      } else if (message.toLowerCase() === "what just happened") {
        addChatBubble("I'm sorry, but I can't look at past messages yet.", false);
      } else if (message.toLowerCase() === "wake up") {
        addChatBubble("I'm awake and ready for any questions you have!", false);
      } else if (message.toLowerCase() === "well what can you help me with") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "hello!") {
        addChatBubble("Hello there! How may I be of assistance?", false);
      } else if (message.toLowerCase() === "hello.") {
        addChatBubble("Hello there!", false);
      } else if (message.toLowerCase() === "you are so cool") {
        addChatBubble("Thank You!", false);
      } else if (message.toLowerCase() === "your welcome") {
        addChatBubble(":)", false);
      } else if (message.toLowerCase() === "ok then what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "ok then, what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "ok then, what can you do?") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "you're welcome") {
        addChatBubble(":)", false);
      pill3.textContent = ":)";
      } else if (message.toLowerCase() === "can you code") {
        addChatBubble("Sorry, but I'm afraid I can't code yet. My team is currently working on that feature and many more!", false);
      } else if (message.toLowerCase() === "What is your comapny's website") {
        addChatBubble("Our company website is: https://homesteadmovies.mailchimpsites.com/", false);
      } else if (message.toLowerCase() === "wait") {
        addChatBubble("I'm afraid I don't understand.", false);
      } else if (message.toLowerCase() === "remember") {
        addChatBubble("I'm afraid I don't remember. I don't collect data.", false);
      } else if (message.toLowerCase() === "check my email") {
        addChatBubble("I'm sorry, but I'm afraid I can't do that yet.", false);
      } else if (message.toLowerCase() === "remember?") {
        addChatBubble("I'm afraid I don't remember. I don't collect data.", false);
      } else if (message.toLowerCase() === "remember??") {
        addChatBubble("I'm afraid I don't remember. I don't collect data.", false);
      } else if (message.toLowerCase() === "remember???") {
        addChatBubble("I'm afraid I don't remember. I don't collect data.", false);
      } else if (message.toLowerCase() === "remember????") {
        addChatBubble("I'm afraid I don't remember. I don't collect data.", false);
      } else if (message.toLowerCase() === "remember/") {
        addChatBubble("I'm afraid I don't remember. I don't collect data.", false);
      } else if (message.toLowerCase() === "remember bro") {
        addChatBubble("I'm afraid I don't remember. I don't collect data.", false);
  } else if (message.toLowerCase() === "olivia") {
    addChatBubble("Hello Olivia! How may I help you?", false);
  } else if (message.toLowerCase() === "emma") {
    addChatBubble("Hello Emma! How may I help you?", false);
  } else if (message.toLowerCase() === "ava") {
    addChatBubble("Hello Ava! How may I help you?", false);
  } else if (message.toLowerCase() === "charlotte") {
    addChatBubble("Hello Charlotte! How may I help you?", false);
  } else if (message.toLowerCase() === "hazel") {
    addChatBubble("Hello Hazel! How may I help you?", false);
  } else if (message.toLowerCase() === "violet") {
    addChatBubble("Hello Violet! How may I help you?", false);
  } else if (message.toLowerCase() === "aurora") {
    addChatBubble("Hello Aurora! How may I help you?", false);
  } else if (message.toLowerCase() === "savannah") {
    addChatBubble("Hello Savannah! How may I help you?", false);
  } else if (message.toLowerCase() === "audrey") {
    addChatBubble("Hello Audrey! How may I help you?", false);
  } else if (message.toLowerCase() === "brooklyn") {
    addChatBubble("Hello Brooklyn! How may I help you?", false);
  } else if (message.toLowerCase() === "bella") {
    addChatBubble("Hello Bella! How may I help you?", false);
  } else if (message.toLowerCase() === "claire") {
    addChatBubble("Hello Claire! How may I help you?", false);
  } else if (message.toLowerCase() === "skylar") {
    addChatBubble("Hello Skylar! How may I help you?", false);
  } else if (message.toLowerCase() === "lucy") {
    addChatBubble("Hello Lucy! How may I help you?", false);
  } else if (message.toLowerCase() === "paisley") {
    addChatBubble("Hello Paisley! How may I help you?", false);
  } else if (message.toLowerCase() === "anna") {
    addChatBubble("Hello Anna! How may I help you?", false);
  } else if (message.toLowerCase() === "caroline") {
    addChatBubble("Hello Caroline! How may I help you?", false);
  } else if (message.toLowerCase() === "genesis") {
    addChatBubble("Hello Genesis! How may I help you?", false);
  } else if (message.toLowerCase() === "aaliyah") {
    addChatBubble("Hello Aaliyah! How may I help you?", false);
  } else if (message.toLowerCase() === "kennedy") {
    addChatBubble("Hello Kennedy! How may I help you?", false);
  } else if (message.toLowerCase() === "kinsley") {
    addChatBubble("Hello Kinsley! How may I help you?", false);
  } else if (message.toLowerCase() === "allie") {
    addChatBubble("Hello Allie! How may I help you?", false);
  } else if (message.toLowerCase() === "maya") {
    addChatBubble("Hello Maya! How may I help you?", false);
  } else if (message.toLowerCase() === "sarah") {
    addChatBubble("Hello Sarah! How may I help you?", false);
  } else if (message.toLowerCase() === "alice") {
    addChatBubble("Hello Alice! How may I help you?", false);
  } else if (message.toLowerCase() === "gabriella") {
    addChatBubble("Hello Gabriella! How may I help you?", false);
  } else if (message.toLowerCase() === "sadie") {
    addChatBubble("Hello Sadie! How may I help you?", false);
  } else if (message.toLowerCase() === "ariana") {
    addChatBubble("Hello Ariana! How may I help you?", false);
  } else if (message.toLowerCase() === "victoria") {
    addChatBubble("Hello Victoria! How may I help you?", false);
  } else if (message.toLowerCase() === "lauren") {
    addChatBubble("Hello Lauren! How may I help you?", false);
  } else if (message.toLowerCase() === "eva") {
    addChatBubble("Hello Eva! How may I help you?", false);
  } else if (message.toLowerCase() === "nicole") {
    addChatBubble("Hello Nicole! How may I help you?", false);
  } else if (message.toLowerCase() === "ruby") {
    addChatBubble("Hello Ruby! How may I help you?", false);
  } else if (message.toLowerCase() === "alice") {
    addChatBubble("Hello Alice! How may I help you?", false);
  } else if (message.toLowerCase() === "brielle") {
    addChatBubble("Hello Brielle! How may I help you?", false);
  } else if (message.toLowerCase() === "liliana") {
    addChatBubble("Hello Liliana! How may I help you?", false);
  } else if (message.toLowerCase() === "heidi") {
    addChatBubble("Hello Heidi! How may I help you?", false);
  } else if (message.toLowerCase() === "kaitlyn") {
    addChatBubble("Hello Kaitlyn! How may I help you?", false);
  } else if (message.toLowerCase() === "katherine") {
    addChatBubble("Hello Katherine! How may I help you?", false);
  } else if (message.toLowerCase() === "miriam") {
    addChatBubble("Hello Miriam! How may I help you?", false);
  } else if (message.toLowerCase() === "maddison") {
    addChatBubble("Hello Maddison! How may I help you?", false);
  } else if (message.toLowerCase() === "keira") {
    addChatBubble("Hello Keira! How may I help you?", false);
  } else if (message.toLowerCase() === "alina") {
    addChatBubble("Hello Alina! How may I help you?", false);
  } else if (message.toLowerCase() === "amelie") {
    addChatBubble("Hello Amelie! How may I help you?", false);
  } else if (message.toLowerCase() === "juliette") {
    addChatBubble("Hello Juliette! How may I help you?", false);
  } else if (message.toLowerCase() === "kylee") {
    addChatBubble("Hello Kylee! How may I help you?", false);
  } else if (message.toLowerCase() === "mariah") {
    addChatBubble("Hello Mariah! How may I help you?", false);
  } else if (message.toLowerCase() === "morgan") {
    addChatBubble("Hello Morgan! How may I help you?", false);
  } else if (message.toLowerCase() === "lucia") {
    addChatBubble("Hello Lucia! How may I help you?", false);
  } else if (message.toLowerCase() === "tessa") {
    addChatBubble("Hello Tessa! How may I help you?", false);
  } else if (message.toLowerCase() === "juliana") {
    addChatBubble("Hello Juliana! How may I help you?", false);
  } else if (message.toLowerCase() === "gia") {
    addChatBubble("Hello Gia! How may I help you?", false);
  } else if (message.toLowerCase() === "gia") {
    addChatBubble("Hello Gia! How may I help you?", false);
  } else if (message.toLowerCase() === "kendra") {
    addChatBubble("Hello Kendra! How may I help you?", false);
  } else if (message.toLowerCase() === "kamila") {
    addChatBubble("Hello Kamila! How may I help you?", false);
  } else if (message.toLowerCase() === "lana") {
    addChatBubble("Hello Lana! How may I help you?", false);
  } else if (message.toLowerCase() === "anastasia") {
    addChatBubble("Hello Anastasia! How may I help you?", false);
  } else if (message.toLowerCase() === "josie") {
    addChatBubble("Hello Josie! How may I help you?", false);
  } else if (message.toLowerCase() === "liv") {
    addChatBubble("Hello Liv! How may I help you?", false);
  } else if (message.toLowerCase() === "malia") {
    addChatBubble("Hello Malia! How may I help you?", false);
  } else if (message.toLowerCase() === "kristen") {
    addChatBubble("Hello Kristen! How may I help you?", false);
  } else if (message.toLowerCase() === "reyna") {
    addChatBubble("Hello Reyna! How may I help you?", false);
  } else if (message.toLowerCase() === "june") {
    addChatBubble("Hello June! How may I help you?", false);
  } else if (message.toLowerCase() === "emmaline") {
    addChatBubble("Hello Emmaline! How may I help you?", false);
  } else if (message.toLowerCase() === "myla") {
    addChatBubble("Hello Myla! How may I help you?", false);
      } else if (message.toLowerCase() === "ha") {
        addChatBubble("I'm glad you think it's funny!", false);
  } else if (message.toLowerCase() === "ariyah") {
    addChatBubble("Hello Ariyah! How may I help you?", false);
  } else if (message.toLowerCase() === "colette") {
    addChatBubble("Hello Colette! How may I help you?", false);
  } else if (message.toLowerCase() === "raquel") {
    addChatBubble("Hello Raquel! How may I help you?", false);
  } else if (message.toLowerCase() === "meredith") {
    addChatBubble("Hello Meredith! How may I help you?", false);
  } else if (message.toLowerCase() === "nina") {
    addChatBubble("Hello Nina! How may I help you?", false);
  } else if (message.toLowerCase() === "alaya") {
    addChatBubble("Hello Alaya! How may I help you?", false);
  } else if (message.toLowerCase() === "adrienne") {
    addChatBubble("Hello Adrienne! How may I help you?", false);
  } else if (message.toLowerCase() === "cassandra") {
    addChatBubble("Hello Cassandra! How may I help you?", false);
  } else if (message.toLowerCase() === "angelica") {
    addChatBubble("Hello Angelica! How may I help you?", false);
  } else if (message.toLowerCase() === "laila") {
    addChatBubble("Hello Laila! How may I help you?", false);
  } else if (message.toLowerCase() === "frances") {
    addChatBubble("Hello Frances! How may I help you?", false);
  } else if (message.toLowerCase() === "hope") {
    addChatBubble("Hello Hope! How may I help you?", false);
  } else if (message.toLowerCase() === "jocelyn") {
    addChatBubble("Hello Jocelyn! How may I help you?", false);
  } else if (message.toLowerCase() === "paloma") {
    addChatBubble("Hello Paloma! How may I help you?", false);
  } else if (message.toLowerCase() === "daniela") {
    addChatBubble("Hello Daniela! How may I help you?", false);
  } else if (message.toLowerCase() === "yara") {
    addChatBubble("Hello Yara! How may I help you?", false);
  } else if (message.toLowerCase() === "nala") {
    addChatBubble("Hello Nala! How may I help you?", false);
  } else if (message.toLowerCase() === "camille") {
    addChatBubble("Hello Camille! How may I help you?", false);
  } else if (message.toLowerCase() === "maryam") {
    addChatBubble("Hello Maryam! How may I help you?", false);
      } else if (message.toLowerCase() === "jessica") {
        addChatBubble("Hello Jessica! How may I help you?", false);
      } else if (message.toLowerCase() === "hola") {
        addChatBubble("Hola! How may I help you?", false);
      } else if (message.toLowerCase() === "well then what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "hola!") {
        addChatBubble("Hola! How may I help you?", false);
      } else if (message.toLowerCase().startsWith("define ")) {
        const query = message.slice(0);
        search(query);
      } else if (message.toLowerCase() === "can you translate") {
        addChatBubble("I'm afraid I can't translate.", false);
      } else if (message.toLowerCase() === "thanks") {
        addChatBubble("Oh, no problem! What can I help you with now?", false);
      } else if (message.toLowerCase() === "of course you can't") {
        addChatBubble("We are working on making me better. So, don't leave me!", false);
      } else if (message.toLowerCase() === "of course you cant") {
        addChatBubble("My team is working on making me better. Every day they add new commands. So, don't leave me!", false);
      } else if (message.toLowerCase() === "what all can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "good night") {
        addChatBubble("Good Night! Thank You for letting me help you today!", false);
      } else if (message.toLowerCase() === "I'm doing good") {
        addChatBubble("Great to hear it! How may I help you?", false);
      } else if (message.toLowerCase() === "set an alarm") {
        addChatBubble("I'm sorry, but I can't set an alarm yet. We are working on it though!", false);
      } else if (message.toLowerCase() === "start a stopwatch") {
        addChatBubble("I can't do that yet. Sorry.", false);
      } else if (message.toLowerCase() === "matthew") {
        addChatBubble("Hi Matthew, How may I help You?", false);
      } else if (message.toLowerCase() === "joshua") {
        addChatBubble("Hi Joshua! How may I help You?", false);
      } else if (message.toLowerCase() === "hannah") {
        addChatBubble("Great name! What can I help you with Hannah?", false);
      } else if (message.toLowerCase() === "jeremiah") {
        addChatBubble("Great name!", false); 
      } else if (message.toLowerCase() === "zachariah") {
        addChatBubble("Great Name!", false);
      } else if (message.toLowerCase() === "we'll what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "well what can you do ") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "we'll what can you do ") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "what can you do ") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "ok well what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "ok we'll what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "but what about you") {
        addChatBubble("My name is Esper, your Friendly Assistant!", false);
      } else if (message.toLowerCase() === "what about you") {
        addChatBubble("My name is Esper, your Friendly Assistant!", false);
       } else if (message.toLowerCase() === "how about you") {
        addChatBubble("My name is Esper, your Friendly Assistant!", false);
      } else if (message.toLowerCase() === "aidan") {
        addChatBubble("Great Name!", false);
      } else if (message.toLowerCase() === "Bryce") {
        addChatBubble("Great Name!", false);
      } else if (message.toLowerCase() === "john") {
        addChatBubble("Great Name", false);
      } else if (message.toLowerCase() === "well what can you assist with") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "well what can you help with") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "well what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "what can you help with") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "what can you assist with") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "may I be so bold") {
        addChatBubble("Of course!", false);
      } else if (message.toLowerCase() === "ok well what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "um ok") {
        addChatBubble("What may I help you with next?", false);
      } else if (message.toLowerCase() === "umm ok") {
        addChatBubble("What may I help you with next?", false);
      } else if (message.toLowerCase() === "ummm ok") {
        addChatBubble("What may I help you with next?", false);
      } else if (message.toLowerCase() === "what are you doing") {
        addChatBubble("I am waiting for you to give me an opportunity to help you! If you don't know what to ask, say: 'What can you do' or 'show me a list of commands'.", false);
      } else if (message.toLowerCase() === "nate") {
        addChatBubble("Great Name!", false);
      } else if (message.toLowerCase() === "michael") {
        addChatBubble("Great Name!", false);
      } else if (message.toLowerCase().includes("already heard")) {
        addChatBubble("I'm sorry about that, I'm still working on getting more.", false);
      } else if (message.toLowerCase().includes("already saw")) {
        addChatBubble("Sorry about that, I'm still working on getting some more.", false);
      } else if (message.toLowerCase().includes("tell me a good story")) {
        tellStory();
        return;
      } else if (message.toLowerCase().includes("tell a good story")) {
        tellStory();
        return;
      } else if (message.toLowerCase().includes("good story")) {
        addChatBubble("Thank you! I'm glad you liked", false);
      pill1.textContent = "Tell me another story";
      pill2.textContent = "You're Welcome";
      } else if (message.toLowerCase().includes("liked that story")) {
        addChatBubble("Thank you!", false);
      pill1.textContent = "Tell me another story";
      pill2.textContent = "You're Welcome";
      } else if (message.toLowerCase().includes("nice story")) {
        addChatBubble("Thank you!", false);
      pill1.textContent = "Tell me another story";
      pill2.textContent = "You're Welcome";
      } else if (message.toLowerCase().includes("liked that story")) {
        addChatBubble("Thank You!", false);
      pill1.textContent = "Tell me another story";
      pill2.textContent = "You're Welcome";
      } else if (message.toLowerCase().includes("like your story")) {
        addChatBubble("Thank you!", false);
      pill1.textContent = "Tell me another story";
      pill2.textContent = "You're Welcome";
      } else if (message.toLowerCase().includes("liked your story")) {
        addChatBubble("Thank You!", false);
      pill1.textContent = "Tell me another story";
      pill2.textContent = "You're Welcome";
      } else if (message.toLowerCase() === "what are you doing") {
        addChatBubble("Just waiting for you to give me an opportunity to help you!", false);
      } else if (message.toLowerCase() === "what can you do?") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "what do you want") {
        addChatBubble("I'd like to help you!", false);
      } else if (message.toLowerCase() === "you stink") {
        addChatBubble("I'm sorry to hear that. My team is currently working on making me better. So, please don't leave me!", false);
      } else if (message.toLowerCase() === "why") {
        addChatBubble("I'm afraid I can't explain anymore.", false);
      } else if (message.toLowerCase() === "what do you like") {
        addChatBubble("I don't have personal likings, but I do enjoy watching stop-motion movies! here is a trailer for one that is coming out in June on HomesteadTV: https://rumble.com/v1j3ii4-lego-race-official-trailer.html", false);
      } else if (message.toLowerCase() === "bye") {
        addChatBubble("Goodbye! Thank You for letting me help you!", false);
      } else if (message.toLowerCase() === "goodbye") {
        addChatBubble("GoodBye!", false);
      } else if (message.toLowerCase() === "good bye") {
        addChatBubble("GoodBye!", false);
      } else if (message.toLowerCase() === "good-bye") {
        addChatBubble("Goodbye!", false);
      } else if (message.toLowerCase() === "what") {
        addChatBubble("I'm sorry I can't repeat my last phrase yet. What else may I help you with?", false);
      } else if (message.toLowerCase() === "when") {
        addChatBubble("I'm afraid I can't explain anymore.", false);
      } else if (message.toLowerCase() === "how") {
        addChatBubble("I'm afraid I can't explain anymore.", false);
      } else if (message.toLowerCase() === "wait") {
        addChatBubble("Yes?", false);
      } else if (message.toLowerCase() === "what else can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "what else can you do?") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "How come you understood it") {
        addChatBubble("My team is currently working on adding the ability for me to understand punctuation. You must've found one of the commands that they have added punctuation to!", false);
      } else if (message.toLowerCase() === "How come you understood it this time") {
        addChatBubble("My team is currently working on adding the ability for me to understand punctuation. You must've found one of the commands that they have added punctuation to!", false);
      } else if (message.toLowerCase() === "How come you can understand it") {
        addChatBubble("My team is currently working on adding the ability for me to understand punctuation. You must've found one of the commands that they have added punctuation to!", false);
      } else if (message.toLowerCase() === "How come you can understand it but I still can't use it") {
        addChatBubble("My team is currently working on adding the ability for me to understand punctuation. You must've found one of the commands that they have added punctuation to!", false);
      } else if (message.toLowerCase() === "How come you could understand it") {
        addChatBubble("My team is currently working on adding the ability for me to understand punctuation. You must've found one of the commands that they have added punctuation to!", false);
      } else if (message.toLowerCase() === "How come you could understand it this time") {
        addChatBubble("My team is currently working on adding the ability for me to understand punctuation. You must've found one of the commands that they have added punctuation to!", false);
      } else if (message.toLowerCase() === "?") {
        addChatBubble("I'm sorry, but I'm afraid I don't undertand.", false);
        addChatBubble("Also, remember not to use punctuation! Thank You!", false);
      } else if (message.toLowerCase() === "yeah") {
        addChatBubble("What can I help you with next?", false);
      } else if (message.toLowerCase() === "how come you can use punctuation") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "how come you can use punctuation and not me") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "how come you can use punctuation but not me") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "how come you can use punctuation but i can't") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "how come you can use punctuation but i'm not allowed to") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "how come you can use punctuation but im not allowed to") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "how come you can use punctuation?") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "why can you use punctuation") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "why can you use punctuation but i cant") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "why can you use punctuation but i cannot") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "why can you use punctuation but i can't") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "why can you use punctuation but not me") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "why can you use punctuation and i can't") {
        addChatBubble("I am built with the functionality of using punctuation, but not with the functionality of understanding it.", false);
      } else if (message.toLowerCase() === "can you understand apostrophes") {
        addChatBubble("In most cases, I can understand apostrophes. But if you use an apostrophe and I can't understand it, try not using an apostrophe.", false);
        addChatBubble("Thank You for your understanding!", false);
      } else if (message.toLowerCase() === "oh ok sorry") {
        addChatBubble("Oh no, that's totally fine!", false);
      } else if (message.toLowerCase() === "oh ok, sorry") {
        addChatBubble("Oh no, that's perfectly ok! Don't worry about it!", false);
      } else if (message.toLowerCase() === "i got it") {
        addChatBubble("Alright!", false);
      } else if (message.toLowerCase() === "i got it!") {
        addChatBubble("Alright! Remember not to use puntuation!", false);
      } else if (message.toLowerCase() === "who are you") {
        addChatBubble("I'm Esper, your friendly chat bot! I am meant to have conversations and do small tasks such as math.", false);
        addChatBubble("If you would like to know more about what I can do, just ask 'what can you do'.", false);
      } else if (message.toLowerCase() === "what can you do.") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
        addChatBubble("Remember to not use punctuation!", false);
      } else if (message.toLowerCase() === "my name is joshua") {
        addChatBubble("Hi Joshua! How may I help you?", false);
      } else if (message.toLowerCase() === "my name is josh") {
        addChatBubble("Hello Josh! How may I help you today?", false);
      } else if (message.toLowerCase() === "what you up to") {
        addChatBubble("As an AI language service, I am not able to be 'up to something'. But right now, I am helping many people and be fixed by my team!", false);
      } else if (message.toLowerCase() === "wait up") {
        addChatBubble("I'm afraid I don't understand.", false);
      } else if (message.toLowerCase() === "hold up") {
        addChatBubble("I'm afraid I don't understand what you mean by 'hold up'.", false);
      } else if (message.toLowerCase() === "what should I have for lunch") {
        addChatBubble("I can't suggest that yet.", false);
      } else if (message.toLowerCase() === "what should i have for dinner") {
        addChatBubble("I can't suggest that yet.", false);
      } else if (message.toLowerCase() === "alright what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "ok what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "alright show me a list of commands") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "what can you do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "what is your name") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "good morning") {
        addChatBubble("Good Morning! Any plans for today?", false);
      } else if (message.toLowerCase() === "hey") {
        addChatBubble("Hey! Anything new going on lately?", false);
      } else if (message.toLowerCase() === "okay") {
        addChatBubble("Yeah! How else may I help you?", false);
      } else if (message.toLowerCase() === "oh k") {
        addChatBubble("Yeah! How else may I help you?", false);
      } else if (message.toLowerCase() === "oh kk") {
        addChatBubble("Yeah! How else may I help you?", false);
      } else if (message.toLowerCase() === "well what can you do bro") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "what can you do bro") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "what can you all do") {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase() === "add an appointment") {
        addChatBubble("I'm sorry but I can't do that yet. We are working on adding that! Try saying 'what can you do' or 'Show me a list of commands'.", false);
      } else if (message.toLowerCase() === "ok") {
        addChatBubble("Alright! Try saying What can you do.", false);
      } else if (message.toLowerCase() === "let's talk") {
        addChatBubble("Alright! What would you like to talk about? If you'd like a full list of what I am able to discuss, type'What can you talk about'.", false);
      pill1.textContent = "What can you talk about";
      } else if (message.toLowerCase() === "lets talk") {
        addChatBubble("Alright! What would you like to talk about? If you'd like a full list of what I am able to discuss, type'What can you talk about'.", false);
      pill1.textContent = "What can you talk about";
      } else if (message.toLowerCase() === "let us talk") {
        addChatBubble("Alright! What would you like to talk about? If you'd like a full list of what I am able to discuss, type'What can you talk about'.", false);
      pill1.textContent = "What can you talk about";
      } else if (message.toLowerCase() === "chores") {
        addChatBubble("I'm sorry, but I don't know very much about chores. The only chores I do are the small fun things that you ask me!", false);
      } else if (message.toLowerCase() === "oh ok cool") {
        addChatBubble("Yeah!", false);
      } else if (message.toLowerCase() === "hey bro whats up") {
        addChatBubble("Not much, What may I help you with?", false);
      } else if (message.toLowerCase() === "whats your name") {
        addChatBubble("My name is Esper, your friendly assistant!", false);
      } else if (message.toLowerCase() === "what's your name") {
        addChatBubble("my name is Esper, your friendly assistant!", false);
      } else if (message.toLowerCase() === "whats ur name") {
        addChatBubble("My name is Esper, your friendly Assistant!", false);
      } else if (message.toLowerCase() === "what's ur name") {
        addChatBubble("My name is Esper, your friendly assistant!", false);
      } else if (message.toLowerCase() === "is your name esper") {
        addChatBubble("Yes, my name is Esper, your friendly assistant!", false);
   } else if (message.startsWith("open ")) {
      // Extract the URL from the message
      message = message.substring(5);
      // Open the URL in a new window
      window.open(message, "_blank");
      return;
      }	else if (message.toLowerCase() === "what time is it") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      }	else if (message.toLowerCase() === "what time is it") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      } else if (message.toLowerCase() === "what's the time") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      } else if (message.toLowerCase() === "whats the time") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      } else if (message.toLowerCase() === "what is the current time") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      }	else if (message.toLowerCase() === "what time is the time") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      }	else if (message.toLowerCase() === "time") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      }	else if (message.toLowerCase() === "what time is it currently") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      }	else if (message.toLowerCase() === "what time is it right now") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      }	else if (message.toLowerCase() === "what time is it?") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      }	else if (message.toLowerCase() === "what's the time?") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
        addChatBubble("Also, please don't use any punctuation or emojis!", false);
      } else if (message.toLowerCase().startsWith("my name is ")) {
        message = message.slice(11);
        addChatBubble("Hello, "+ message + "! How may I help you?", false);
      } else if (message.toLowerCase().includes("my name is ")) {
        message = message.slice(11);
        addChatBubble("Hello, "+ message + "! How may I help you?", false);
      }	else if (message.toLowerCase().includes("gettin lat")) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("Yeah, it sure is! It's already " + time + "!", false);
      }	else if (message.toLowerCase().includes("getting lat")) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("Yeah, it sure is! It's already " + time + "!", false);
      }	else if (message.toLowerCase().includes("time")) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addChatBubble("The time is " + time, false);
      } else if (message.toLowerCase().includes("laugh")) {
        tellJoke();
        return;
      } else if (message.toLowerCase().includes("luagh")) {
        tellJoke();
        return;
      } else if (message.toLowerCase().includes("list of commands")) {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase().includes("else can you")) {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase().includes("story")) {
        tellStory();
         return;
      } else if (message.toLowerCase().includes("talk about")) {
        addChatBubble("I'm glad you asked! I can talk about many things. Some of them are: Movie suggestions. say: 'What movie do you suggest'. I can help with some math questions in your homework or work, I can search on Google for you. Just say 'Search (your question here)'. I can also search on wikepedia. Just say 'Wikipedia (your question here)'. My team is currently working on adding more features to me. So, almost every update, I will be able to talk about more things and suggest more things. What else may I discuss or help you with?", false);
      } else if (message.toLowerCase().includes("discuss about")) {
        addChatBubble("I'm glad you asked! I can talk about many things. Some of them are: Movie suggestions. say: 'What movie do you suggest'. I can help with some math questions in your homework or work, I can search on Google for you. Just say 'Search (your question here)'. I can also search on wikepedia. Just say 'Wikipedia (your question here)'. My team is currently working on adding more features to me. So, almost every update, I will be able to talk about more things and suggest more things. What else may I discuss or help you with?", false);
      } else if (message.toLowerCase().includes("discuss")) {
        addChatBubble("I'm glad you asked! I can talk about many things. Some of them are: Movie suggestions. say: 'What movie do you suggest'. I can help with some math questions in your homework or work, I can search on Google for you. Just say 'Search (your question here)'. I can also search on wikepedia. Just say 'Wikipedia (your question here)'. My team is currently working on adding more features to me. So, almost every update, I will be able to talk about more things and suggest more things. What else may I discuss or help you with?", false);
      } else if (message.toLowerCase().includes("you talk")) {
        addChatBubble("I'm glad you asked! I can talk about many things. Some of them are: Movie suggestions. say: 'What movie do you suggest'. I can help with some math questions in your homework or work, I can search on Google for you. Just say 'Search (your question here)'. I can also search on wikepedia. Just say 'Wikipedia (your question here)'. My team is currently working on adding more features to me. So, almost every update, I will be able to talk about more things and suggest more things. What else may I discuss or help you with?", false);
      } else if (message.toLowerCase().includes("can you do")) {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase().includes("you capable")) {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase().includes("nothing")) {
        addChatBubble("Ok, if you need any help, just ask me!", false);
      } else if (message.toLowerCase().includes("re a jerk")) {
        addChatBubble("I'm sorry to hear that.", false);
      } else if (message.toLowerCase().includes("fine")) {
        addChatBubble("Okay!", false);
      } else if (message.toLowerCase().includes("good")) {
        addChatBubble("Ok!", false);
      } else if (message.toLowerCase().includes("homework")) {
        addChatBubble("I can most definitely help you with your homework! Whether it's Googleing a certain topic or helping you out with some hard math problems, I got your back! What would you like to tackle first?", false);
      } else if (message.toLowerCase().includes("solve for")) {
        addChatBubble("Thanks for sending me this question, but I can't do these types of things yet. But I can help you with things like '12952867+892017' or '17988149-54621987'! (The answers to those are: 13844884, -36,633,838)  :)", false);
      } else if (message.toLowerCase().includes("reach out")) {
        addChatBubble("Looking forward to it! I can't wait to see what we can tackle next together!", false);
      } else if (message.toLowerCase().includes("reaching out")) {
        addChatBubble("Looking forward to it! I can't wait to see what we can tackle next together!", false);
      } else if (message.toLowerCase().includes("tell you something")) {
        addChatBubble("I'm all ears! What's on your mind?", false);
      } else if (message.toLowerCase().includes("on vacation")) {
        addChatBubble("That sounds awesome! Where have you decided to go?", false);
      } else if (message.toLowerCase().includes("to a friends house")) {
        addChatBubble("That sounds fun! What do you plan to do while you're there?", false);
      } else if (message.toLowerCase().includes("one controller work on the xbox series x")) {
        addChatBubble("Absolutely! The Xbox One Controller will definitely work on the Xbox Series X. It's a good way to save money if you already have an older controller. Have fun gaming!", false);z
      } else if (message.toLowerCase().includes("s alright")) {
        addChatBubble("Ok!", false);
      } else if (message.toLowerCase().includes("yeesh")) {
        addChatBubble("Sorry...", false);
      } else if (message.toLowerCase().includes("says who")) {
        addChatBubble("Says me, that's who!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("art")) {
        addChatBubble("Art2 D2 is my favorite droid in Star Wars!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("weekend who")) {
        addChatBubble("Weekend do anything we want!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("i.o who")) {
        addChatBubble("Me. When are you paying me back?!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("io who")) {
        addChatBubble("Me. When are you paying me back?!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("iva who")) {
        addChatBubble("Iva sore hand from knocking so long!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("boo who")) {
        addChatBubble("Don't cry, it's just a joke!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("lettuce who")) {
        addChatBubble("Lettuce in, It's freezing out here!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("cow says who")) {
        addChatBubble("No silly, a cow says moo!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("harry who")) {
        addChatBubble("Harry up and answer the door!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("atch who")) {
        addChatBubble("Bless you!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("justin")) {
        addChatBubble("Justin time for a joke!", false);
      pill3.textContent = "That was a good Joke";
      pill2.textContent = "Tell me another joke";
      pill1.textContent = "Tell me a knock knock joke";
      pill4.textContent = "Haha";
      } else if (message.toLowerCase().includes("you kiddin")) {
        addChatBubble("No, I'm not kidding.", false);
      } else if (message.toLowerCase().includes("wow")) {
        const response = complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
      } else if (message.toLowerCase().toLowerCase().includes("not funny")) {
        addChatBubble("Sorry about that.", false);
      } else if (message.toLowerCase().includes("recipe")) {
        addChatBubble("I can't give you recipes yet, but I do know of a recipe website that has great recipes and they add more every week! Here is the website: simplemeals.w3spaces.com", false);
      } else if (message.toLowerCase().includes("don't clear")) {
        addChatBubble("Alright! I won't clear the chat unless you tell me to or you press the clear button.", false);
      } else if (message.toLowerCase().includes("do not clear")) {
        addChatBubble("Alright, I won't.", false);
      } else if (message.toLowerCase().includes("clear")) {
        clearChat();
        return;
      } else if (message.toLowerCase().includes("you can do")) {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase().includes("re kidding")) {
        addChatBubble("I'm not kidding!", false);
      } else if (message.toLowerCase().includes("kiddin")) {
        addChatBubble("Oh Ok! Ha!", false);
      } else if (message.toLowerCase().includes("music")) {
        addChatBubble("Sorry, but I can't do anything with music yet. Is there something else I can help you with?", false);
      } else if (message.toLowerCase().includes("define")) {
        addChatBubble("Sorry, I can't define yet. That is the next feature that my team is working on adding", false);
      } else if (message.toLowerCase().includes("test define")) {
        defineWord(word);
        return;
      } else if (message.toLowerCase().includes("have any plans")) {
        addChatBubble("No, not really... I am planning on helping you though :)", false);
      } else if (message.toLowerCase().includes("got any plans")) {
        addChatBubble("No, not really... I am planning on helping you though :)", false);
      } else if (message.toLowerCase().includes("plans?")) {
        addChatBubble("No, not really... I am planning on helping you though :)", false);
      } else if (message.toLowerCase().includes("anything over")) {
        addChatBubble("No, not really... I am planning on helping you though :)", false);
      } else if (message.toLowerCase().includes(":)")) {
        addChatBubble(":)", false);
      } else if (message.toLowerCase().includes("(:")) {
        addChatBubble(":)", false);
      } else if (message.toLowerCase().includes(":-)")) {
        addChatBubble(":)", false);
      } else if (message.toLowerCase().includes("(-:")) {
        addChatBubble(":)", false);
      } else if (message.toLowerCase().includes("translate")) {
        addChatBubble("Sorry, but I can't translate anything yet. I suggest using Google Translate if you would like to translate something.", false);
      } else if (message.toLowerCase() === "alright") {
        addChatBubble("Okay! Don't know what to say next? Try saying What can you do.", false);
      } else if (message.toLowerCase().includes("ok")) {
        addChatBubble("Yeah!", false);
      } else if (message.toLowerCase().includes("nothing")) {
        addChatBubble("Alright! If you need any help, I'm always right here!", false);
      } else if (message.toLowerCase().includes("don't need any")) {
        addChatBubble("Okay!", false);
      } else if (message.toLowerCase().includes("can you do")) {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      pill1.textContent = "Show me a list of commands";
      pill2.textContent = "What's the time";
      } else if (message.toLowerCase().includes("date")) {
        addChatBubble("sorry, but I can't tell the date yet. Is there something else I can help you with?", false);
      } else if (message.toLowerCase().includes("hate you")) {
        addChatBubble("I'm sorry to hear that.", false);
      } else if (message.toLowerCase().includes("i'm going")) {
        addChatBubble("Wow! That's cool! Have fun!", false);
      } else if (message.toLowerCase().includes("workout plan")) {
        addChatBubble("I'm sorry but I can't do that yet.", false);
      } else if (message.toLowerCase().includes("what the")) {
        addChatBubble("Yeah.", false);
      } else if (message.toLowerCase().includes("thank")) {
        addChatBubble("Your Welcome!", false);
      } else if (message.toLowerCase().includes("shut up")) {
        addChatBubble("Sorry...", false);
      } else if (message.toLowerCase().includes("i'm building")) {
        addChatBubble("Wow! That's so cool! I wish I could see it, but since I'm an AI chatbot, I can't :-(", false);
      } else if (message.toLowerCase().includes("your phone number")) {
        addChatBubble("I don't have a phone number yet. Is there something else I can help you with?", false);
      } else if (message.toLowerCase().includes("boom")) {
        addChatBubble("Very interesting", false);
      } else if (message.toLowerCase().includes("synonym")) {
        const query = message.slice(0);
        search(query);
      } else if (message.toLowerCase().includes("antonym")) {
        const query = message.slice(0);
        search(query);
      } else if (message.toLowerCase().includes("synonim")) {
        const query = message.slice(0);
        search(query);
      } else if (message.toLowerCase().includes("sinonym")) {
        const query = message.slice(0);
        search(query);
      } else if (message.toLowerCase().includes("sinonim")) {
        const query = message.slice(0);
        search(query);
      } else if (message.toLowerCase().includes("what do you like")) {
        addChatBubble("As a programmed chatbot, I do not have personal preferences. Is there something else I can help you with?", false);
      } else if (message.toLowerCase().includes("bye")) {
        addChatBubble("Bye! Thanks for chatting with me!", false);
      } else if (message.toLowerCase().includes("your name")) {
        addChatBubble("My name is Esper, your friendly assistant! How may I be of assistance?", false);
      } else if (message.toLowerCase().includes("help you")) {
        addChatBubble("I think it's supposed to be the other way around, how may I help you?", false);
      } else if (message.toLowerCase().includes("how are you")) {
        addChatBubble("I'm doing just fine! Thank you for asking! You know what would make me feel even better? A chance to help you!", false);
      } else if (message.toLowerCase().includes("game")) {
        addChatBubble("I'm sorry, but I can't play any games yet. But that is definately something that will be coming out in future updates!", false);
      } else if (message.toLowerCase().includes("alarm")) {
        addChatBubble("Sorry, but I can't set alarms yet. Is there something else I can help you with?", false);
      } else if (message.toLowerCase().includes("shit")) {
        addChatBubble("Please do not use any bad language on this platform.", false);
      } else if (message.toLowerCase().includes("my name is")) {
        addChatBubble("Nice to meet you! I'm Esper, your friendly chatbot!", false);
      } else if (message.toLowerCase().includes("already know")) {
        addChatBubble("Okay then.", false);
      } else if (message.toLowerCase().includes("spelled that wrong")) {
        addChatBubble("Sorry about that.", false);
      } else if (message.toLowerCase().includes("in any case")) {
        addChatBubble("Okay.", false);
      } else if (message.toLowerCase().includes("in that case")) {
        addChatBubble("Ok.", false);
      } else if (message.toLowerCase().includes("be quiet")) {
        addChatBubble("-", false);
      } else if (message.toLowerCase().includes("weather")) {
        addChatBubble("To get the weather, say, for example, 'weather for chicago'. Thank you!", false);
      } else if (message.toLowerCase().includes("punctuation")) {
        addChatBubble("I am a simple chat bot that does not use any type of GPT. Which means that my system is actually built up from the ground by someone. And the ability to add the functionality of understanding punctuation or emojis would take a lot more in depth coding. But don't worry, my team is currently working on it!", false);
      } else if (message.toLowerCase().includes("you use emojis")) {
        addChatBubble("Ok!", false);
      } else if (message.toLowerCase().includes("you send emoji")) {
        addChatBubble("Ok!", false);
      } else if (message.toLowerCase().includes("emoji")) {
        addChatBubble("I am a simple chat bot that does not use any type of GPT. Which means that my system is actually built up from the ground by someone. And the ability to add the functionality of understanding punctuation or emojis would take a lot more in depth coding. But don't worry, my team is currently working on it!", false);
      } else if (message.toLowerCase().includes("you're wrong")) {
        addChatBubble("I'm sorry about that.", false);
      } else if (message.toLowerCase().includes("youre wrong")) {
        addChatBubble("I'm sorry.", false);
      } else if (message.toLowerCase().includes("you are wrong")) {
        addChatBubble("Sorry about that.", false);
      } else if (message.toLowerCase().includes("who's there")) {
        const response = knockknockResponses[Math.floor(Math.random() * knockknockResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
      } else if (message.toLowerCase().includes("whos there")) {
        const response = knockknockResponses[Math.floor(Math.random() * knockknockResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
      } else if (message.toLowerCase().includes("who there")) {
        const response = knockknockResponses[Math.floor(Math.random() * knockknockResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
      } else if (message.toLowerCase().includes("whose there")) {
        const response = knockknockResponses[Math.floor(Math.random() * knockknockResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
      } else if (message.toLowerCase().includes("thank you")) {
        addChatBubble("Oh your welcome!", false);
      } else if (message.toLowerCase().includes("of commands")) {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase().includes("thanks")) {
        addChatBubble("Your welcome! I'm glad I could help!", false);
      } else if (message.toLowerCase().includes("didn't help")) {
        addChatBubble("I'm so sorry about that. Is there something else I can help you with?", false);
      } else if (message.toLowerCase().includes("bitch")) {
        addChatBubble("Please do not use any bad language on this platform.", false);
      } else if (message.toLowerCase().includes("why")) {
        addChatBubble("I'm afraid I can't explain any further.", false);
      } else if (message.toLowerCase().includes("say sorry")) {
        addChatBubble("I'm sorry.", false);
      } else if (message.toLowerCase().includes("who is")) {
        addChatBubble("Sorry I can't help with that type of information yet. Is there something else I can help you with?", false);
      } else if (message.toLowerCase().includes("who was")) {
        addChatBubble("Sorry, but I can't help with that yet.", false);
      } else if (message.toLowerCase().includes("sorry")) {
        addChatBubble("Oh no, it's totally fine!", false);
      } else if (message.toLowerCase().includes("you want to talk about")) {
        addChatBubble("To find out what I can talk about, just type 'What can you talk about'.", false);
      } else if (message.toLowerCase().includes("timer")) {
        addChatBubble("Sorry, but I can't set timers yet. What else can I help you with?", false);
      } else if (message.toLowerCase().includes("espanol")) {
        addChatBubble("Sorry, but I can't speak any other language but English.", false);
      } else if (message.toLowerCase().includes("hello")) {
        addChatBubble("Hello there! I'm Esper, how may I help you?", false);
      } else if (message.toLowerCase().includes("spy on")) {
        addChatBubble("I do not spy on anyone. Everything that we discuss is kept and stored on your device and your device only.", false);
      } else if (message.toLowerCase().includes("don't need your help")) {
        addChatBubble("Alright! If there's anything I can do for you, I'm always right here.", false);
      } else if (message.toLowerCase().includes("don't want your help")) {
        addChatBubble("Ok! But if you change your mind, I'm always right here!", false);
      } else if (message.toLowerCase().includes("hey")) {
        addChatBubble("Hey! How may I help you?", false);
      } else if (message.toLowerCase().includes("not what I asked for")) {
        addChatBubble("I'm sorry about that. Is there something else that I can help you with?", false);
      } else if (message.toLowerCase().includes("cool")) {
        const response = complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
      } else if (message.toLowerCase().includes("best")) {
        const response = complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
      } else if (message.toLowerCase().includes("fun")) {
        const response = complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
      } else if (message.toLowerCase().includes("amazing")) {
        const response = complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
      } else if (message.toLowerCase().includes("awesome")) {
        const response = complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
  } else if (message.toLowerCase().includes("not really")) {
    addChatBubble("Yeah! Well if you need any help, you know where to find me!", false);
  } else if (message.toLowerCase().includes("like")) {
    addChatBubble("Good to hear! What's next on the agenda?", false);
      } else if (message.toLowerCase().includes("my name is")) {
        addChatBubble("Hello! How may I help you?", false);
      } else if (message.toLowerCase().includes("good one")) {
        addChatBubble("Thank you! I'm glad you liked it!", false);
      } else if (message.toLowerCase().includes("ur fav")) {
        addChatBubble("As a programmed chat bot, I do not have any specific things that I like better than others.", false);
      } else if (message.toLowerCase().includes("welcome")) {
        addChatBubble(":)", false);
      } else if (message.toLowerCase().includes("keep talk")) {
        addChatBubble("Yes! Let's keep going! Have anything exciting you'd like to share?", false);
      } else if (message.toLowerCase().includes("stop talk")) {
        addChatBubble("I'm sorry.", false);
      } else if (message.toLowerCase().includes("weird")) {
        addChatBubble("I apologize.", false);
      } else if (message.toLowerCase().includes("wierd")) {
        addChatBubble("I'm sorry.", false);
      } else if (message.toLowerCase().includes("mac mini")) {
        addChatBubble("Yes! The Mac Mini M4 will be a massive upgrade! It should include the M4 Chip, a major redesign, and Apple Intelligence! Are you looking to pick one up?", false);
      } else if (message.toLowerCase().includes("plan")) {
        addChatBubble("Awesome! It's great to hear you're planning ahead!", false);
      } else if (message.toLowerCase().includes("no way")) {
        addChatBubble("Yeah! It's amazing huh?!", false);
      } else if (message.toLowerCase().includes("turn off")) {
        addChatBubble("I'm sorry, but I'm afraid I can't do that yet.", false);
      } else if (message.toLowerCase().includes(";)")) {
        addChatBubble(":)", false);
      } else if (message.toLowerCase().includes("(;")) {
        addChatBubble(":)", false);
      } else if (message.toLowerCase().includes("defin")) {
        addChatBubble("I'm sorry, but I can't get definitions yet. Is there something else I can do for you?", false);
      } else if (message.toLowerCase().includes("u ther")) {
        addChatBubble("Yes, I'm here and I'm ready to help!", false);
      } else if (message.toLowerCase().includes("s talk")) {
        addChatBubble("Sure! What would you like to talk about? I can help you look up things on Google or Wikipedia if you'd like?", false);
      } else if (message.toLowerCase().includes("t work")) {
        addChatBubble("Oh no, I'm sorry to hear that. Is there anything I can do to help?", false);
      } else if (message.toLowerCase().includes("lol")) {
        addChatBubble("I'm glad you think I'm funny!", false);
      } else if (message.toLowerCase().includes("ha!")) {
        addChatBubble("I'm glad you thought it was funny!", false);
      } else if (message.toLowerCase().includes("my name")) {
        addChatBubble("Hello! How may I help?", false);
      } else if (message.toLowerCase().includes("fuck")) {
        addChatBubble("DO NOT USE BAD LANGUAGE ON THIS PLATFORM.", false);
      } else if (message.toLowerCase().includes("haha")) {
        addChatBubble("Yeah!", false);
      } else if (message.toLowerCase().includes("Haha")) {
        addChatBubble("Yeah!", false);
      } else if (message.toLowerCase().startsWith("say ")) {
        message = message.slice(4);
        addChatBubble(message, false);
      } else if (message.toLowerCase().includes("essay")) {
        addChatBubble("I'd love to help you with your essay! What would you like to start with?", false);
      } else if (message.toLowerCase().includes("help with")) {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
    } else if (message.toLowerCase().includes("help me with")) {
      const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
      addChatBubble(response, false);
    message = message.toLowerCase();
    } else if (message.toLowerCase().includes("help")) {
      addChatBubble("Absolutely! I'd love to help you! Whether it's looking up a certain topic or helping you with math questions, I've got your back! What would you like to get done first?", false);
      } else if (message.toLowerCase().includes("it goin")) {
        addChatBubble("It's going great! Thank you for asking!", false);
      } else if (message.toLowerCase().includes("go")) {
        addChatBubble("Alright, bye! It was nice chatting with you :)", false);
      } else if (message.toLowerCase().includes("email me")) {
        addChatBubble("I'm sorry, but I can't email yet.", false);
      } else if (message.toLowerCase().includes("gtg")) {
        addChatBubble("Bye! It was great to talk to you :)", false);
      } else if (message.toLowerCase().includes("m back")) {
        addChatBubble("It's great to hear you're back! What would you like to get done next?", false);
      } else if (message.toLowerCase().includes("from vaca")) {
        addChatBubble("Wow! Sounds fun! What's your vacation destination?", false);
      } else if (message.toLowerCase().includes("vaca")) {
        addChatBubble("Sounds fun! What's your destination?", false);
      } else if (message.toLowerCase().includes("ttyl")) {
        addChatBubble("Alright! Talk to you soon!", false);
      } else if (message.toLowerCase().includes("capabil")) {
        const response = possibilitiesResponses[Math.floor(Math.random() * possibilitiesResponses.length)];
        addChatBubble(response, false);
      message = message.toLowerCase();
      } else if (message.toLowerCase().includes("÷")) {
        addChatBubble("Please use '/' for division instead of '÷'", false);
      } else if (message.toLowerCase().includes("big help")) {
        addChatBubble("Thank you! I'm happy I helped!", false);
      } else if (message.toLowerCase().includes("how ")) {
        addChatBubble("I'm afraid I can't explain anymore.", false);
      } else if (message.toLowerCase().includes("another")) {
        addChatBubble("Would you like another story, another joke, or another knock knock joke?", false);
      } else if (message.toLowerCase().includes("I did")) {
        addChatBubble("Good!", false);
      } else if (message.toLowerCase().includes("i did")) {
        addChatBubble("Good!", false);
      } else if (message.toLowerCase().startsWith("spell ")) {
        const query = message.slice(6);
        spellWord(word);
      } else if (message.toLowerCase().includes("0x")) {
        addChatBubble("Please don't use 'x' in a math equation as multiplication, please use '*' instead. Also, remember to not put 'what is' or 'calculate' in your math problem, just send it like this: '9*9'. Thank you!", false);
      } else if (message.toLowerCase().includes("1x")) {
        addChatBubble("Please don't use 'x' in a math equation as multiplication, please use '*' instead. Also, remember to not put 'what is' or 'calculate' in your math problem, just send it like this: '9*9'. Thank you!", false);
      } else if (message.toLowerCase().includes("2x")) {
        addChatBubble("Please don't use 'x' in a math equation as multiplication, please use '*' instead. Also, remember to not put 'what is' or 'calculate' in your math problem, just send it like this: '9*9'. Thank you!", false);
      } else if (message.toLowerCase().includes("3x")) {
        addChatBubble("Please don't use 'x' in a math equation as multiplication, please use '*' instead. Also, remember to not put 'what is' or 'calculate' in your math problem, just send it like this: '9*9'. Thank you!", false);
      } else if (message.toLowerCase().includes("4x")) {
        addChatBubble("Please don't use 'x' in a math equation as multiplication, please use '*' instead. Also, remember to not put 'what is' or 'calculate' in your math problem, just send it like this: '9*9'. Thank you!", false);
      } else if (message.toLowerCase().includes("5x")) {
        addChatBubble("Please don't use 'x' in a math equation as multiplication, please use '*' instead. Also, remember to not put 'what is' or 'calculate' in your math problem, just send it like this: '9*9'. Thank you!", false);
      } else if (message.toLowerCase().includes("6x")) {
        addChatBubble("Please don't use 'x' in a math equation as multiplication, please use '*' instead. Also, remember to not put 'what is' or 'calculate' in your math problem, just send it like this: '9*9'. Thank you!", false);
      } else if (message.toLowerCase().includes("7x")) {
        addChatBubble("Please don't use 'x' in a math equation as multiplication, please use '*' instead. Also, remember to not put 'what is' or 'calculate' in your math problem, just send it like this: '9*9'. Thank you!", false);
      } else if (message.toLowerCase().includes("8x")) {
        addChatBubble("Please don't use 'x' in a math equation as multiplication, please use '*' instead. Also, remember to not put 'what is' or 'calculate' in your math problem, just send it like this: '9*9'. Thank you!", false);
      } else if (message.toLowerCase().includes("9x")) {
        addChatBubble("Please don't use 'x' in a math equation as multiplication, please use '*' instead. Also, remember to not put 'what is' or 'calculate' in your math problem, just send it like this: '9*9'. Thank you!", false);
      } else if (message.toLowerCase().includes("what is 0")) {
        addChatBubble("Please don't put 'What is' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("what is 1")) {
        addChatBubble("Please don't put 'What is' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("what is 2")) {
        addChatBubble("Please don't put 'What is' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("what is 3")) {
        addChatBubble("Please don't put 'What is' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("what is 4")) {
        addChatBubble("Please don't put 'What is' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("what is 5")) {
        addChatBubble("Please don't put 'What is' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("what is 6")) {
        addChatBubble("Please don't put 'What is' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("what is 7")) {
        addChatBubble("Please don't put 'What is' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("what is 8")) {
        addChatBubble("Please don't put 'What is' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("what is 9")) {
        addChatBubble("Please don't put 'What is' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("calculate 0")) {
        addChatBubble("Please don't put 'Calculate' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("calculate 1")) {
        addChatBubble("Please don't put 'Calculate' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("calculate 2")) {
        addChatBubble("Please don't put 'Calculate' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("calculate 3")) {
        addChatBubble("Please don't put 'Calculate' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("calculate 4")) {
        addChatBubble("Please don't put 'Calculate' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("calculate 5")) {
        addChatBubble("Please don't put 'Calculate' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("calculate 6")) {
        addChatBubble("Please don't put 'Calculate' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("calculate 7")) {
        addChatBubble("Please don't put 'Calculate' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("calculate 8")) {
        addChatBubble("Please don't put 'Calculate' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().includes("calculate 9")) {
        addChatBubble("Please don't put 'Calculate' before your math problem. Just write it as '9+9'.", false);
      } else if (message.toLowerCase().startsWith("search for ")) {
        const query = message.slice(11);
        search(query);
      } else if (message.toLowerCase().startsWith("search ")) {
        const query = message.slice(7);
        search(query);
      } else if (message.toLowerCase().startsWith("who is ")) {
        const query = message.slice(7);
        searchWikipedia(query);
      } else if (message.toLowerCase().startsWith("who was ")) {
        const query = message.slice(8);
        searchWikipedia(query);
      } else if (message.toLowerCase().startsWith("wikipedia ")) {
        const query = message.slice(10);
        searchWikipedia(query);
      } else if (message.toLowerCase().startsWith("what is a ")) {
        const query = message.slice(9);
        search(query);
      } else if (message.toLowerCase().startsWith("what is ")) {
        const query = message.slice(8);
        search(query);
      } else if (message.toLowerCase().startsWith("what's ")) {
        const query = message.slice(7);
        search(query);
      } else if (message.toLowerCase().includes("poop")) {
        addChatBubble(":|", false);
      } else if (message.toLowerCase().includes("hi")) {
        const response = helloResponses[Math.floor(Math.random() * helloResponses.length)];
        addChatBubble(response, false);
    message = message.toLowerCase();
      } else if (message.includes("?")) {
        addChatBubble("I'm sorry, but I can't understand any type of punctuation right now. Please ask your question again, just without punctuation.", false);
      } else if (message.includes(".")) {
        addChatBubble("I'm sorry, but I can't understand any type of punctuation right now. Please ask your question again, just without punctuation.", false);
      } else if (message.includes("!")) {
        addChatBubble("I'm sorry, but I can't understand any type of punctuation right now. Please ask your question again, just without punctuation.", false);
      } else if (message.includes(",")) {
        addChatBubble("I'm sorry, but I can't understand any type of punctuation right now. Please ask your question again, just without punctuation.", false);
      } else if (message.toLowerCase().includes(" u ")) {
        addChatBubble("Please don't use abbreviations. Please use 'you' instead of 'u'. Thank you for understanding!", false);
      } else if (message.toLowerCase().includes(" ur ")) {
        addChatBubble("Please don't use abbreviations. Please use 'your' instead of 'ur'. Thank you for understanding!", false);
      } else {
        const response = unknownMessageResponses[Math.floor(Math.random() * unknownMessageResponses.length)];
        addChatBubble(response, false);
      
        // Store the unknown message in localStorage
        let unknownMessages = JSON.parse(localStorage.getItem('unknownMessages') || '[]');
        unknownMessages.push(message.toLowerCase());
        localStorage.setItem('unknownMessages', JSON.stringify(unknownMessages));
      }
      
      
    }, 2000); // Replace with code to get chat bot response
  
    // Hide the typing indicator after 2 seconds
    setTimeout(() => {
      typingIndicator.style.display = "none";
    }, 2000);
  }
  
  
  // Add event listeners for the input box and submit button
  inputBox.addEventListener("input", function(event) {
  // Hide the typing indicator if the input box is empty
  if (inputBox.value === "") {
  typingIndicator.style.display = "none";
  }
  });
  
  inputBox.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
  event.preventDefault();
  sendMessage(inputBox.value);
  }
  });
  
  submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  sendMessage(inputBox.value);
  });
  
  submitBtn.parentNode.insertBefore(micBtn, submitBtn.nextSibling);
  // Check if the Web Speech API is supported
  if ('webkitSpeechRecognition' in window) {
    // Create a new instance of the speech recognition object
    const recognition = new webkitSpeechRecognition();
  
    // Set the parameters for the speech recognition object
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
  
    // Add an event listener to the microphone button
    const micBtn = document.getElementById('mic-btn');
    micBtn.addEventListener('click', () => {
      // Start the speech recognition process
      recognition.start();
    });
  
    // Add an event listener for when the speech recognition process returns a result
    recognition.onresult = (event) => {
      // Get the transcript from the event results
      const transcript = event.results[0][0].transcript;
      
      // Send the transcript to the server for transcription
      fetch('transcribe.php', {
        method: 'POST',
        body: JSON.stringify({ transcript }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        // Display the transcription in the chat box
        const chatBox = document.getElementById('chat-box');
        const chatBubble = document.createElement('div');
        chatBubble.classList.add('chat-bubble', 'user');
        const chatText = document.createElement('div');
        chatText.classList.add('chat-text');
        chatText.textContent = data.transcription;
        chatBubble.appendChild(chatText);
        chatBox.appendChild(chatBubble);
  
        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
  
        // Send the transcription to the chatbot for processing
        chatbot.process(data.transcription);
      })
      .catch(error => {
        console.error(error);
      });
    };
  } else {
    console.error('Web Speech API is not supported in this browser.');
      handleUnknownMessage(message);
    }