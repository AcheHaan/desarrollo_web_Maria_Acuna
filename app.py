from flask import Flask, request, render_template, redirect, url_for, session
from flask import jsonify
from sqlalchemy import func
from sqlalchemy.orm import joinedload
from models import db, Actividad, Comuna, ActividadTema, ContactarPor, Foto, Region, Comentario
from werkzeug.utils import secure_filename
import os
from datetime import datetime


UPLOAD_FOLDER = os.path.join("static", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def portada():
    actividades = Actividad.query.order_by(Actividad.id.desc()).limit(5).all()
    return render_template('index.html', actividades=actividades)


@app.route("/agregar")
def agregar():
    regiones = Region.query.order_by(Region.nombre).all()
    return render_template("agregar.html", regiones=regiones)

@app.route("/listado")
def listado():
    return render_template("listado.html")

@app.route("/estadisticas")
def estadisticas():
    return render_template("estadisticas.html")


@app.route("/tarea2/actividad")
def api_actividades():
    pagina = request.args.get("pagina", default=1, type=int)
    por_pagina = 5

    actividades = (Actividad.query
                   .options(joinedload(Actividad.comuna).joinedload(Comuna.region),
                            joinedload(Actividad.fotos),
                            joinedload(Actividad.temas),
                            joinedload(Actividad.contactos))
                   .paginate(page=pagina, per_page=por_pagina, error_out=False))

    actividades_json = []
    for act in actividades.items:
        actividades_json.append({
            "id": act.id,
            "region": act.comuna.region.nombre,
            "comuna": act.comuna.nombre,
            "sector": act.sector,
            "email": act.email,
            "celular": act.celular,
            "contactarPor": [
                {"nombre": cp.nombre, "identificador": cp.identificador}
                for cp in act.contactos
            ],
            "inicio": act.dia_hora_inicio.strftime("%Y-%m-%d %H:%M"),
            "termino": act.dia_hora_termino.strftime("%Y-%m-%d %H:%M") if act.dia_hora_termino else None,
            "descripcion": act.descripcion,
            "tema": act.temas[0].tema if act.temas else "-",
            "temaOtro": act.temas[0].glosa_otro if act.temas and act.temas[0].tema == "otro" else None,
            "nombre": act.nombre,
            "fotos": [foto.ruta for foto in act.fotos]
        })

    return jsonify({
        "actividades": actividades_json,
        "total_paginas": actividades.pages,
        "pagina_actual": actividades.page
    })

@app.route("/guardar_actividad", methods=["POST"])
def guardar_actividad():
    print("Formulario recibido")
    errores = []

    # === Validación del lado del servidor ===
    comuna_id = request.form.get("comuna")
    nombre = request.form.get("nombre")
    email = request.form.get("email")
    celular = request.form.get("celular")
    sector = request.form.get("sector")
    contactar = request.form.get("contactar")
    contactar_info = request.form.get("contactar-info")
    fecha_inicio = request.form.get("fecha-inicio")
    fecha_fin = request.form.get("fecha-fin")
    descripcion = request.form.get("descripcion")
    tema = request.form.get("tema")
    otro_tema = request.form.get("otro-tema")

    fotos = request.files.getlist("foto")

    if not all([comuna_id, nombre, email, fecha_inicio, tema]):
        errores.append("Faltan campos obligatorios.")

    if not fotos:
        errores.append("Debe subir al menos una foto.")

    try:
        dt_inicio = datetime.strptime(fecha_inicio, "%Y-%m-%dT%H:%M")
        dt_fin = datetime.strptime(fecha_fin, "%Y-%m-%dT%H:%M") if fecha_fin else None
    except ValueError:
        errores.append("Fechas inválidas.")

    if errores:
        regiones = Region.query.order_by(Region.nombre).all()
        return render_template("agregar.html", errores=errores, regiones=regiones)

    actividad = Actividad(
        comuna_id=int(comuna_id),
        sector=sector,
        nombre=nombre,
        email=email,
        celular=celular,
        dia_hora_inicio=dt_inicio,
        dia_hora_termino=dt_fin,
        descripcion=descripcion
    )
    db.session.add(actividad)
    db.session.flush()

    tema_entry = ActividadTema(
        tema=tema,
        glosa_otro=otro_tema if tema == "otro" else None,
        actividad_id=actividad.id
    )
    db.session.add(tema_entry)

    if contactar and contactar_info:
        contacto = ContactarPor(
            nombre=contactar,
            identificador=contactar_info,
            actividad_id=actividad.id
        )
        db.session.add(contacto)

    for foto in fotos:
        if foto and foto.filename:
            nombre_archivo = secure_filename(foto.filename)
            ruta = f"{actividad.id}_{nombre_archivo}"
            foto.save(os.path.join(UPLOAD_FOLDER, ruta))

            nueva_foto = Foto(
                ruta_archivo=ruta,
                nombre_archivo=nombre_archivo,
                actividad_id=actividad.id
            )
            db.session.add(nueva_foto)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return f"Ocurrió un error al guardar en la base de datos: {e}"

    return redirect(url_for("portada"))

@app.route("/api/comunas/<int:region_id>")
def obtener_comunas(region_id):
    comunas = Comuna.query.filter_by(region_id=region_id).all()
    comunas_json = [{"id": c.id, "nombre": c.nombre} for c in comunas]
    return jsonify(comunas_json)


@app.route("/api/estadisticas/por-dia")
def estadisticas_por_dia():
    resultados = (
        db.session.query(func.date(Actividad.dia_hora_inicio), func.count())
        .group_by(func.date(Actividad.dia_hora_inicio))
        .all()
    )
    datos = [{"fecha": fecha.strftime("%d/%m"), "cantidad": cantidad} for fecha, cantidad in resultados]
    return jsonify(datos)

@app.route("/api/estadisticas/por-tipo")
def estadisticas_por_tipo():
    resultados = (
        db.session.query(ActividadTema.tema, func.count())
        .group_by(ActividadTema.tema)
        .all()
    )
    datos = [{"tema": tema, "cantidad": cantidad} for tema, cantidad in resultados]
    return jsonify(datos)

@app.route("/api/estadisticas/por-horario")
def estadisticas_por_horario():
    actividades = Actividad.query.all()

    conteo = {}
    for act in actividades:
        mes = act.dia_hora_inicio.strftime("%B")
        hora = act.dia_hora_inicio.hour

        momento = (
            "mañana" if 6 <= hora < 12 else
            "mediodía" if 12 <= hora < 18 else
            "tarde"
        )

        if mes not in conteo:
            conteo[mes] = {"mañana": 0, "mediodía": 0, "tarde": 0}

        conteo[mes][momento] += 1

    datos = [{"mes": mes, **momentos} for mes, momentos in conteo.items()]
    return jsonify(datos)


@app.route("/tarea2/comentarios/<int:actividad_id>")
def obtener_comentarios(actividad_id):
    comentarios = Comentario.query.filter_by(actividad_id=actividad_id)\
                    .order_by(Comentario.fecha.desc()).all()
    return jsonify([{
      "nombre": c.nombre,
      "texto": c.texto,
      "fecha": c.fecha.strftime("%Y-%m-%d %H:%M")
    } for c in comentarios])

@app.route("/tarea2/comentario/agregar", methods=["POST"])
def agregar_comentario():
    data = request.get_json()
    nombre = data.get("nombre", "").strip()
    texto = data.get("texto", "").strip()
    actividad_id = data.get("actividad_id")

    if not (3 <= len(nombre) <= 80):
        return jsonify({"success": False, "error": "Nombre debe tener entre 3 y 80 caracteres."})
    if len(texto) < 5:
        return jsonify({"success": False, "error": "Comentario debe tener al menos 5 caracteres."})

    nuevo = Comentario(
        nombre=nombre,
        texto=texto,
        fecha=datetime.now(),
        actividad_id=actividad_id
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({"success": True})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)