const MOVIES = [
    {
        "id": "tt0133093",
        "title": "The Matrix",
        "year": 1999,
        "director": "Hermanas Wachowski",
        "poster": "/posters/the_matrix.jpg",
        "synopsis": "Un programador de computadoras descubre que su vida es una elaborada farsa creada por máquinas inteligentes."
    },
    {
        "id": "tt0816692",
        "title": "Interstellar",
        "year": 2014,
        "director": "Christopher Nolan",
        "poster": "/posters/interstellar.jpg",
        "synopsis": "Un equipo de exploradores viaja a través de un agujero de gusano en un intento de asegurar la supervivencia de la humanidad."
    },
    {
        "id": "tt0110912",
        "title": "Pulp Fiction",
        "year": 1994,
        "director": "Quentin Tarantino",
        "poster": "/posters/pulp_fiction.jpg",
        "synopsis": "Las vidas de dos sicarios de la mafia, un boxeador, la esposa de un gángster y un par de ladrones de poca monta se entrelazan."
    },
    {
        "id": "tt1375666",
        "title": "Inception",
        "year": 2010,
        "director": "Christopher Nolan",
        "poster": "/posters/inception.jpg",
        "synopsis": "Un ladrón que roba secretos corporativos utilizando tecnología de compartir sueños tiene la tarea inversa de implantar una idea en la mente de un CEO."
    },
    {
        "id": "tt0109830",
        "title": "Forrest Gump",
        "year": 1994,
        "director": "Robert Zemeckis",
        "poster": "/posters/forrest_gump.jpg",
        "synopsis": "Las presidencias de Kennedy y Johnson, la Guerra de Vietnam, Watergate y otros eventos históricos se desarrollan a través de la perspectiva de un hombre de Alabama con un coeficiente intelectual bajo."
    },
    {
        "id": "tt0266697",
        "title": "Kill Bill: Vol. 1",
        "year": 2003,
        "director": "Quentin Tarantino",
        "poster": "/posters/kill_bill_vol1.jpg",
        "synopsis": "Después de despertar de un coma de cuatro años, una ex asesina busca venganza de su ex equipo de asesinato que intentó matarla el día de su boda."
    },
    {
        "id": "tt0434409",
        "title": "V for Vendetta",
        "year": 2005,
        "director": "James McTeigue",
        "poster": "/posters/v_for_vendetta.jpg",
        "synopsis": "En una Gran Bretaña distópica, una joven es salvada de una situación mortal por un misterioso justiciero enmascarado conocido solo como 'V'."
    }
];

const ACTORS = [
    {
        "id": "nm0000206",
        "name": "Keanu Reeves",
        "birthYear": 1964,
        "photo": "/photos/keanu_reeves.jpg",
        "bio": "Actor, director y productor canadiense. Conocido por interpretar a Neo en la saga de Matrix y a John Wick."
    },
    {
        "id": "nm0005230",
        "name": "Carrie-Anne Moss",
        "birthYear": 1967,
        "photo": "/photos/carrie_anne_moss.jpg",
        "bio": "Actriz canadiense, reconocida por su papel como Trinity en la franquicia de Matrix."
    },
    {
        "id": "nm0000401",
        "name": "Laurence Fishburne",
        "birthYear": 1961,
        "photo": "/photos/laurence_fishburne.jpg",
        "bio": "Actor y productor estadounidense, famoso por sus papeles en 'Matrix' y 'Apocalypse Now'."
    },
    {
        "id": "nm0000190",
        "name": "Matthew McConaughey",
        "birthYear": 1969,
        "photo": "/photos/matthew_mcconaughey.jpg",
        "bio": "Actor estadounidense, ganador de un Oscar por 'Dallas Buyers Club' y protagonista de 'Interstellar'."
    },
    {
        "id": "nm0000155",
        "name": "Anne Hathaway",
        "birthYear": 1982,
        "photo": "/photos/anne_hathaway.jpg",
        "bio": "Actriz estadounidense, conocida por 'El Diablo Viste a la Moda', 'Los Miserables' e 'Interstellar'."
    },
    {
        "id": "nm0000201",
        "name": "Samuel L. Jackson",
        "birthYear": 1948,
        "photo": "/photos/samuel_l_jackson.jpg",
        "bio": "Actor y productor estadounidense. Uno de los actores más taquilleros de todos los tiempos, con más de 150 películas."
    },
    {
        "id": "nm0000237",
        "name": "John Travolta",
        "birthYear": 1954,
        "photo": "/photos/john_travolta.jpg",
        "bio": "Actor, cantante y bailarín estadounidense, ícono de películas como 'Fiebre del Sábado por la Noche' y 'Pulp Fiction'."
    },
    {
        "id": "nm0000235",
        "name": "Uma Thurman",
        "birthYear": 1970,
        "photo": "/photos/uma_thurman.jpg",
        "bio": "Actriz y modelo estadounidense, musa de Quentin Tarantino en películas como 'Pulp Fiction' y 'Kill Bill'."
    },
    {
        "id": "nm0000138",
        "name": "Leonardo DiCaprio",
        "birthYear": 1974,
        "photo": "/photos/leonardo_dicaprio.jpg",
        "bio": "Actor y productor estadounidense. Ganador de un Oscar, conocido por 'Titanic', 'El Origen' y 'El Lobo de Wall Street'."
    },
    {
        "id": "nm0000158",
        "name": "Tom Hanks",
        "birthYear": 1956,
        "photo": "/photos/tom_hanks.jpg",
        "bio": "Actor y productor estadounidense, dos veces ganador del Oscar. Famoso por 'Forrest Gump' y 'Philadelphia'."
    },
    {
        "id": "nm0000194",
        "name": "Natalie Portman",
        "birthYear": 1981,
        "photo": "/photos/natalie_portman.jpg",
        "bio": "Actriz israelí-estadounidense, ganadora de un Oscar. Conocida por 'El Cisne Negro', 'V de Vendetta' y la saga de Star Wars."
    }
];

const ROLES = [
    { "movieId": "tt0133093", "actorId": "nm0000206", "character": "Neo" },
    { "movieId": "tt0133093", "actorId": "nm0005230", "character": "Trinity" },
    { "movieId": "tt0133093", "actorId": "nm0000401", "character": "Morpheus" },

    { "movieId": "tt0816692", "actorId": "nm0000190", "character": "Cooper" },
    { "movieId": "tt0816692", "actorId": "nm0000155", "character": "Brand" },

    { "movieId": "tt0110912", "actorId": "nm0000237", "character": "Vincent Vega" },
    { "movieId": "tt0110912", "actorId": "nm0000235", "character": "Mia Wallace" },
    { "movieId": "tt0110912", "actorId": "nm0000201", "character": "Jules Winnfield" },

    { "movieId": "tt1375666", "actorId": "nm0000138", "character": "Dom Cobb" },
    { "movieId": "tt1375666", "actorId": "nm0000155", "character": "Mal" },

    { "movieId": "tt0109830", "actorId": "nm0000158", "character": "Forrest Gump" },

    { "movieId": "tt0266697", "actorId": "nm0000235", "character": "Beatrix Kiddo / La Novia" },
    { "movieId": "tt0266697", "actorId": "nm0000201", "character": "Rufus" },

    { "movieId": "tt0434409", "actorId": "nm0000194", "character": "Evey Hammond" },
    { "movieId": "tt0434409", "actorId": "nm0005230", "character": "Valerie Page" }
];

export function getAllMovies() { return MOVIES; }
export function getMovieById(id) { return MOVIES.find(m => m.id === id); }
export function getAllActors() { return ACTORS; }
export function getActorById(id) { return ACTORS.find(a => a.id === id); }

export function getCastByMovieId(movieId) {
  return ROLES
    .filter(r => r.movieId === movieId)
    .map(r => ({ ...getActorById(r.actorId), character: r.character }));
}

export function getFilmographyByActorId(actorId) {
  return ROLES
    .filter(r => r.actorId === actorId)
    .map(r => getMovieById(r.movieId));
}