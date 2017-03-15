// Traduction de l'app
var language = window.navigator.language;

if (language == 'fr') {
  $('h1').html('Dessins');
  $('.epaisseur').html('Épaisseur');
  $('.effacer').html('Effacer');
  $('.enregistrer').html('Enregistrer');

} else if (language == 'es') {
  $('h1').html('Aplicación de dibujo');
  $('.epaisseur').html('Tamaño');
  $('.effacer').html('Claro');
  $('.enregistrer').html('Salvar');

} else if (language == 'it') {

  $('h1').html('App Disegno');
  $('.epaisseur').html('Dimensione');
  $('.effacer').html('Chiaro');
  $('.enregistrer').html('Salvare');

} else if (language == 'de') {
  $('h1').html('Zeichnung App');
  $('.epaisseur').html('Größe');
  $('.effacer').html('Klar');
  $('.enregistrer').html('Sparen');
}
// Fin traduction