var app= new Vue({
  el: '#root',
  data:{
    nameSearch: '',
    queryResult: [],
    api_key: 'e99307154c6dfb0b4750f6603256716d',
    uri: 'https://api.themoviedb.org/3',
    lang: 'it',
    starFull: '<i class="fas fa-star"></i>',
    emptyStar: '<i class="far fa-star"></i>',
    titlePage: 'Popular Movies',
  },
  methods: {
    searchFilm: function (input) {
      if (input != '') {
        axios.get(`${this.uri}/search/movie?api_key=${this.api_key}&query=${input}&language=${this.lang}`)
            .then((response) => {
              //console.log(response.data.results);
              var searchResFilm = response.data.results;
              this.queryResult = [...searchResFilm];
              axios.get(`${this.uri}/search/tv?api_key=${this.api_key}&query=${input}&language=${this.lang}`)
                  .then((response) => {
                    //console.log(response.data.results);
                    this.queryResult = [...this.queryResult, ...response.data.results];
                  });
            });
            this.titlePage = 'Search Results'
      }

    },

    getPoster: function(film) {
      var posterLink = film.poster_path;
      //console.log(posterLink);
      return 'https://image.tmdb.org/t/p/w200'+posterLink;
    },

    getFlag: function(lang) {
      var flagLink = `https://www.unknown.nu/flags/images/${lang}-100`;
      return flagLink;
    },

    rateToStarsFull: function(rating) {
      var starNr = rating/2;
      starNr = Math.round(starNr);
      var star5Array = [];
      for (var i = 0; i < starNr; i++) {
        star5Array.push(this.starFull);
      }

      return star5Array;
    },

    rateToStarsEmpty: function(rating) {
      var starNr = rating/2;
      starNr = Math.round(starNr);
      var star5Array = [];
      for (var i = 0; i < 5-starNr; i++) {
        star5Array.push(this.emptyStar);
      }

      return star5Array;
    },

    popularMovies: function() {
      axios.get(`${this.uri}/movie/popular?api_key=${this.api_key}`)
          .then((response) => {
            //console.log(response.data.results);
            //console.log(response.data);
            this.queryResult = [ ...response.data.results];
          });
          this.titlePage = 'Popular Movies'
    },

    topRatedMovies: function() {
      axios.get(`${this.uri}/movie/top_rated?api_key=${this.api_key}&language=it`)
          .then((response) => {
            //console.log(response.data.results);
            //console.log(response.data);
            this.queryResult = [ ...response.data.results];
          });
          this.titlePage = 'Top Rated Movies'
    },

    popularTV: function() {
      axios.get(`${this.uri}/tv/popular?api_key=${this.api_key}&language=it`)
          .then((response) => {
            //console.log(response.data.results);
            //console.log(response.data);
            this.queryResult = [ ...response.data.results];
          });
          this.titlePage = 'Popular Tv series'
    },

    topRatedTV: function() {
      axios.get(`${this.uri}/tv/top_rated?api_key=${this.api_key}&language=it`)
          .then((response) => {
            //console.log(response.data.results);
            //console.log(response.data);
            this.queryResult = [ ...response.data.results];
          });
          this.titlePage = 'Top Rated Tv series'
    },

  },
  created() {
    axios.get(`${this.uri}/movie/popular?api_key=${this.api_key}`)
        .then((response) => {
          //console.log(response.data.results);
          //console.log(response.data);
          this.queryResult = [...this.queryResult, ...response.data.results];
        });
  }
});
