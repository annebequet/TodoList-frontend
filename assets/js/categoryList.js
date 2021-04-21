let categoryList = {
  /**
   * @type {Array} List of categories
   */
  items: [],

  /**
   * Load category list
   *
   * @return {Promise}
   */
  load: function() {
    /**
     * La fonction me retourne une promesse qui me permet de gérer un traitement asynchrone
     *
     * @type {Promise}
     *
     * @link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
     * @link https://javascript.info/promise-basics
     */
    let request = fetch('https://benoclock.github.io/S07-todolist/categories.json');

    request
      .then(categoryList.parseResponseJSON)
      .then(categoryList.setItems)
      .then(categoryList.display);

    return request;
  },

  /**
   * Parse response JSON body
   *
   * @param {Response} response HTTP Response object representation
   *
   * @return {Promise} Promise with parsed JSON body
   */
  parseResponseJSON: function(response) {
    return response.json();
  },

  /**
   * @param {Array} categoryListData List of categories
   *
   * @return {Array}
   */
  setItems: function(categoryListData) {
    categoryList.items = categoryListData;

    return categoryListData;
  },

  /**
   * Display category lists in DOM
   *
   * @param {Array} categoryListData List of categories
   */
  display: function(categoryListData) {
    // console.log(categoryList);

    let selectElement = document
      .querySelector('#category-select-template')
      .content
      .querySelector('select')
      .cloneNode(true);

    for (let index in categoryListData) {
      let category = categoryListData[index];

      let optionElement = document.createElement('option');
      optionElement.textContent = category.name;
      optionElement.value = category.id;

      selectElement.appendChild(optionElement);
    }

    // console.log(selectElement);

    let parentElementList = document.querySelectorAll(
      '.filters__task--category, .task--add .task__category .select'
    );

    // console.log(parentElementList);

    for (let index = 0; index < parentElementList.length; index++) {
      let parentElement = parentElementList[index];

      // Je clone le select généré avant sinon je me retrouve à déplacer l'élément DOM d'un parent à un autre
      let clonedSelectElement = selectElement.cloneNode(true);

      parentElement.appendChild(clonedSelectElement);
      parentElement.classList.remove('is-hidden');
    }
  },

  /**
   * Get category by id
   *
   * @param {Number} categoryId Category's ID
   *
   * @return {Object} Category data
   */
  getItem: function(categoryId) {
    /*
    let filteredItems = categoryList.items.filter(function(category) {
      return category.id === categoryId;
    });

    console.log(filteredItems);

    let category = filteredItems.pop();
    */

    let category;

    for (
      let index = 0;
      index < categoryList.items.length;
      index++
    ) {
      // Je récupère la catégorie en cours de traitement dans ma boucle
      let currentLoopCategory = categoryList.items[index];

      // Je teste si son ID est égal à l'ID recherché
      if (currentLoopCategory.id === categoryId) {
        // Si oui, j'ai trouvé la catégorie recherchée
        category = currentLoopCategory;
      }
    }

    return category;
  }
};
