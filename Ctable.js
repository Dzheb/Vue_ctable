Vue.component('ctable', {
  props: ['title'],
  data() {
    return {
      btns: [],
      request: JSON.stringify({
        filters: { iso_3166_1_a2: 'RU' },
        paginate: { page: 1, pp_items: 10 },
      }),
      page: 1,
      pp_items: 10,
      pages: null,
      httpdata: null,
      httpdataServer: null,
      dataCountries: null,
      url: 'https://devops100.site/test/',
    };
  },
  methods: {
    // показ информации
    showPage(num) {
      this.page = num;
      const btnItems = document.querySelectorAll('.btn__item');
      btnItems.forEach((element) => {
        if (element.classList.contains('active')) {
          element.classList.remove('active');
        }
        if (element.textContent == this.page) {
          element.classList.add('active');
        }
      });
    },
    // фильтрация по стране
    filterCountry(id) {
      this.dataCountries = this.dataCountries.filter(
        (country) => country.iso_3166_1_a2 == id
      );
    },
    // запрос на сервер
    //
    async fetchData() {
      const response = await fetch(this.url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { Accept: '*/*', 'Content-Type': 'application/json' },
        body: this.request,
      });
      const content = response;
      console.log(content);
      // Ответ приходит без информации. Аналогичный ответ удаётся получить только запросом через Postman. Поэтому для демонстрации используется эмуляция ответа
      // эмуляция ответа сервера
      this.httpdata = {
        form_errors: null,
        success_message: 'Success',
        page_data: {
          data: [
            {
              iso_3166_1_a2: 'RU',
              iso_3166_1_a3: 'RUS',
              iso_3166_1_numeric: '643',
              printable_name: 'Russian Federation',
              name: '',
              display_order: 0,
              is_shipping_country: false,
            },
            {
              iso_3166_1_a2: 'US',
              iso_3166_1_a3: 'USA',
              iso_3166_1_numeric: '001',
              printable_name: 'United States of America',
              name: '',
              display_order: 0,
              is_shipping_country: false,
            },
            {
              iso_3166_1_a2: 'UK',
              iso_3166_1_a3: 'GBR',
              iso_3166_1_numeric: '044',
              printable_name: 'United Kingdom',
              name: '',
              display_order: 0,
              is_shipping_country: false,
            },
          ],
          rpag: {
            has_next: false,
            has_previous: false,
            has_other_pages: false,
            next_page_number: null,
            previous_page_number: null,
            start_index: 1,
            end_index: 1,
            total_count: 249,
            selected_count: 1,
            pages: 3,
          },
        },
        redirect: '',
        exc_stack: '',
        debug: [],
        user_groups: '',
        user_perms: '',
      };
      this.dataCountries = this.httpdata.page_data.data;
      this.pages = this.httpdata.page_data.rpag.pages;
      this.btns = [];
      for (let i = 0; i < this.pages; i++) {
        this.btns.push({ num: i + 1 });
      }
    },
  },
  // чтение данных до загрузки
  // чтение файла стилей ctable.css для компонента
  beforeMount() {
    let style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = 'ctable.css';
    document.head.appendChild(style);
    this.fetchData();
  },
  mounted() {
    // поставить активную кнопку
    const btnItems = document.querySelectorAll('.btn__item');
    btnItems.forEach((element) => {
      if (element.classList.contains('active')) {
        element.classList.remove('active');
      }
      if (element.textContent == this.page) {
        element.classList.add('active');
      }
    });
  },
  template: `<div class="countries__block">
  <h2>{{title}}</h2>
  <h4>To filter by country just press on country</h4>
  <table class="countries__table">
  <thead>
  <tr><th>iso_3166_1_a2</th><th>iso_3166_1_a3</th><th>numeric</th><th>Country</th></tr>  
  </thead>
  <tbody>
    <tr class="country__row" @click="filterCountry(country.iso_3166_1_a2)" v-for="country in dataCountries":key="country.id">
    <td>{{country.iso_3166_1_a2}}</td>
    <td>{{country.iso_3166_1_a3}}</td>
    <td>{{country.iso_3166_1_numeric}}</td>
    <td>{{ country.printable_name }}</td>
    </tr>
    </tbody>
  </table>
  <div class="btn__block">
  <div class="btns" v-for="btn in btns":key="btn.id">
  <button class="btn__item" @click="showPage(btn.num)">{{btn.num}}</button>
  </div>
  </div>
</div>
`,
});
