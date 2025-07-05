package com.tarea4.t4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "actividad_tema")
public class ActividadTema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private TemaEnum tema;

    @Column(name = "glosa_otro")
    private String glosaOtro;

    @ManyToOne
    @JoinColumn(name = "actividad_id")
    private Actividad actividad;

    // Getters y setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public TemaEnum getTema() {
        return tema;
    }

    public void setTema(TemaEnum tema) {
        this.tema = tema;
    }

    public String getGlosaOtro() {
        return glosaOtro;
    }

    public void setGlosaOtro(String glosaOtro) {
        this.glosaOtro = glosaOtro;
    }

    public Actividad getActividad() {
        return actividad;
    }

    public void setActividad(Actividad actividad) {
        this.actividad = actividad;
    }
}
