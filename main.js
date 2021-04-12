var app= new Vue({
  el: '#root',
  data:{
    nameSearch: '',
    filmResult: [],
  },
  methods: {
    searchFilm: function (input) {
      if (input != '') {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query='+ input)
            .then((response) => {
              console.log(response.data.results);
              var searchRes = response.data.results;
              this.filmResult = [...searchRes];
            });
      }

    },
    getPoster: function(film) {
      var posterLink = film.poster_path;
      console.log(posterLink);
      return 'https://api.themoviedb.org'+posterLink;
    },
  },
  created: function () {

  }
});
