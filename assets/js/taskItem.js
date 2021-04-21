// Module qui gère un élément task
let taskItem = {
  /**
   * Generate task item DOM element
   *
   * @param {String} name Task name
   * @param {Number} categoryId Task category
   *
   * @return {Element} Task DOM Element
   */
  generateElement: function(name, categoryId) {
    // Je clone le contenu de mon template de task
    let taskItemElement = document
      .querySelector('#task-template')
      .content
      .querySelector('.task')
      .cloneNode(true);

    // BONUS : Je modifie le dataset de mon élement DOM task
    taskItemElement.dataset.categoryId = categoryId;

    // J'ajoute le nom de la task dans le DOM
    // Dans le nom d'affichage
    let nameElement = taskItemElement.querySelector('.task__name-display');
    nameElement.textContent = name;

    // Dans le champ d'édition du nom
    let editInputElement = taskItemElement.querySelector('.task__name-edit');
    editInputElement.value = name;

    // J'ajoute le nom de la catégorie de la task dans le DOM
    let categoryElement = taskItemElement.querySelector('.task__category p');
    let category = categoryList.getItem(categoryId);
    categoryElement.textContent = category.name;

    // J'ajoute les écouteurs d'événements associés à un élément DOM task
    taskItem.addAllEventListeners(taskItemElement);

    return taskItemElement;
  },

  /**
   * Add task element all event listeners
   *
   * @param {Element} taskItemElement Task DOM Element
   */
  addAllEventListeners: function(taskItemElement) {
    // Je récupère l'élément DOM du nom de la task
    let taskItemNameElement = taskItemElement.querySelector('.task__name-display');

    // console.log(taskItemNameElement);

    // J'ajoute l'écouteur d'événement au clic sur le nom de la task
    taskItemNameElement.addEventListener(
      'click',
      taskItem.handleClickEdition
    );


    // Je récupère l'élément DOM du champ d'édition du nom de la task
    let taskItemEditNameInputElement = taskItemElement.querySelector('.task__name-edit');

    // J'ajoute l'écouteur d'événément au blur sur l'input de la task
    taskItemEditNameInputElement.addEventListener(
      'blur',
      taskItem.handleTaskTitle
    );

    // J'ajoute l'écouteur d'événément au keydown sur l'input de la task
    taskItemEditNameInputElement.addEventListener(
      'keydown',
      taskItem.handleTaskTitleEnterKey
    );


    let taskItemValidateButtonElement = taskItemElement.querySelector('.task__button--validate');

    taskItemValidateButtonElement.addEventListener(
      'click',
      taskItem.handleCompleteButtonClick
    );


    // Je récupère le bouton d'édition de ma task
    let taskItemEditButtonElement = taskItemElement.querySelector('.task__button--modify');

    // Je lui ajoute un écouteur d'événement de type click
    taskItemEditButtonElement.addEventListener(
      'click',
      taskItem.handleClickEdition
    );
  },

  /**
   * Handle click edition
   *
   * @param {Event} event Event object representation
   */
  handleClickEdition: function(event) {
    // Je récupère la task
    let taskItemElement = event.currentTarget.closest('.task');

    // J'ajoute la classe task--edit à mon élément DOM de task
    taskItemElement.classList.add('task--edit');

    // Je mets le curseur dans l'input que je viens d'afficher
    let taskItemEditInputElement = taskItemElement.querySelector('.task__name-edit');
    // Je force le positionnement du curseur dans le champ d'édition de la task
    taskItemEditInputElement.focus();
  },

  /**
   * Handle task edit input
   */
  handleTaskTitle: function(event) {
    let editInputElement = event.currentTarget;

    let newTaskName = editInputElement.value;

    // Je sors ma tâche du mode édition
    let taskElement = editInputElement.closest('.task');
    taskElement.classList.remove('task--edit');

    // Je modifie le texte de l'élément avec le nouveau nom de la tâche récupéré du champ d'édition
    let taskNameElement = taskElement.querySelector('.task__name-display');
    taskNameElement.textContent = newTaskName;
  },

  /**
   * Handle task keydown edit input
   */
  handleTaskTitleEnterKey: function(event) {
    if (event.key === "Enter") {
      taskItem.handleTaskTitle(event);
    }
  },

  /**
   * Handle task validation
   *
   * @param {Event} event Event object representation
   */
  handleCompleteButtonClick: function(event) {
    let taskItemValidateButtonElement = event.currentTarget;

    let taskItemElement = taskItemValidateButtonElement.closest('.task');

    taskItemElement.classList.remove('task--todo');
    taskItemElement.classList.add('task--complete');

    // Je remplis la barre de progression
    let taskItemProgressBarLevelElement = taskItemElement.querySelector('.progress-bar__level');
    taskItemProgressBarLevelElement.style.width = "100%";
  }
};
