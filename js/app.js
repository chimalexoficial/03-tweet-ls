// Vars
const form = document.getElementById('form');
const listTweets = document.getElementById('list-tweets');
const content = document.querySelector('#content');
console.log(form);
console.log(listTweets);
let tweets = [];

eventListeners();
// Event listeners
function eventListeners() {
    form.addEventListener('submit', addTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log('Local Storage: Priting tweets... ', tweets);
        createListHTML();
    })
}


// Functions
function addTweet(e) {
    e.preventDefault();
    // Text area
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet);

    if(tweet === '') {
        console.log('Error, tweet is empty, try again');
        showError('Error, tweet is empty, try again');
        return;
    } 

    console.log('Adding tweet... to the array...');
    const tweetObj = {
        id: Date.now(),
        tweet
    };

    // tweets.push(tweet.value);
    // console.log(tweets);
    tweets = [...tweets, tweetObj];
    console.log(tweets);
    createListHTML();

    //Restarting form
    form.reset();


}

// Show message error
function showError(error) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');

    // Insert error into content
    content.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 2300);
}

function createListHTML() {
    cleanHTML();

    if(tweets.length > 0) {

        tweets.forEach(tweet => {
            //delete button
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('delete-tweet');
            btnDelete.innerText = 'X';
            btnDelete.onclick = () => {
                deleteTweet(tweet.id);
            }

            // list
            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(btnDelete);
            listTweets.appendChild(li);
        });
    }

    reloadLS(); //local storage
}

function reloadLS() {
    localStorage.setItem("tweets", JSON.stringify(tweets));

}

function cleanHTML() {
    while(listTweets.firstChild) {
        listTweets.removeChild(listTweets.firstChild);
    }
}

function  deleteTweet(id) {
    console.log('Deleting tweet...');
    tweets = tweets.filter(tweet => tweet.id !== id);
    console.log(tweets);
    createListHTML();
}