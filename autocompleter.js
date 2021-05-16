Vue.component('v-autocompleter', {
  template: '<div><img src="img/search.svg" class="search-icon"><input @change="signalChange" @keydown.enter="zmienStrone" v-model="googleSearch" type="text" class="s-input" ref="first"><img src="img/tia.jpg" class="tia-icon"><div class="miasta"><ul class="numeracja1"><li v-for="city in filteredCities" @click="handleClick(city.name)"><div class="podpowiedzi" v-html="highlight(city.name)"></div></li></ul></div></div>',
  propos: ['options'],
  data: function () {
    return {
      googleSearch: '',
      isActive: 0,
      cities: window.cities,
    }
  },
  methods: {
    handleClick: function (name) {
      this.googleSearch = name;
      this.isActive = 1;
      this.$emit('enter', this.googleSearch)
    },
    highlight: function (wyraz) {
      return wyraz.replaceAll(this.googleSearch, '<span class="highlight">' + this.googleSearch + '</span>')
    },
    zmienStrone: function () {
      this.$emit('enter', this.googleSearch)
    },
    signalChange: function () {
      this.$emit('input')
    },
  },
  computed: {
    filteredCities: function () {
      if (this.googleSearch.length == 0) {
        return
      }
      let wynik = this.cities.filter(city => city.name.includes(this.googleSearch))
      if (wynik.length > 10) {
        wynik = wynik.slice(0, 10)
      }
      return wynik
    }
  },
})
