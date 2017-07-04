FROM php:7.0-apache
COPY config/php.ini /usr/local/etc/php/
RUN mkdir /var/log/php-fpm \
    && touch /var/log/php-fpm/php-fpm/log

