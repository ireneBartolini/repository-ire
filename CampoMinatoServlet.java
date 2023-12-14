package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;

import com.google.gson.Gson;

import Beans.Tabella;


public class CampoMinatoServlet extends HttpServlet{

	@Override
	public void init() {
		Tabella tab= new Tabella();
	  this.getServletContext().setAttribute("griglia", tab);
		
	  int passiMancanti=0; 
	  this.getServletContext().setAttribute("passiMancanti", passiMancanti);
	}
	
	public void service (ServletRequest request, ServletResponse response)
	throws ServletException, IOException {
		String d= request.getParameter("d");
		String p= request.getParameter("p");
		int dim=0;
		int passi=0;
		
		PrintWriter out= response.getWriter();
		try{
			 dim= Integer.parseInt(d);
			 passi= Integer.parseInt(p);
		}catch(NumberFormatException e)
		{
			out.println("errore Parse");
			
		}
		
		this.getServletContext().setAttribute("passiMancanti", passi);
        Tabella tab= (Tabella) this.getServletContext().getAttribute("griglia");
		tab.setDIM(dim);
		tab.setP(passi);
		this.getServletContext().setAttribute("griglia", tab);
		System.out.println(tab.toString());
		
		out.println("griglia inizializzata: dim "+dim+" passi "+passi);
	
	}
	

	
}

