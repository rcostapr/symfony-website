# Symfony Website Template
Base template for build website
## Menu :smile: 
  - [🧐 Features](#-features-on-base-template-)
  - [🛠️ Installation](#️-installation-steps-)
    - [PHP Dependencies](#install-php-dependencies) 
    - [Javascript Dependencies](#javascript-dependencies) 
  - [🚀 Run the app](#-start-template---Run-the-app-)

## 🧐 Features on Base Template [🔝](#symfony-website-template)
- jQuery
- Bootstrap
- Fontawesome
- Toastr
- Sweet Alert
- Dropzone
- Select2
- Datatables

## 🛠️ Installation Steps [🔝](#symfony-website-template)

### Clone the repository
```bash
$ git clone https://github.com/rcostapr/symfony-website.git
```
### Change the working directory
```bash
$ cd symfony-website
```
### Install PHP Dependencies
```bash
$ composer install
```

### Production Install
```bash
$ composer install --no-dev --optimize-autoloader
$ APP_ENV=prod APP_DEBUG=0 php bin/console cache:clear
```
### Javascript Dependencies
```bash
$ yarn install
```

## APP Secret
### Create or Regenerate App Secret
```bash
$ php bin/console regenerate-app-secret
```
### Generate Secret Keys
```bash
php bin/console secrets:generate-keys
```

## 🚀 Start Template - Run the app [🔝](#symfony-website-template)
```bash
$ gulp watch
```
OR
```bash
$ npm start
```

🌟 You are all set!


## Email Sender

- symfony/mailer  instructions:

  * You're ready to send emails.

  * If you want to send emails via a supported email provider, install
    the corresponding bridge.
    For instance, composer require mailgun-mailer for Mailgun.

  * If you want to send emails asynchronously:

    1. Install the messenger component by running composer require messenger;
    2. Add 'Symfony\Component\Mailer\Messenger\SendEmailMessage': amqp to the
       config/packages/messenger.yaml file under framework.messenger.routing
       and replace amqp with your transport name of choice.

  * Read the documentation at https://symfony.com/doc/master/mailer.html