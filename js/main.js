const elHeader = document.querySelector('.site-header')
const elHeaderBtn = document.querySelector('.js-header-btn')
const elMain = document.querySelector('.site-main')

// site-header--white

elHeaderBtn.addEventListener('click', () => {
  elHeader.classList.toggle('site-header--white')
  elMain.classList.toggle('site-main--white')
})
