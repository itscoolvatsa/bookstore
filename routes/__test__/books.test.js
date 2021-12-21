const request = require("supertest");
const { app } = require("../../app");

it("return a valid book with a valid jwt token in the header", async () => {
    await request(app)
        .post("/api/users/")
        .send({
            name: "john doe",
            email: "test@test.com",
            password: "password",
            isAdmin: false,
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/login")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(200);

    await request(app)
        .get("/api/books")
        .set("authorization", response.headers.authorization)
        .expect(200);
});

// adding book
it("return adding book with a valid jwt token in the header with admin privilege", async () => {
    await request(app)
        .post("/api/users/")
        .send({
            name: "john doe",
            email: "test@test.com",
            password: "password",
            isAdmin: true,
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/login")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(200);

    await request(app)
        .post("/api/books")
        .set("authorization", response.headers.authorization)
        .send({
            name: "harry potter",
            author: "J.K Rowling",
            description: "a book about a wizard named harry",
            price: 200,
        })
        .expect(201);
});

it("return an error 400 adding book with a valid jwt token in the header without admin privilege", async () => {
    await request(app)
        .post("/api/users/")
        .send({
            name: "john doe",
            email: "test@test.com",
            password: "password",
            isAdmin: false,
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/login")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(200);

    await request(app)
        .post("/api/books")
        .set("authorization", response.headers.authorization)
        .send({
            name: "harry potter",
            author: "J.K Rowling",
            description: "a book about a wizard named harry",
            price: 200,
        })
        .expect(400);
});

// Get a book with id
it("return adding book with a valid jwt token in the header with admin privilege", async () => {
    await request(app)
        .post("/api/users/")
        .send({
            name: "john doe",
            email: "test@test.com",
            password: "password",
            isAdmin: true,
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/login")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(200);

    await request(app)
        .post("/api/books")
        .set("authorization", response.headers.authorization)
        .send({
            name: "harry potter",
            author: "J.K Rowling",
            description: "a book about a wizard named harry",
            price: 200,
        })
        .expect(201);

    const books = await request(app)
        .get("/api/books")
        .set("authorization", response.headers.authorization)
        .expect(200);

    const id = JSON.parse(books.text)[0]._id;

    await request(app)
        .get(`/api/books/${id}`)
        .set("authorization", response.headers.authorization)
        .expect(200);
});

// Update a book

it("return a valid response on updating book with a valid jwt token in the header with admin privilege", async () => {
    await request(app)
        .post("/api/users/")
        .send({
            name: "john doe",
            email: "test@test.com",
            password: "password",
            isAdmin: true,
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/login")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(200);

    await request(app)
        .post("/api/books")
        .set("authorization", response.headers.authorization)
        .send({
            name: "harry potter",
            author: "J.K Rowling",
            description: "a book about a wizard named harry",
            price: 200,
        })
        .expect(201);

    const books = await request(app)
        .get("/api/books")
        .set("authorization", response.headers.authorization)
        .expect(200);

    const id = JSON.parse(books.text)[0]._id;

    await request(app)
        .put(`/api/books/${id}`)
        .set("authorization", response.headers.authorization)
        .send({
            name: "2 States",
            author: "Chetan Bhagat",
            description: "a book written by chetan",
            price: 200,
        })
        .expect(200);
});

// Deleting a book

it("return a valid response on deleting book with a valid jwt token in the header with admin privilege", async () => {
    await request(app)
        .post("/api/users/")
        .send({
            name: "john doe",
            email: "test@test.com",
            password: "password",
            isAdmin: true,
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/login")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(200);

    await request(app)
        .post("/api/books")
        .set("authorization", response.headers.authorization)
        .send({
            name: "harry potter",
            author: "J.K Rowling",
            description: "a book about a wizard named harry",
            price: 200,
        })
        .expect(201);

    const books = await request(app)
        .get("/api/books")
        .set("authorization", response.headers.authorization)
        .expect(200);

    const id = JSON.parse(books.text)[0]._id;

    await request(app)
        .delete(`/api/books/${id}`)
        .set("authorization", response.headers.authorization)
        .expect(200);
});
