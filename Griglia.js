'use strict';

class Griglia extends React.Component {

constructor(){
	super();
}

render(){
	let buttonColor= this.props.buttonColor;
	    // Numero totale di pulsanti
    const numeroPulsanti = this.props.numeroPulsanti;
    let count= 0;
    // Array vuoto per contenere i pulsanti
    const pulsanti = [];
//for(let j=0, j<dim)
    // Ciclo for per generare i pulsanti
    for(let j=0; j<numeroPulsanti; j++)
    {
    for (let i = 0; i <numeroPulsanti; i++) {
    
      pulsanti.push(
        <button key={count} style={{ backgroundColor: buttonColor}} name={j+","+i} className="pulsante" onClick={this.props.scopriBomba}  bgcolor="#FFFF00" >
         ({j},{i})
        </button>
      );
      count++;
    }
    pulsanti.push(<br></br>);
}
    return <div className="griglia-pulsanti">{pulsanti}</div>;
  }
}




