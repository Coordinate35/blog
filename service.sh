if [ $1 == start ] ; then
    docker-compose -f docker-compose.yml up -d;
elif [ $1 == build-start ] ; then
    docker build -t coordinate35/production-blog-php:latest environment/php;
    docker build -t coordinate35/production-blog-redis:latest environment/redis;
    docker build -t coordinate35/production-blog-postgres:latest environment/postgres;
    docker build -t coordinate35/production-blog-phppgadmin:latest environment/phppgadmin;
    docker-compose -f docker-compose.yml up -d;
elif [ $1 == stop ] ; then
    docker stop blog_production-blog-php_1;
    docker stop blog_production-blog-postgres_1;
    docker stop blog_production-blog-redis_1;
    docker stop blog_production-blog-phppgadmin_1;
fi
