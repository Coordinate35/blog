FROM php:7.1.0-fpm
COPY php.ini /usr/local/etc/php/
RUN mkdir /var/log/php-fpm \
    && mkdir /mnt/blog/upload/article_image \
    && touch /var/log/php-fpm/php-fpm.log \
    && apt-get update \
    && apt-get install -y libpq-dev \
    && docker-php-ext-install -j$(nproc) pgsql \
    && docker-php-ext-enable pgsql

