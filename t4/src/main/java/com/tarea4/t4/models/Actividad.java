package com.tarea4.t4.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "actividad")
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "comuna_id", nullable = false)
    private Comuna comuna;

    @Column(length = 100)
    private String sector;

    @Column(length = 200, nullable = false)
    private String nombre;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 15)
    private String celular;

    @Column(name = "dia_hora_inicio", nullable = false)
    private LocalDateTime diaHoraInicio;

    @Column(name = "dia_hora_termino")
    private LocalDateTime diaHoraTermino;

    @Column(length = 500)
    private String descripcion;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<Nota> notas;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<ActividadTema> temas;


    public Actividad() {}


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public LocalDateTime getDiaHoraInicio() {
        return diaHoraInicio;
    }

    public void setDiaHoraInicio(LocalDateTime diaHoraInicio) {
        this.diaHoraInicio = diaHoraInicio;
    }

    public LocalDateTime getDiaHoraTermino() {
        return diaHoraTermino;
    }

    public void setDiaHoraTermino(LocalDateTime diaHoraTermino) {
        this.diaHoraTermino = diaHoraTermino;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<Nota> getNotas() {
        return notas;
    }

    public void setNotas(List<Nota> notas) {
        this.notas = notas;
    }
    
    public List<ActividadTema> getTemas() {
    return temas;
    }

    public String getNombresTemas() {
        if (temas == null || temas.isEmpty()) return "-";
        return temas.stream()
                    .map(ActividadTema::getNombreTema)
                    .collect(java.util.stream.Collectors.joining(", "));
    }

    public void setTemas(List<ActividadTema> temas) {
        this.temas = temas;
    }
}
