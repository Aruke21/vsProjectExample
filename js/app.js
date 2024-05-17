const tabsContent = document.querySelectorAll('.tabcontent')
const tabs = document.querySelectorAll(".tabheader__item")
const tabsWrapper = document.querySelector(".tabheader__items")

const hideTabContent = () => {
    tabsContent.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active')
    })
}

const showTabContent = (i = 3) => {
    tabsContent[i].style.display = 'block'
    tabs[i].classList.add('tabheader__item_active')
}

let i = 0
hideTabContent()
showTabContent()

const cyclicTabChange = () => {
    const currentIndex = i;
    const nextIndex = (i + 1) % tabsContent.length; 
    setTimeout(() => {
        tabsContent[currentIndex].style.display = 'none'; 
        tabsContent[nextIndex].style.display = 'block'; 
        tabs[currentIndex].classList.remove('tabheader__item_active');
        tabs[nextIndex].classList.add('tabheader__item_active');
        i = nextIndex;
        cyclicTabChange(); 
    }, 2000); }

cyclicTabChange();

// tabsWrapper.addEventListener("click", (e) => {
//     const target = e.target
//     if(target.classList.contains("tabheader__item")){
//         tabs.forEach((item, idx) => {
//             if(target === item){
//                 console.log(target, idx)
//                 hideTabContent()
//                 showTabContent(idx)
//             }
//         })
//     }
// })
// slider

const modal = document.querySelector('.modal')
const modalOpenBtn = document.querySelector(".btn_white")
const modalCloseBtn = document.querySelector(".modal__close")

const handleOpenModal = () => {
    modal.classList.add('show')
    modal.classList.remove('hide')
}

const handleCloseModal = () => {
    modal.classList.remove('show')
    modal.classList.add('hide')
}
modalOpenBtn.addEventListener("click", handleOpenModal)
modalCloseBtn.addEventListener("click", handleCloseModal)


//модальное окно с фото
const modal1=document.querySelector(".modal")
const modalBackground1 = document.querySelector(".modal_background");
const modalOpenImg1 = document.querySelector(".tabcontainer")
const modalCloseBtn1 = document.querySelector(".modal__close")


const handleOpenModal1 = () => {
    modal.classList.add("show")
    modal.classList.remove("hide")
    
}

const handleCloseModal1 = () => {
    modal.classList.remove("show")
    modal.classList.add("hide")
}

modalOpenImg1.addEventListener("click",handleOpenModal)
modalCloseBtn1.addEv



// //скролл

// const modal = document.getElementById("myModal");
// const openBtn = document.getElementById("openModal");
// const closeBtn = document.getElementById("modal__close");

//     openBtn.addEventListener("click", function() {
//         modal.style.display = "block";
//         document.body.style.overflow = "hidden"; // Убираем скролл при открытии модального окна
//     });

//     closeBtn.addEventListener("click", function() {
//         modal.style.display = "none";
//         document.body.style.overflow = "auto"; // Возвращаем скролл при закрытии модального окна
//     });

//     window.addEventListener("click", function(event) {
//         if (event.target === modal) {
//             modal.style.display = "none";
//             document.body.style.overflow = "auto"; // Закрываем модальное окно при клике вне него
//         }
//     });




class Menu{
    constructor(img, alt, title, description, price){
        this.img = img
        this.alt = alt
        this.title = title
        this.description = description
        this.price = price
    }
    render(){
        const wrapper = document.querySelector("#cardWrapper")
        const block = document.createElement("div")

        block.innerHTML = `
        <div class="menu__item">
               <img src="${this.img}" alt="${this.alt}">
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.description}
               </div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>
        </div>`
        wrapper.append(block)
    }
}

const fetchMenu = async () => {
    const request = await fetch("data.json")
    const responce = await request.json()
    return responce
}

fetchMenu().then((data) => {
    data.menu.forEach(({img, alt, title, description, price}) => {
        new Menu(img, alt, title, description, price).render()
    })
})



// timer
const deadline = "2024-5-20 16:30:00"

console.log(deadline)
console.log(new Date)
console.log(new Date(deadline))
console.log(new Date(deadline) - new Date)


const getTime = (deadline) => {
    const time = new Date(deadline) - new Date
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    const hours = Math.floor(time / (1000 * 60 * 60) % 24)
    const minutes = Math.floor(time / (1000 * 60) % 60)
    const seconds = Math.floor((time / 1000) % 60)

    return{
        total: time,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

const setTime = () => {
    const days = document.querySelector("#days")
    const hours = document.querySelector("#hours")
    const minutes = document.querySelector("#minutes")
    const seconds = document.querySelector("#seconds")

    const makeZero = (num) => {
        if(num > 0 && num < 10){
            return`0${num}`
        }else if (num < 0 ){
            return '00'
        }else{
            return num
        }
    }

    const updateClock = () => {
        const t = getTime(deadline)
        days.innerHTML = makeZero(t.days)
        hours.innerHTML = makeZero(t.hours)
        minutes.innerHTML = makeZero(t.minutes)
        seconds.innerHTML = makeZero(t.seconds)

    }
    setInterval(updateClock, 1000)
}

setTime(deadline)




const forms = document.querySelectorAll("form")

const postData = async (url, data) => {
    const request = await fetch(url, {
        method: "POST",
        body: data
    })
    return request
}

const bindPostData = (form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const formData = new FormData(form)

        const formDataObject = {}

        formData.forEach((item, name) => {
            formDataObject(name) = item
        })

        const stringifyObj = JSON.stringify(formDataObject)
        console.log(stringifyObj)

        postData("server.php", stringifyObj)
    })
}

forms.forEach((form) => {
    bindPostData(form)
})