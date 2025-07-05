package com.tarea4.t4.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.tarea4.t4.models.Actividad;
import com.tarea4.t4.models.ActividadRepository;
import com.tarea4.t4.models.Nota;
import com.tarea4.t4.models.NotaRepository;

@Controller
public class NotaController {

    @Autowired
    private ActividadRepository actividadRepo;

    @Autowired
    private NotaRepository notaRepo;

    @GetMapping("/evaluar")
    public String verActividades(Model model) {
        List<Actividad> actividades = actividadRepo.findFinalizadas();

        Map<Integer, Double> promedios = new HashMap<>();
        for (Actividad actividad : actividades) {
            List<Nota> notas = actividad.getNotas();
            double promedio = 0;
            if (notas != null && !notas.isEmpty()) {
                promedio = notas.stream()
                                .mapToInt(Nota::getNota)
                                .average()
                                .orElse(0);
            }
            promedios.put(actividad.getId(), promedio);
        }

        model.addAttribute("actividades", actividades);
        model.addAttribute("promedios", promedios);
        return "notas";
    }

    @PostMapping("/evaluar")
    @ResponseBody
    public ResponseEntity<Double> agregarNota(@RequestParam Integer actividadId, @RequestParam Integer nota) {
        if (nota < 1 || nota > 7) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Actividad> opt = actividadRepo.findById(actividadId);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Nota nuevaNota = new Nota();
        nuevaNota.setActividad(opt.get());
        nuevaNota.setNota(nota);
        notaRepo.save(nuevaNota);

        Double nuevoPromedio = notaRepo.promedioPorActividad(actividadId);
        return ResponseEntity.ok(nuevoPromedio);
    }
}
