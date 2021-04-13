var app= new Vue({
  el: '#root',
  data:{
    nameSearch: '',
    queryResult: [],
    api_key: 'e99307154c6dfb0b4750f6603256716d',
    uri: 'https://api.themoviedb.org/3',
    lang: 'it',
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

      }

    },
    getPoster: function(film) {
      var posterLink = film.poster_path;
      console.log(posterLink);
      return 'https://image.tmdb.org/t/p/w200'+posterLink;
    },
    getFlag: function(lang) {
      var flagLink = `https://www.unknown.nu/flags/images/${lang}-100`;
      return flagLink;
    }
  },
  created: function () {

  }
});
