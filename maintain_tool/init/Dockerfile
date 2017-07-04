FROM richarvey/nginx-php-fpm

COPY config/nginx/gp-vote /etc/nginx/sites-available/
COPY app /var/www/gp-vote/

RUN rm -rf /etc/nginx/sites-available/default \
    && rm -rf /etc/nginx/sites-enabled/default \
    && ln -s /etc/nginx/sites-available/gp-vote /etc/nginx/sites-enabled/gp-vote