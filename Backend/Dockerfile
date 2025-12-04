# Use the official PHP image with FPM
FROM php:8.1-fpm

# Install necessary extensions and utilities
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql

# Set the working directory
WORKDIR /var/www/html

# Copy the existing application directory
COPY . .

# Set permissions for storage and bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose the port on which the app runs
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]