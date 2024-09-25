# React + Vite - Blog

Laravel 11 React app for Blog Application

## Setup

```
git clone https://github.com/chameeracd/laravel-react-blog.git
cd laravel-react-blog
composer update
composer install
composer run-script post-root-package-install
php artisan key:generate
```
update ``.env`` file to configure db credentials

run;
```
php artisan migrate
php artisan db:seed
php artisan storage:link
```
### frontend
```
cd react-client
npm install
cp .env.example .env 
```

from base dir : ``php artisan serve`` [backend]

from react-client dir : ``npm run dev`` [frontend]

application will be loaded on ``http://localhost:3000/``

blog feed ``http://localhost:3000/posts``

login ``http://localhost:3000/login``

### default admin credentials [able to manage users]
```
email: admin@example.com
password: password
```