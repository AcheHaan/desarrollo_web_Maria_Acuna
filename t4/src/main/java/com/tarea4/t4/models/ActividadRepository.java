package com.tarea4.t4.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {

    @Query("SELECT a FROM Actividad a WHERE a.diaHoraTermino IS NOT NULL AND a.diaHoraTermino < :ahora")
    List<Actividad> findFinalizadas(LocalDateTime ahora);

    default List<Actividad> findFinalizadas() {
        return findFinalizadas(LocalDateTime.now());
    }
}
