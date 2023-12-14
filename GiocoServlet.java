package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;

import com.google.gson.Gson;

import Beans.Risposta;
import Beans.Tabella;

public class GiocoServlet extends HttpServlet{
	
	public void service (ServletRequest request, ServletResponse response)
			throws ServletException, IOException {
		
		        Gson gson= new Gson();
				String pos= request.getParameter("pos");
				String[] items= pos.split(",");
				int x=0;
				int y=0;
				
				try{
					 x= Integer.parseInt(items[0]);
					 y= Integer.parseInt(items[1]);
				}catch(NumberFormatException e)
				{
					System.out.println("errore Parse");
					
				}
				System.out.println("\npremuto pulsante: "+x+","+y);
				
				Tabella tab= (Tabella) this.getServletContext().getAttribute("griglia");
				PrintWriter out= response.getWriter();
				char ch= tab.getCell(x, y);
				int cont= (int)this.getServletContext().getAttribute("passiMancanti");
				
				Risposta result= new Risposta();
				cont--;
				this.getServletContext().setAttribute("passiMancanti", cont);
				
				if(ch=='?' && cont==0)
				{
					result.setMessaggio("Partita terminata: HAI VINTO percorso completato! ");
					result.setPartitaTerminata(true);
					result.setVinta(true);
					result.setEsito(1);
				}
				if(ch=='B')
				{
					System.out.println("\nE' una BOMBA");
					result.setMessaggio("Partita terminata: SEI STATO BAMBATO percorso non completato! ");
					result.setPartitaTerminata(true);
					result.setVinta(false);
			        result.setEsito(-1);
				}
				else
				{
					System.out.println("\nNON  una BOMBA, passi mancanti"+ cont);
				}
				
				String r= gson.toJson(result);
				System.out.print(r);
				
				out.println(r);
			 
			}
}
