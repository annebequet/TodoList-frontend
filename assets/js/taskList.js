// Module qui gère la liste des task
let taskList = {
  /**
   * Load task list
   */
  load: function() {
    let request = fetch('https://benoclock.github.io/S07-todolist/tasks.json');

    request
      .then(taskList.parseResponseJSON)
      .then(taskList.display);
  },

  /**
   * Parse response body json
   *
   * @param {Response} response HTTP Response objet representation
   *
   * @return {Promise} Promise with parsed JSON body
   */
  parseResponseJSON: function(response) {
    return response.json();
  },

  /**
   * Display task list in DOM
   *
   * @param {Array} taskListData List of tasks
   */
  display: function(taskListData) {
    for (let index in taskListData) {
      let task = taskListData[index];

      console.log(task);

      // Générer l'élément DOM de la task en cours de traitement
      // Ajouter les écouteurs d'événements d'une task à cet élément DOM de task
      // Insérer dans la liste des tasks
      // C'est exactement ce que fait la fonction addTask du module taskList du coup on l'utilise
      taskList.addTask(
        task.title,
        task.category_id
      );
    }
  },

  init: function() {
    // L'élément DOM de la liste des tâches
    let taskListElement = document.querySelector('.tasks');

    /**
     * Liste des éléments taskItem contenus dans la liste
     *
     * @link https://developer.mozilla.org/fr/docs/Web/CSS/:not
     */
    let taskItemElementList = taskListElement.querySelectorAll('.task:not(.task--add)');

    // Je boucle sur tous les élement de type task
    for (
      let index = 0;
      index < taskItemElementList.length;
      index++
    ) {
      // Je récupère l'élément DOM de la task en cours de traitement
      let taskItemElement = taskItemElementList[index];

      // console.log(taskItemElement);

      // J'ajoute sur l'élément DOM de la task les écouteurs d'événements de mon interface
      taskItem.addAllEventListeners(taskItemElement);
    }
  },

  /**
   * Add task in list
   *
   * @param {String} name Task name
   * @param {String} category Task category
   */
  addTask: function(name, category) {
    // Je génère l'élément DOM de ma task
    let taskItemElement = taskItem.generateElement(name, category);

    // Je récupère l'élément DOM de la liste de task
    let taskListElement = document.querySelector('.tasks');
    let addTaskFormElement = taskListElement.querySelector('.task--add');

    /**
     * J'ajoute l'élément DOM de task juste avant le formulaire d'ajout de task
     *
     * @link https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
     */
    taskListElement.insertBefore(taskItemElement, addTaskFormElement);

    // Je scroll jusqu'à l'élément de task inséré dans la liste
    // taskItemElement.scrollIntoView();
  }
};
