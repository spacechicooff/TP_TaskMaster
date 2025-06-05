# Utilise une image légère de serveur web
FROM nginx:alpine

# Supprime les fichiers par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie les fichiers de ton app vers le dossier public de Nginx
COPY . /usr/share/nginx/html

# Expose le port 80
EXPOSE 80
