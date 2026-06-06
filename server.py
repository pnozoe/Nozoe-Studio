import http.server
import os
import posixpath
from urllib.parse import urlsplit

PORT = 3000
DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(DIR)


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    """Resuelve URLs limpias como Cloudflare Pages: /estudio -> estudio.html.

    Así el desarrollo local se comporta igual que producción, donde los
    enlaces internos ya no usan .html.
    """

    def _resolve_clean_url(self):
        parts = urlsplit(self.path)
        path = parts.path
        # Directorios (terminan en /) o rutas con extensión (assets) se dejan igual.
        if path.endswith('/') or '.' in posixpath.basename(path):
            return
        candidate = path + '.html'
        if os.path.isfile(self.translate_path(candidate)):
            self.path = candidate + (('?' + parts.query) if parts.query else '')

    def do_GET(self):
        self._resolve_clean_url()
        return super().do_GET()

    def do_HEAD(self):
        self._resolve_clean_url()
        return super().do_HEAD()


with http.server.HTTPServer(("", PORT), CleanURLHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}  (URLs limpias activas)")
    httpd.serve_forever()
