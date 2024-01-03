#!/usr/bin/env python3

import http.server

if __name__ == "__main__":
    httpd = http.server.HTTPServer(('0.0.0.0', 8000), http.server.SimpleHTTPRequestHandler)
    httpd.serve_forever()
