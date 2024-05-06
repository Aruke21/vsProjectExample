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