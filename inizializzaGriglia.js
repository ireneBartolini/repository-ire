/*
 * Funzione di callback
 */
function requestServer_callback( theXhr, element) {

	// verifica dello stato
	if ( theXhr.readyState === 2 ) {
    	// non faccio niente
    	// theElement.innerHTML = "Richiesta inviata...";
	}// if 2
	else if ( theXhr.readyState === 3 ) {
    	// non faccio niente
		// theElement.innerHTML = "Ricezione della risposta...";
	}// if 3
	else if ( theXhr.readyState === 4 ) {

		// verifica della risposta da parte del server
	        if ( theXhr.status === 200 ) {

	        	// operazione avvenuta con successo
	
		        element.innerHTML =theXhr.responseText;
				}

	        else {
	        	// errore di caricamento
	        	// non faccio niente nemmeno qui
	        }

	}// if 4

} // categoriaCallback();



/*
 * Imposta il contenuto testuale disponibile presso theUri
 * come src di un iframe all'interno dell'elemento theHolder del DOM
 * Non usa AJAX; per browser legacy
 */
function inizializzaGrigliaIframe(theUri,  dim, passi) {
	// qui faccio scaricare al browser direttamente il contenuto del feed come src dell'iframe.
	theHolder.innerHTML = '<iframe src="' + theUri + '" width="50%" height="50px">Il tuo browser non supporta gli iframe</iframe>';
	// non riesco tuttavia a intervenire per parsarlo! è il browser che renderizza l'src dell'iframe!
}// requestServerCalculationIframe()



/*
 * Imposta il contenuto testuale disponibile presso theUri
 * all'interno dell'elemento theHolder del DOM
 * Usa tecniche AJAX attrverso la XmlHttpRequest fornita in theXhr
 */
function inizializzaGrigliaAJAX(theXhr,  dim, passi, element) {
    
	// impostazione controllo e stato della richiesta
	theXhr.onreadystatechange = function() { requestServer_callback(theXhr,element); };

	// impostazione richiesta asincrona in GET
	// del file specificato
	try {
		theXhr.open("get", `grigliaServlet?d=${dim}&p=${passi}`, true);
        //theXhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	}
	catch(e) {
		// Exceptions are raised when trying to access cross-domain URIs 
		alert(e);
	}

	// invio richiesta
	//theXhr.send(JSON.stringify({number, operation}));
	theXhr.send();

} // requestServerCalculationAJAX()



/*
 * Scarica un contenuto testuale dall'uri fornito
 * e lo aggiunge al contenuto dell'elemento e del dom
 * Gestisce sia AJAX che il mancato supporto ad AJAX 
 */
function inizializzaGriglia(dim, passi, element) {

	// assegnazione oggetto XMLHttpRequest
	var xhr = myGetXmlHttpRequest();

	if ( xhr ) 
		inizializzaGrigliaAJAX(xhr,  dim, passi, element); 
	else 
		inizializzaGrigliaIframe(uri, dim, passi); 

}// caricaFeed()
