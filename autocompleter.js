Vue.component('v-autocompleter', {
  template: '<div><img src="img/search.svg" class="search-icon"><input @change="signalChange" @keydown.enter="zmienStrone" v-model="googleSearch" type="text" class="s-input" ref="first"><div class="miasta"><ul class="numeracja1"><li v-for="city in filteredCities" @click="handleClick(city.name)"><div class="podpowiedzi" v-html="highlight(city.name)"></div></li></ul></div></div>',
  propos: ['options'],
  data: function () {
    return {
      googleSearch: '',
      //isActive: 0,
      cities: window.cities,
    }
  },
  methods: {
    /**
     * Funkcja ustawiająca klikniętą propozycję jako wynik wyszukiwania i wystawiająca event, który powoduje zmianę strony na stronę z rezultatami wyszukiwania.
     * @param {wybrana nazwa miasta} name 
     */
    handleClick: function (name) {
      this.googleSearch = name;
      //this.isActive = 1;
      this.$emit('enter')
    },
    /**
     * Funkcja formatująca propozycje wyszukiwania według wzory: wszukiwana fraza jest zapisana stylem normalnym, reszta -pogrubionym.
     * @param {propozycje wyników wyszukiwania z daną frazą} wyraz 
     * @returns sformatowany napis
     */
    highlight: function (wyraz) {
      return wyraz.replaceAll(this.googleSearch, '<span class="highlight">' + this.googleSearch + '</span>')
    },
    /**
     * Funkcja pozwalająca zmienić stronę po wciśnięciu enter na stronę z wynikami wyszukiwnaia.
     */
    zmienStrone: function () {
      this.$emit('enter')
    },
    /**
     * Funkcja wystawiająca event przy zmianie inputa.
     */
    signalChange: function () {
      this.$emit('input')
    },
  },
  computed: {
    /**
     * Filtruje listę miast w poszukiwaniu nazw, zawierających wpisaną frazę.
     * @returns zwraca 10 propozycji miast zawierających wpisaną frazę w postaci listy
     */
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
