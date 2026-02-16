import http.server
import socketserver
import os

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.path = 'html/index.html'  # Serve index.html from the html directory for root URL
        return super().do_GET()

if __name__ == "__main__":
    PORT = 8000
    web_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))  # Serve the entire project directory
    os.chdir(web_dir)

    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serving HTTP on port {PORT} (http://localhost:{PORT}/) ...")
        httpd.serve_forever()