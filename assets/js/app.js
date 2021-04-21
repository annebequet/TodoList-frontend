let app = {
  /**
   * Initialize the app
   */
  init: function() {
    console.log('init');

    let getCategoryListPromise = categoryList.load();
    // Je charge les tasks.
    getCategoryListPromise.then(taskList.load);

    // Sachant que la liste des tâches est vide au démarrage de l'application, exécuter la méthode init de taskList n'est plus utile

    addTaskForm.init();
  }
};

// J'exécute la fonction d'initialisation de mon module lorsque le DOM est totalement chargé
document.addEventListener('DOMContentLoaded', app.init);
