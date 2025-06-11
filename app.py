from flask import Flask, request, render_template, redirect, url_for, session
from flask import jsonify
from sqlalchemy.orm import joinedload
from models import db, Actividad, Comuna


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Registra la app con la instancia de SQLAlchemy
db.init_app(app)

@app.route('/')
def portada():
    actividades = Actividad.query.order_by(Actividad.id.desc()).limit(5).all()
    return render_template('index.html', actividades=actividades)


@app.route("/agregar")
def agregar():
    return render_template("agregar.html")

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
                            joinedload(Actividad.contactos))  # <- importante
                   .paginate(page=pagina, per_page=por_pagina, error_out=False))

    actividades_json = []
    for act in actividades.items:
        actividades_json.append({
            "id": act.id,
            "region": act.comuna.region.nombre,
            "comuna": act.comuna.nombre,
            "sector": act.sector,
            "organizador": act.email,
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


if __name__ == '__main__':
    # Necesario para trabajar con SQLAlchemy fuera del contexto de una petición
    with app.app_context():
        db.create_all()  # Solo si necesitas crear las tablas, si no ya están, puedes omitirlo
    app.run(debug=True)