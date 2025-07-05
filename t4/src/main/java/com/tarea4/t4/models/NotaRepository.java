package com.tarea4.t4.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NotaRepository extends JpaRepository<Nota, Integer> {

    @Query("SELECT AVG(n.nota) FROM Nota n WHERE n.actividad.id = :actividadId")
    Double promedioPorActividad(Integer actividadId);
}
