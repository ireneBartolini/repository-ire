function parsificaJSON( jsonText , callback, element) {
   
	// variabili di funzione
	var

		// Otteniamo la lista degli item dall'RSS 2.0 di edit
		item = JSON.parse(jsonText);
		
		if(item.esito!=0)
		{ 
		if(item.esito===-1)
		{
			element.style.backgroundColor="red";
		}
			
			alert("TERMINATA "+item.messaggio);
			callback(item.esito);
	
		   //n.b una volta fatta la call back non torna più qui e lla seconda istruzione non la fa
		//idea potrei mettere partita terminata 0 null se non terminata true vinta e false persa
		}


}// parsificaJSON()



/*
 * Funzione di callback
 */
function Mycallback( theXhr, element, callback, callback_win) {

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
	            parsificaJSON(theXhr.responseText, callback, element);
		       // element.innerHTML = "<strong>press</strong>";
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
function rilevaCellaIframe() {
	// qui faccio scaricare al browser direttamente il contenuto del feed come src dell'iframe.
	theHolder.innerHTML = '<iframe src=" + " width="50%" height="50px">Il tuo browser non supporta gli iframe</iframe>';
	// non riesco tuttavia a intervenire per parsarlo! è il browser che renderizza l'src dell'iframe!
}// requestServerCalculationIframe()



/*
 * Imposta il contenuto testuale disponibile presso theUri
 * all'interno dell'elemento theHolder del DOM
 * Usa tecniche AJAX attrverso la XmlHttpRequest fornita in theXhr
 */
function rivelaCellaAJAX(theXhr,  pos, element, callback, callback_win) {
    
	// impostazione controllo e stato della richiesta
	theXhr.onreadystatechange = function() { Mycallback(theXhr,element, callback); };

	// impostazione richiesta asincrona in GET
	// del file specificato
	try {
		theXhr.open("get", `giocoServlet?pos=${pos}`, true);
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
function rivelaCella( pos,element, callback) {

	// assegnazione oggetto XMLHttpRequest
	var xhr = myGetXmlHttpRequest();

	if ( xhr ) 
		rivelaCellaAJAX(xhr,  pos, element, callback); 
	else 
		rivelaCelleIframe(); 

}// caricaFeed()
