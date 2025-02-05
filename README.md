# Exam learning platform


<details>
<summary>  Project description 📚</summary>
<p>
A platform to create your own lessons and tests. Currently it is set up with materials for the romanian Bacalaureat exam at the Romanian language.
</p>
</details>

</br>

<details>
<summary>  Developer 🙆‍♂️</summary>
<ul>
<il>- Alex Roman </il>
</ul>
</details>

</br>

<details>
<summary>  Project implementation 🔧</summary>
<p>
I started this project to develop a web project with Go on the backend and Typescript + React on the frontend. The first step was implementing a few api's on
the server to create, update and delete users for the authentification. After having the users down, I wanted to be able to add lessons interactively through the
platform. Similarly I added tests. Quick questions for each lesson: after creating a lesson, you can publish as many quick questions in relation with the said lesson
that will appear directly under the lesson and will be randomized for the user to practice their knowledge on the subject. Using the same concept, I made it so you
have to create a test first, then you can add questions and select to with test they should be related to. This will add the question to the test. The last and
I think the most fun part, the gamification. Quick questions will give you experience points and gold and passing tests will also give you rewards. The experience
will place the users higher on the global leaderboard and the gold can be spent for advantages during tests. Lastly, I implemented badges for the user's profile, as
a cute addition and a sense of progress for the learner.
</p>
</details>

</br>

<details>

<summary>  Technologies ⚙️</summary>
<h3>I chose Golang as the language for the backend</h3>
<ul>
<li>
It is blazingly fast.
</li>
<li>
It scales better than other options.
</li>
<li>
Writing *Go* feels good.
</li>
</ul>
<h3>Fiber</h3>
<ul>
<li>Easy to start with.</li>
<li>Intuitive</li>
</ul>
<h3>Xorm + Sqlite</h3>
<ul>
<li>I used Xorm to handle the database.</li>
<li>Sqlite was easy enough to set up and it gave me everything I need as fast as I needed it.</li>
</ul>
<h3>Typescript for the frondend</h3>
<ul>
  <li>
Some form of static types were a must for me
  </li>
</ul>
<h3>Node</h3>
<ul>
<li>
Developed ecosystem
</li>
<li>
More than enough documentation
</li>
</ul>
<h3>React</h3>
<ul>
<li>
Personal preference, it was my first project with React and I just wanted to try using it and see how I like it.
</li>
</ul>
</details>
</br>

<details>
<summary> Media 📸 + Code 🖥️</summary>
  <blockquote>
    <details>
    <summary>&nbsp;&nbsp;&nbsp;&nbsp;Screenshots: </summary>
    <img src="media/lesson-1.png" width="200" height="200">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="media/lesson-2.png" width="200" height="200">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="media/test-1.png" width="200" height="200">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="media/test-2.png" width="200" height="200">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="media/create.png" width="200" height="200">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="media/leaderboard.png" width="200" height="200">
  </details>
  </blockquote>
  
  <blockquote>
  <details><summary>&nbsp;&nbsp;&nbsp;&nbsp;Code: </summary>

[Code file](https://github.com/ralexgt/Platforma-BAC/tree/main/server) - Server </br>
[Code file](https://github.com/ralexgt/Platforma-BAC/tree/main/platforma-romana) - UI

  </details>
  </blockquote>
  
  <blockquote>
  <details><summary>&nbsp;&nbsp;&nbsp;&nbsp;Fun fact: </summary>

  <strong>I learned using the Helix text editor during this project. 😁 Still no neovim chad though. 🤣🤣

  </details>
  </blockquote>
</details>
