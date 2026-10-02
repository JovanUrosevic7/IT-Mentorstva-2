import { callOmdbApi } from "../services/omdbApiServices";
import { SingleMovieInterface } from "../interfaces/SingleMovieInterface";

export async function showMovieDetails(imdbID: string): Promise<void> {
    const singleMoviePopup = document.querySelector("#singleMoviePopup") as HTMLDivElement | null;
    const singleMoviePopupInner = document.querySelector("#singleMoviePopupInner") as HTMLDivElement | null;

    if (!singleMoviePopup || !singleMoviePopupInner) {
        console.error("Popup elementi nisu pronađeni u DOM-u!");
        return;
    }

    // 1. Ocistimo prethodni sadrzaj iz popup-a
    singleMoviePopupInner.innerHTML = "";

    // 2. Pozivamo API sa parametrom "i" za detalje pojedinacnog filma
    const response = await callOmdbApi([
        { key: "i", value: imdbID }
    ]);

    const movie: SingleMovieInterface = response.data;

    // 3. Kreiramo HTML elemente
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";
    closeBtn.className = "close-popup-btn";
    closeBtn.addEventListener("click", () => {
        singleMoviePopup.style.display = "none";
    });

    const moviePoster = document.createElement("img");
    moviePoster.src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";
    moviePoster.alt = movie.Title;

    const movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.Title;

    const movieWriter = document.createElement("p");
    movieWriter.innerHTML = `<strong>Scenario:</strong> ${movie.Writer}`;

    const movieReleased = document.createElement("p");
    movieReleased.innerHTML = `<strong>Objavljen:</strong> ${movie.Released}`;

    const movieCountry = document.createElement("p");
    movieCountry.innerHTML = `<strong>Zemlja:</strong> ${movie.Country}`;

    // 4. Ubacujemo sve elemente u unutrašnji kontejner
    singleMoviePopupInner.append(
        closeBtn,
        moviePoster,
        movieTitle,
        movieWriter,
        movieReleased,
        movieCountry
    );

    // 5. Prikazujemo popup
    singleMoviePopup.style.display = "flex";
}