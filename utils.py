import html

def sanitizar_texto(texto):
    if not texto:
        return ""
    return html.escape(texto.strip())
