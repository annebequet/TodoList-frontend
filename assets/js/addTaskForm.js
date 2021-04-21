// Module qui gère le formulaire d'ajout de task
let addTaskForm = {
  /**
   * Initilialize the module
   */
  init: function() {
    // Je récupère le formulaire d'ajout d'une task
    let addTaskFormElement = document.querySelector('.task--add form');

    // Je lui ajoute un écouteur d'événement de type submit
    addTaskFormElement.addEventListener(
      'submit',
      addTaskForm.handleAddTaskFormSubmit
    );
  },

  /**
   * Handle add task form submit
   *
   * @param {Event} event Event object representation
   */
  handleAddTaskFormSubmit: function(event) {
    // J'annule le comportement par défaut de la soumission du formulaire
    event.preventDefault();

    // Récupération des données du formulaire
    let addTaskFormElement = event.currentTarget;

    // Je récupère la valeur du champ task name
    let taskNameInputElement = addTaskFormElement.querySelector('.task__name-edit');
    let name = taskNameInputElement.value;

    // Je récupère la valeur du champ task category
    let taskCategorySelectElement = addTaskFormElement.querySelector('.task__category select');
    let category = taskCategorySelectElement.value;

    /*
    // Avec la classe FormData :
    let addTaskFormData = new FormData(addTaskFormElement);
    name = addTaskFormData.get('name');
    category = addTaskFormData.get('category');
    */

    // BONUS : Valider les données du formulaire

    // Je demande à la liste d'ajouter la nouvelle task
    taskList.addTask(name, category);

    // Je remets à 0 les valeurs de mon formulaire
    addTaskFormElement.reset();

    // Je place le curseur dans le champ nom du formulaire
    // taskNameInputElement.focus();
  }
};
