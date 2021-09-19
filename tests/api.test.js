const { app, connect_cache } = require("../app");
const supertest = require("supertest");

beforeEach(async () => {
  await connect_cache()
})

afterAll(() => {
  console.log("Tests Done. Hit Ctrl + C to end the application");
})

test("GET /", async () => {
  await supertest(app).get("/")
    .expect(200)
    .then((response) => {
      expect(response.text).toEqual("Codeyoung Translation Api v1.0")
    });
});

test("POST / Translate Object 1", async () => {
  const data = {
    q: "Hello",
    source: "en",
    target: "es"
  }
  const resp = {value:"Hola"};
  await supertest(app).post("/").send(data).expect(200)
    .then(async (response) => {
      expect(JSON.stringify(response.body)).toBe(JSON.stringify(resp));
    });
});

test("POST / Translate Object 2", async () => {
  const data = {
    q: "Hello",
    source: "en",
    target: "fr"
  }
  const resp = {value:"Bonjour"};
  await supertest(app).post("/").send(data).expect(200)
    .then(async (response) => {
      expect(JSON.stringify(response.body)).toBe(JSON.stringify(resp));
    });
});

test("POST / Invalid Target", async () => {
  let data = {
    q: "Hello",
    source: "en",
  };
  let resp = {error: '"target" is required'};
  await supertest(app).post("/").send(data).expect(400)
    .then(async (response) => {
      expect(JSON.stringify(response.body)).toBe(JSON.stringify(resp));
    });
});

test("POST / Invalid Source", async () => {
  let data = {
    q: "Hello",
    target: "en",
  };
  let resp = {error: '"source" is required'};
  await supertest(app).post("/").send(data).expect(400)
    .then(async (response) => {
      expect(JSON.stringify(response.body)).toBe(JSON.stringify(resp));
    });
});

test("POST / Invalid QueryString", async () => {
  let data = {
    source: "es",
    target: "en",
  };
  let resp = {error: '"q" is required'};
  await supertest(app).post("/").send(data).expect(400)
    .then(async (response) => {
      expect(JSON.stringify(response.body)).toBe(JSON.stringify(resp));
    });

})

