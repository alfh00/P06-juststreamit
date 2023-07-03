# Project Readme

This project is a web application that fetches movie data from an API and displays it in various sections on the website. It allows users to scroll through movie categories, view details about individual movies, and interact with a floating movie window.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Open the project directory in your preferred code editor.
3. Ensure that you have the necessary dependencies installed. This project uses axios for making HTTP requests.
4. Update the `categoriesURL` variable in the code to match the URL of the API endpoint for movie genres.
5. Run the project using a local development server or by opening the HTML file in a web browser.

## Usage

The project consists of the following main components and functionalities:

### Variables

- `categoriesURL`: URL of the API endpoint for movie genres.
- `closeBtn`: Represents the close button element.
- `scrollables`: Represents all elements with the class "scrollable".
- `carouselBtns`: Represents all carousel arrow buttons.
- `sections`: Represents all elements with the class "cat-section".
- `modalWin`: Represents the floating movie window element.
- `bestMovieInfo`: Represents the element with the class "best-movie-info".

### Functions

- `updateBestMove`: Fetches data for the best-rated movie and updates the corresponding elements on the page.
- `fetchSectionsData`: Fetches data for different movie sections and populates the corresponding movie covers.

### Event Listeners

- Carousel Buttons: Adds scroll behavior to carousel arrow buttons.
- Scrollables: Adds wheel scrolling behavior to scrollable elements.
- Movie Covers: Fetches data for a specific movie and opens the floating movie window when a movie cover is clicked.
- Close Button: Closes the floating movie window when the close button is clicked.

### Execution

- When the page loads, the `updateBestMove` function is called to fetch data for the best-rated movie and update the UI.
- The `fetchSectionsData` function is called to fetch data for different movie sections and populate the movie covers.
- Users can scroll through the movie categories using the carousel arrow buttons.
- Users can scroll through individual movie sections using the mouse wheel.
- Clicking on a movie cover opens a floating movie window with detailed information about the movie.
- Clicking the close button closes the floating movie window.

## Dependencies

This project requires the following dependency:

- [axios](https://github.com/axios/axios): A library for making HTTP requests.

Make sure to install the dependencies before running the project.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- The project uses the axios library for making HTTP requests.
- The movie data is fetched from an external API.
