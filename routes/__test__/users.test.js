const request = require("supertest");
const { app } = require("../../app");

// Sign Up

it("returns a 201 on sucessful signup", async () => {
    return request(app)
        .post("/api/users/")
        .send({
            name: "john doe",
            email: "test@t2est.com",
            password: "password",
            isAdmin: true,
        })
        .expect(201);
});

// it("returns a 400 with an invalid email", async () => {
//     return request(baseUrl)
//         .post("/api/users/signup")
//         .send({
//             email: "testest.com",
//             password: "password",
//         })
//         .expect(400);
// });

// it("returns a 400 with an invalid password", async () => {
//     return request(app)
//         .post("/api/users/signup")
//         .send({
//             email: "test@test.com",
//             password: "p",
//         })
//         .expect(400);
// });

// it("returns a 400 with an missing email and password", async () => {
//     return request(app).post("/api/users/signup").send({}).expect(400);
// });

it("disallows duplicate emails", async () => {
    await request(app)
        .post("/api/users/")
        .send({
            name: "john doe",
            email: "test@test.com",
            password: "password",
            isAdmin: true,
        })
        .expect(201);

    await request(app)
        .post("/api/users/")
        .send({
            name: "john doe",
            email: "test@test.com",
            password: "password",
            isAdmin: true,
        })
        .expect(400);
});

// SignIn

it("fails when a email that does not exists is given", async () => {
    await request(app)
        .post("/api/users/login")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
    await request(app)
        .post("/api/users/")
        .send({
            name: "john doe",
            email: "test@t2est.com",
            password: "password",
            isAdmin: true,
        })
        .expect(201);

    await request(app)
        .post("/api/users/login")
        .send({
            email: "test@test.com",
            password: "afafwffefa",
        })
        .expect(400);
});

it("response with a authorization token with valid creadentials in header", async () => {
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

    expect(response.get("Authorization")).toBeDefined();
});
