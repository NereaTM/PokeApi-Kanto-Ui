export async function translateText(texto: string, idiomaDestino: string = 'en') {
  
  if (!texto || texto === 'Descripción no disponible') {return texto;}

  const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(texto) + '&langpair=es|' + idiomaDestino;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {throw new Error('Error al traducir');}

  const datos = await respuesta.json();

  return datos.responseData.translatedText as string;
}