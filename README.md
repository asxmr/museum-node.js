# 🖼️ Museum Node API – Black & White Photo Museum

## Projectbeschrijving
Dit project is een **database-driven REST API** voor een digitaal **zwart-wit fotomuseum**.  
De API werd ontwikkeld met **Node.js (20+)**, **Express**, **Prisma** en **SQLite** en focust volledig op backend-functionaliteit.

Het project voldoet aan alle **functionele en technische vereisten** van de opdracht en biedt een duidelijke, uitbreidbare API-structuur voor het beheren van fotoalbums en foto’s.

---

## 🚀 Functionaliteiten

### Entiteiten
- **Albums**
- **Photos**

Voor beide entiteiten is volledige **CRUD-functionaliteit** geïmplementeerd.

### Features
- CRUD voor 2 entiteiten
- Database-driven API (SQLite via Prisma)
- Basisvalidatie met **Zod**
- Paginatie via **limit** & **offset**
- Zoeken via **search**
- Sorteren via **sort** & **order**
- Filteren van foto’s op **albumId**
- HTML-documentatiepagina op de root (`/`)
- Serveren van lokale foto’s via een static route

---

## ⚙️ Installatie & gebruik

### 1️⃣ Repository clonen
```bash
git clone https://github.com/asxmr/museum-node.js.git
cd museum-node.js
````

### 2️⃣ Dependencies installeren

```bash
npm install
```

### 3️⃣ Database opzetten en vullen

```bash
npx prisma migrate dev
npx prisma db seed
```

### 4️⃣ Server starten

```bash
npm run dev
```

De API draait op:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📄 Root documentatie

### `GET /`

Toont een eenvoudige HTML-pagina met:

* een overzicht van alle beschikbare endpoints
* de ondersteunde query parameters

---

## 🔗 Endpoints

### 📁 Albums

```http
GET    /albums?limit=20&offset=0&search=term&sort=createdAt&order=desc
GET    /albums/:id
POST   /albums
PUT    /albums/:id
DELETE /albums/:id
```

**Body (POST / PUT):**

```json
{
  "title": "Urban Portraits",
  "description": "Mensen, stad, momenten"
}
```

---

### 🖼️ Photos

```http
GET    /photos?limit=10&offset=0&search=term&sort=createdAt&order=desc&albumId=1
GET    /photos/:id
POST   /photos
PUT    /photos/:id
DELETE /photos/:id
```

**Body (POST / PUT):**

```json
{
  "title": "Heart in Nature",
  "url": "http://localhost:3000/static/photos/photo-03.jpeg",
  "cameraModel": "iPhone",
  "albumId": 1
}
```

---

## 🗂️ Statische foto’s

De API serveert lokale foto’s via een static route.

**Voorbeeld:**

```
http://localhost:3000/static/photos/photo-03.jpeg
```

**Bestandslocatie:**

```
/public/photos
```

---

## ❌ Error handling

De API gebruikt een consistent JSON error-formaat.

**Voorbeeld:**

```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": "body.title",
      "message": "title moet minstens 2 karakters hebben"
    }
  ]
}
```

---

## 📚 Bronnen

Tijdens het ontwikkelen van deze API werden volgende online bronnen geraadpleegd voor documentatie, voorbeelden en best practices.
De gebruikte code werd telkens **begrepen en aangepast** aan dit project.

### Documentatie & officiële bronnen

* Express. (z.d.). *Express documentation* — [https://expressjs.com](https://expressjs.com)
* Prisma. (z.d.). *Prisma documentation* — [https://www.prisma.io/docs](https://www.prisma.io/docs)
* Node.js. (z.d.). *Node.js documentation* — [https://nodejs.org/en/docs](https://nodejs.org/en/docs)
* Zod. (z.d.). *Zod documentation* — [https://zod.dev](https://zod.dev)

### Tutorials & artikelen

* MDN Web Docs. (z.d.). *Express/Node.js guides* — [https://developer.mozilla.org](https://developer.mozilla.org)
* LogRocket. (z.d.). *Building REST APIs with Node.js and Express* — [https://blog.logrocket.com](https://blog.logrocket.com)
* DigitalOcean. (z.d.). *How To Build a REST API with Node.js* — [https://www.digitalocean.com/community](https://www.digitalocean.com/community)

### Video tutorials (YouTube)

* Traversy Media — [https://www.youtube.com/@TraversyMedia](https://www.youtube.com/@TraversyMedia)
* The Net Ninja — [https://www.youtube.com/@NetNinja](https://www.youtube.com/@NetNinja)
* Academind — [https://www.youtube.com/@Academind](https://www.youtube.com/@Academind)

### Database

* SQLite. (z.d.). *SQLite documentation* — [https://www.sqlite.org/docs.html](https://www.sqlite.org/docs.html)

---

## 🎥 Screencast

HIER VOEG IK STRAKS HET LINK

---

## 👤 Auteur

**Rania Azaoum**

---

## 🎓 Opleiding
Student **2de jaar Toegepaste Informatica**  
**Erasmushogeschool Brussel (EhB)**


