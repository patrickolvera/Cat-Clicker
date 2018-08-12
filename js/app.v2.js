(() => {

    const model = {
    // All the names and urls of the cat images
        catList : [
            ['Boots', 'images/cute-kitten.jpg'],
            ['Jimmy', 'images/cute-kitten-2.jpg'],
            ['Doctor Whiskers', 'images/doctor-whiskers.jpg'],
            ['Mittens', 'images/mittens.jpeg'],
            ['Pexels', 'images/pexels.jpg']
        ],
        

    // Creates cat objects with names, urls, and click counts
        Cat : class {
            constructor(arr){
                this.name = arr[0],
                this.url = arr[1],
                this.clicks = 0
            }    
        },

    // Creates and pushes cat objects to controller.catObjs
        init : () => {
            model.catList.forEach( cat => {
                controller.catObjs[controller.strFormat(cat[0])] = new model.Cat(cat);
            });
        }
    
    }

    const menuView = {
    // Creates the featured cats based on catList
        init : () => {
            menuView.render()
            this.catLinks = $('#cat-dropdown .dropdown-item').toArray();
    
            catLinks.forEach( link => {
                link.addEventListener('click', e => {
                    const objKey = e.target.getAttribute('href').replace('#', '');

                    mainView.render(controller.catObjs[objKey]);
                })
            })
        },

        render : () => {
            this.catList = controller.getCatList();
            this.featured = $('#cat-dropdown')[0];
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
            mainView.render(controller.catObjs.boots); /* Cat loaded on Startup */
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
                const objKey = controller.strFormat(e.target.getAttribute('name'));
                controller.catObjs[objKey].clicks ++;

                const counter = $('.counter')[0];
                counter.textContent = controller.catObjs[objKey].clicks;
            })
        }
    }

    const controller = {

    // Where the cat objects will be stored after init() is called
    /* TODO: Store cats in localStorage so that click counts are retained */
        catObjs: {},

        init : () => {
            model.init(),
            menuView.init(),
            mainView.init()
        },

        getCatList : () => model.catList,

        strFormat : str => str.toLowerCase().replace(/\s+/g, '')
    }

    controller.init();
})();