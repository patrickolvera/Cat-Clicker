const container = document.getElementById('container');
const catPics = document.querySelectorAll('.cat-pic');

// Makes the counter element for the cat pic
const createCounter = () => {
    const h3 = document.createElement('h3');
    const span = document.createElement('span');
    
    h3.textContent = 'Number of clicks: ';
    span.textContent = '0';
    span.classList.add('counter');
    h3.appendChild(span);

    return h3;
};

// A counter nad name are added above each cat pic. 
for (let pic of catPics) {
    const parent = pic.parentNode;
// Counter added
    parent.insertBefore(createCounter(), pic);
// Name added
    const makeH2 = document.createElement('h2');
    makeH2.textContent = pic.querySelector('img').alt;
    parent.insertBefore(makeH2, pic);
// Counter increments when picture is clicked
    pic.addEventListener('click', e => {
        const eventCounter = e.target.parentNode.previousSibling.previousSibling.querySelector('span');
        const countClicks = () => eventCounter.textContent = parseFloat(eventCounter.textContent) + 1;
        countClicks();
    });

}
