const bestMoviesURL = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'
const categoriesURL = 'http://localhost:8000/api/v1/genres/'

const closeBtn = document.querySelector('.close-btn')
const movieWin = document.querySelector('.movie-infos-container')
const scrollables = document.querySelectorAll('.scrollable')
const movieCovers = document.querySelectorAll('.movie-cover')
const carouselBtns = document.querySelectorAll('.carousel-arrow')
const sections = document.querySelectorAll('.cat-section')

async function getData(url) {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// adding scroll behavior to buttons
for (const carouselBtn of carouselBtns) {
  carouselBtn.addEventListener('click', () => {
    if (carouselBtn.classList.contains('left')) {
      const scrollable = carouselBtn.nextElementSibling
      scrollable.scrollLeft -= 100
    } else {
      const scrollable = carouselBtn.previousElementSibling
      scrollable.scrollLeft += 100
    }
  })
}

// adding wheel scrolling behavior
for (const scrollable of scrollables) {
  scrollable.addEventListener('wheel', (e) => {
    e.preventDefault()
    if (e.wheelDelta > 0) {
      scrollable.scrollLeft -= 50
    } else {
      scrollable.scrollLeft += 50
    }
  })
}

// fetching data for floating movie window
for (const movieCover of movieCovers) {
  movieCover.addEventListener('click', () => {
    // fetch movie data and show it
    movieWin.classList.toggle('hidden')
  })
}

// closing button action for floating movie window
closeBtn.addEventListener('click', () => {
  movieWin.classList.toggle('hidden')
})

for (const section of sections) {
  const sectionTitle = section.querySelector('h1').innerHTML
  const sectionMovieCovers = section.querySelectorAll('.movie-cover')
  const bestMoviesData = async () => {
    await getData(bestMoviesURL)
  }
  console.log(bestMoviesData)
  // if (sectionTitle === 'Les Mieux Notés') {
  //   for (const SectionImg of SectionImgs){
  //   }
  //   for (const sectionMovieCover of sectionMovieCovers) {
  //     sectionMovieCover.nextElementSibling.src =
  //   }
  // }
}
