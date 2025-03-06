# Админ панель интернет магазина kicks club.

<details>
<summary>Технологии</summary>
<pre>
Typescript
Docker
Nuxt 3
REST API
Pinia
NuxtUI
MongoDb
</pre>
</details>

### Установка
* npm install

### Запуск
* docker compose up --build
* npm run dev

### Настройка
* Открыть сайт 
* Импортировать данные в коллекцию **orderstatuses** базы **kicks**
```
  [
    {
      "_id": {
        "$oid": "67c91c7e1071d83b1e13f1b8"
      },
      "ru": "Создан",
      "en": "Created"
    },
    {
      "_id": {
        "$oid": "67c91cd11071d83b1e13f1ba"
      },
      "ru": "Доставлен",
      "en": "Delivered"
    }
  ]
 ```
* Импортировать данные в коллекцию **settings** базы **kicks**
```
  {
      "_id": {
        "$oid": "67c8ffd3ca8971b34577ba49"
      },
      "image": "",
      "localeDashboard": {
        "value": "ru",
        "label": "Russian"
      },
      "localeStore": {
        "value": "ru",
        "label": "Russian"
      },
      "currency": {
        "label": "Russian ruble",
        "value": "rub"
      },
      "mainCurrency": {
        "label": "Russian ruble",
        "value": "rub"
      },
      "secondCurrencyRate": 1,
      "startOrderStatus": {
        "$oid": "67c91c7e1071d83b1e13f1b8"
      },
      "endOrderStatus": {
        "$oid": "67c91cd11071d83b1e13f1ba"
      },
      "en": {
        "title": "Marketplace",
        "phone": "+1112121212121",
        "email": "admin@english.com",
        "address": "WS, str",
        "description": "Description"
      },
      "ru": {
        "title": "Магазин",
        "phone": "+7999999999",
        "email": "admin@russian.ru",
        "address": "Москва",
        "description": "Описание"
      }
}
```
* Зарегистрироваться на сайте
* В базе **kicks** в коллекции **users** у зарегистрированного пользователя изменить значение поля **role** на **Admin**
* **Админка готова к наполнению**