'use strict';

class App extends React.Component {
  constructor(){
        super();
        this.state = {
        numeroPulsanti: 0, //(per riga)
        p: 0,
        num_vinte: 0,
        giocate:0,
        buttonColor: "yellow",
        esito: 0
        }
        this.onClick = this.onClick.bind(this); 
        this.scopriBomba= this.scopriBomba.bind(this);
        this.restart= this.restart.bind(this);
        }




onClick(e) {
       
       var d_ins= myGetElementById("d").value;
       var p_ins=myGetElementById("p").value;
      if(d_ins<=0)
      {
		  alert("Dimensione griglia deve essere >=0");
		  
	  }
	  
	  else  if(p_ins<3)
      {
		  alert("Numero minimo di passi:3");
		  
	  }
        else{  
			
			
			this.setState({
           numeroPulsanti: d_ins,
           p: p_ins,
           esito: 0
           });
           
           inizializzaGriglia(d_ins, p_ins, myGetElementById('controllo'));
       }               
};
  
scopriBomba(e){
	let button= e.target;
	let pos= e.target.name+"";
	
	rivelaCella (pos, button ,(calculated_result) => {
            this.setState({esito: calculated_result})} );
       
       if(this.state.esito===0) 
       {
       e.target.style.backgroundColor = 'blue';
      }
     
	/*FARLO QUA NON FUNZIONA PERCHE LO STATO ESITO CAMBIA DOPO TEMPO
	if(this.state.esito!=0)
	{
		 
		alert("Ricominciamo");
		this.setState({
           numeroPulsanti: 0, //reset
           giocate: this.state.giocate+1
           });
           
           if(this.state.esito===1)
           {
			this.setState({
            num_vinte: this.state.num_vinte+1
            
           });
			   
		   }
		   
		   
           
	}*/
	
};


restart(e)
{
	if(this.state.esito!=0)
	{
		 //reset
		alert("Ricominciamo");
		this.setState({
           numeroPulsanti: 0, //reset
           giocate: this.state.giocate+1
           });
           
           if(this.state.esito===1)
           {
			this.setState({
            num_vinte: this.state.num_vinte+1
            
           });
			   
		   }
		        
	}
}


  render() {
      return (

        < div className="griglia-body">
            <h1>CampoMinato</h1>
        <label>inserisci dimensione griglia </label><br></br>
        <input type="test" id="d" /><br></br>
        <label>inserisci numero di passi</label><br></br>
        <input type="test" id="p" /><br></br>
        <input type="submit" id="inizia" size="10" value="inizia" onClick={this.onClick}/>  
         <input type="submit" id="restart" size="10" value="restart" onClick={this.restart}/>  
         <br></br>
          <br></br>
         <Griglia numeroPulsanti={this.state.numeroPulsanti} buttonColor={this.state.buttonColor} scopriBomba={this.scopriBomba} />
          <div id="controllo" value=""></div>
           
           <Display giocate={this.state.giocate} num_vinte={this.state.num_vinte} />
</div>
      );
  }
}
