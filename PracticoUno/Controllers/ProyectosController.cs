using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PracticoUno.Data;
using PracticoUno.Models;

namespace PracticoUno.Controllers;

[Authorize]
public class ProyectosController : Controller
{
    private ApplicationDbContext _context;

    public ProyectosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Proyectos()
    {
        var selectListItems = new List<SelectListItem>
        {
            new SelectListItem { Value = "0", Text = "[SELECCIONE...]" }
        };

        // Obtener todas las opciones del enum
        var enumValues = Enum.GetValues(typeof(Estado)).Cast<Estado>();

        // Convertir las opciones del enum en SelectListItem
        selectListItems.AddRange(enumValues.Select(e => new SelectListItem
        {
            Value = e.GetHashCode().ToString(),
            Text = e.ToString().ToUpper()
        }));

        // Pasar la lista de opciones al modelo de la vista
        ViewBag.Estado = selectListItems.OrderBy(t => t.Text).ToList();

        return View();
    }

    public JsonResult ListadoProyectos(int? ProyectoID)
    {
        var listadoProyectos = _context.Proyectos.ToList();
        listadoProyectos = _context.Proyectos.OrderByDescending(l => l.FechaInicio).ToList();

        if (ProyectoID != null)
        {
            listadoProyectos = _context.Proyectos.Where(l => l.ProyectoID == ProyectoID).ToList();
        }

        return Json(listadoProyectos);
    }

    public JsonResult GuardarDatos(int ProyectoID, string Nombre, string Descripcion, DateTime FechaInicio, DateTime FechaFin, string Presupuesto, Estado Estado)
    {
        string resultado = "";

        if (ProyectoID == 0)
        {
            var nuevoProyecto = new Proyecto
            {
                Nombre = Nombre,
                Descripcion = Descripcion,
                FechaInicio = FechaInicio,
                FechaFin = FechaFin,
                Presupuesto = Presupuesto,
                Estado = Estado
            };
            _context.Add(nuevoProyecto);
            _context.SaveChanges();
            resultado = "Proyecto añadido correctamente";
        }
        else
        {
            var editarProyecto = _context.Proyectos.Where(e => e.ProyectoID == ProyectoID).SingleOrDefault();
            if (editarProyecto != null)
            {
                editarProyecto.Nombre = Nombre;
                editarProyecto.Descripcion = Descripcion;
                editarProyecto.FechaInicio = FechaInicio;
                editarProyecto.FechaFin = FechaFin;
                editarProyecto.Presupuesto = Presupuesto;
                editarProyecto.Estado = Estado;
                _context.SaveChanges();
                resultado = "Proyecto modificado correctamente";
            }

        }


        return Json(resultado);
    }

    public JsonResult EliminarProyecto(int ProyectoID)
    {
        var eliminarProyecto = _context.Proyectos.Find(ProyectoID);
        _context.Remove(eliminarProyecto);
        _context.SaveChanges();

        return Json(eliminarProyecto);
    }

}
