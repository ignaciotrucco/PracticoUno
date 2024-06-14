namespace PracticoUno.Models;

public class Proyecto {
    public int ProyectoID {get; set;}
    public string? Nombre {get; set;}
    public string? Descripcion {get; set;}
    public DateTime FechaInicio {get; set;}
    public DateTime FechaFin {get; set;}
    public string? Presupuesto {get; set;}
    public Estado Estado {get; set;}
}

public enum Estado {
    Pendiente = 1,
    Desarrollo,
    Finalizado
}