<<<<<<< HEAD
# install nginx in aws
  sudo apt update    - to update system
  sudo apt install nginx  - to install nginx
  sudo systemctl start nginx 
  sudo systemctl enable nginx
  copy code from dist folder (build files) to /var/www/html
  sudo scp -r dist/*  /var/www/html 
  enable port 80 on your instance
 

 after make configuration then restart  