(() => {

    const model = {
    /* TODO: Store cats in localStorage so that click counts are retained */
    // Where the cat objects will be stored after init() is called
        catObjs: {},
    /* TODO: Add imagae attribution */
    // The names and urls of the cat images
        catList : [
            ['Boots', 'images/cute-kitten.jpg'],
            ['Jimmy', 'images/cute-kitten-2.jpg'],
            ['Doctor Whiskers', 'images/doctor-whiskers.jpg'],
            ['Mittens', 'images/mittens.jpeg'],
            ['Pexels', 'images/pexels.jpg']
        ],
    // Creates and pushes cat objects to catObjs
        init : () => {
            model.catList.forEach( cat => {
                controller.newCat(cat);
            });
        }
    }

    const menuView = {
    // Creates the featured cats based on catList
        init : () => {
            menuView.render()
            const catLinkArr = $('#cat-dropdown .dropdown-item').toArray();
    
            catLinkArr.forEach( link => {
                link.addEventListener('click', e => {
    // Update DOM to show chosen cat
                    const objKey = e.target.getAttribute('href').replace('#', '');

                    mainView.render(controller.getCatObjs()[objKey]);
                    adminView.render();
                })
            })
        },
    // Creates dropdown menu based on catList
        render : () => {
            const catList = controller.getCatList();
            const featured = $('#cat-dropdown')[0];
            featured.innerHTML = '';
            catList.forEach( cat => {
                featured.innerHTML += 
                `<a class="dropdown-item" href="#${controller.strFormat(cat[0])}">${cat[0]}</a>`;
            });
        }
    }

    const mainView = {   
    // Makes the counter element for the cat pic
    // A counter and name are added above each cat pic.
        init : () => {
            const initalCat = controller.getCatObjs()['boots']; /* Cat loaded on Startup */
            mainView.render(initalCat); 
        },

        render : obj => {
            const catView = $('#cat-view')[0];
            const IdName = controller.strFormat(obj.name);
            catView.innerHTML =
    /* TODO: optimize images */
                `<h2>Number of clicks: <span class="counter">${obj.clicks}</span></h2>
                <h2>${obj.name}</h2>
                <div id="#${IdName}" class="cat">
                    <picture class="cat-pic">
                        <source media="(min-width: )" srcset="">
                        <img src="${obj.url}" class='cat-img' name="${obj.name}" alt="Cute Cat">
                    </picture>
                </div>`;
    // When the image is clicked update that cat's number of clicks
    // then push it to the page          
            $('img').on('click', e => {
                const key = controller.strFormat(e.target.getAttribute('name'));
                controller.getCatObjs()[key].clicks ++;

                const counter = $('.counter')[0];
                counter.textContent = controller.getCatObjs()[key].clicks;
            })
        }
    }

    const adminView = {
    // Show and hide admin controls with admin-btn
        init : function () {
            const adminBtn = $('#admin-btn');
            const cancel = $('#cancel');
            this.nameInput = $('#name');
            this.urlInput = $('#url');

            adminBtn.click(() => {
                $('#admin-view').toggleClass('hidden');
                $('#submit')[0].scrollIntoView();
            });

            cancel.click(() => {
                $('#admin-view').addClass('hidden');
            });
    // Render this view (update the DOM elements with the right values)
            this.render();
    // Add event listener to submit button
            this.handleSubmit();
        },
    // Placerholders set to current cat's properties
        render : function () {
            this.nameInput.val(controller.getCurCat().name);
            this.urlInput.val(controller.getCurCat().url);
        },
    // Pushes the values in the inputs to the current cat object 
        handleSubmit : function () {
            $('#submit').on('click', e => {
                e.preventDefault();
    // Update array, create new object with name and image. Load on page
    // TODO remove some arrow functions and use 'this' for sibling objects
                const arr = [this.nameInput.val(), this.urlInput.val()];
                const key = controller.strFormat(arr[0])

                controller.spliceToList(arr)
                controller.newCat(arr);
                mainView.render(controller.getCatObjs()[key]);
    // Update dropdown
                menuView.init()
            })
        }
    }

    const controller = {
    // Creates cat objects with names, urls, and click counts
        Cat : class {
            constructor(arr){
                this.name = arr[0],
                this.url = arr[1],
                this.clicks = 0
            } 
        },

        init : () => {
            model.init(),
            menuView.init(),
            mainView.init(),
            adminView.init()
        },

        getCatObjs : () => model.catObjs,

        getCatList : () => model.catList,

        spliceToList : arr => model.catList.splice(1, 0, arr),

        getCurCat : () => model.catObjs[controller.strFormat($('img').attr('name'))],

        strFormat : str => str.toLowerCase().replace(/\s+/g, ''),

        newCat : function(cat) {
            model.catObjs[controller.strFormat(cat[0])] = new this.Cat(cat);
        },
    }

    controller.init();
})();
