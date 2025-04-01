#!/bin/bash

# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install required packages
sudo apt-get install -y python3-pip python3-venv nginx postgresql postgresql-contrib certbot python3-certbot-nginx

# Create application directories
sudo mkdir -p /var/www/himalayanvidyadaan.org/{frontend,backend}

# Set up frontend
cd /var/www/himalayanvidyadaan.org/frontend
npm install
npm run build

# Set up backend
cd /var/www/himalayanvidyadaan.org/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate

# Set up Nginx configuration
sudo tee /etc/nginx/sites-available/himalayanvidyadaan.org << 'EOF'
# Frontend server
server {
    listen 80;
    server_name himalayanvidyadaan.org www.himalayanvidyadaan.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name himalayanvidyadaan.org www.himalayanvidyadaan.org;
    
    ssl_certificate /etc/letsencrypt/live/himalayanvidyadaan.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/himalayanvidyadaan.org/privkey.pem;
    
    location / {
        root /var/www/himalayanvidyadaan.org/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
}

# Backend API server
server {
    listen 80;
    server_name api.himalayanvidyadaan.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name api.himalayanvidyadaan.org;
    
    ssl_certificate /etc/letsencrypt/live/api.himalayanvidyadaan.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.himalayanvidyadaan.org/privkey.pem;
    
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /static/ {
        alias /var/www/himalayanvidyadaan.org/backend/staticfiles/;
    }
    
    location /media/ {
        alias /var/www/himalayanvidyadaan.org/backend/media/;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/himalayanvidyadaan.org /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Set up SSL certificates
sudo certbot --nginx -d himalayanvidyadaan.org -d www.himalayanvidyadaan.org --non-interactive --agree-tos -m your-email@example.com
sudo certbot --nginx -d api.himalayanvidyadaan.org --non-interactive --agree-tos -m tejashvikumawat@gmail.com

# Set up Gunicorn service
sudo tee /etc/systemd/system/gunicorn.service << 'EOF'
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/himalayanvidyadaan.org/backend
ExecStart=/var/www/himalayanvidyadaan.org/backend/venv/bin/gunicorn -c gunicorn.conf.py nss_app.wsgi:application

[Install]
WantedBy=multi-user.target
EOF

# Set permissions
sudo chown -R www-data:www-data /var/www/himalayanvidyadaan.org
sudo chmod -R 755 /var/www/himalayanvidyadaan.org

# Start and enable services
sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
sudo systemctl restart nginx

# Set up automatic SSL renewal
sudo certbot renew --dry-run

echo "Deployment completed successfully!" 