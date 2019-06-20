/* globals engine  */

document.addEventListener('DOMContentLoaded', function() {
  function pressed(e) {
    if (e.keyCode === 13) {
      engine.getData();
    }
  }

  $("#wiki-search-button").on("click", engine.getData.bind(engine));
  $("#wiki-search-random").on("click", engine.getRandomData.bind(engine));

  document.addEventListener("keypress", pressed);
});
