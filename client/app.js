const categoriesURL = 'http://localhost:8000/api/v1/genres/'

const closeBtn = document.querySelector('.close-btn')
const scrollables = document.querySelectorAll('.scrollable')
const carouselBtns = document.querySelectorAll('.carousel-arrow')
const sections = document.querySelectorAll('.cat-section')
const modalWin = document.querySelector('.movie-card-container')
const bestMovieInfo = document.querySelector('.best-movie-info')

const updateBestMove = async () => {
  try {
    const bestMovieId = (
      await axios.get(
        'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'
      )
    ).data.results[0].id

    const bestMovieData = (
      await axios.get(`http://localhost:8000/api/v1/titles/${bestMovieId}`)
    ).data

    const { id, title, image_url, description } = bestMovieData
    const [elTitle, elDesc, elBtn] = bestMovieInfo.children
    elTitle.innerHTML = title
    elDesc.innerHTML = description
    elBtn.id = id

    const bestImg = bestMovieInfo.nextElementSibling
    bestImg.innerHTML = `<img src=${image_url} alt=${title}>`
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

// selecting all clickable items
let movieCovers = [
  ...document.querySelectorAll('.movie-cover'),
  ...document.querySelectorAll('.best-btn'),
]

// fetching data for floating movie window
for (const movieCover of movieCovers) {
  movieCover.addEventListener('click', async () => {
    const id = movieCover.getAttribute('id')
    const movieData = (
      await axios.get(`http://localhost:8000/api/v1/titles/${id}`)
    ).data

    const movieCardInfos = document.querySelector('.movie-card-infos')
    movieCardInfos.innerHTML = `
    <div class="movie-infos-head">
            <img src=${movieData.image_url} alt="">
            
            <div class="movie-details">
              <h3>${movieData.title}</h3>
              <ul class="details-list">
                <li><span>Genre: </span>${movieData.genres.join(', ')}</li>
                <li><span>Date de sortie: </span>${
                  movieData.date_published
                }</li>
                <li><span>Note: </span>${movieData.reviews_from_users}</li>
                <li><span>Score IMDB: </span>${movieData.imdb_score}</li>
                <li><span>Durée: </span>${movieData.duration}</li>
                <li><span>Résultat Box Office: </span>${
                  movieData.worldwide_gross_income + ' $' || 'inconu'
                }</li>
                <li><span>Pays: </span>${movieData.countries.join(' ,')}</li>
                <li><span>Réalisateur: </span>${movieData.directors.join(
                  ', '
                )}</li>
                <li><span>Acteurs: </span>${
                  movieData.actors.join(', ').slice(0, 30) + '...'
                }</li>
              </ul>
            </div>  
          </div>
            
          <div class="movie-synopsis">
              <h4>Synopsis:</h4>
              <p>${movieData.long_description.slice(0, 433) + '...'}</p>
          </div>`
    modalWin.classList.toggle('hidden')
  })
}

// closing button action for floating movie window
closeBtn.addEventListener('click', () => {
  modalWin.classList.toggle('hidden')
})

async function fetchSectionsData() {
  for (const section of sections) {
    const sectionTitle = section.querySelector('h1').innerHTML
    const movieCovers = section.querySelectorAll('.movie-cover')
    let fetchingUrl = ''
    if (sectionTitle === 'Les Mieux Notés') {
      fetchingUrl = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'
    } else if (sectionTitle === 'Sci-Fi') {
      fetchingUrl =
        'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=sci-fi'
    } else if (sectionTitle === 'Comedie') {
      fetchingUrl =
        'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=comedy'
    } else if (sectionTitle === 'Mystère') {
      fetchingUrl =
        'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=mystery'
    }

    let moviesData = []

    while (moviesData.length < 7) {
      try {
        const response = await axios.get(fetchingUrl)
        moviesData = moviesData.concat(response.data.results)
        bestMoviesURL = response.data.next
      } catch (error) {
        console.error(error)
      }
    }
    let i = 1
    for (const movieCover of movieCovers) {
      movieCover.setAttribute('id', moviesData[i].id)
      movieCover.src = moviesData[i].image_url
      i++
    }
  }
}

updateBestMove()
fetchSectionsData()
