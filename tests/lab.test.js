const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");
const Lab = require("../models/Lab");
const generateToken = require("../utils/generateToken");

let token;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.create({ email: "franci@teste", password: "123456" });
    token = generateToken(user._id);
});

afterAll(async () => {
    await User.deleteMany();
    await Lab.deleteMany();
    await mongoose.disconnect();
});

describe("Laboratório API", () => {
    it("GET /api/laboratorio deve retornar status 200", async () => {
        const res = await request(app).get("/api/laboratorio");
        expect(res.statusCode).toBe(200);
    });

    it("POST /api/laboratorio/novo, falhar sem token", async () => {
        const res = await request(app)
            .post("/api/laboratorio/novo")
            .send({ nome: "Lab Test", descricao: "desc", capacidade: 10 });
        expect(res.statusCode).toBe(401);
    });

    it("POST /api/laboratorio/novo, criar com token válido (sem foto)", async () => {
        const res = await request(app)
            .post("/api/laboratorio/novo")
            .set("Authorization", `Bearer ${token}`)
            .send({ nome: "Lab Test", descricao: "desc", capacidade: 20 });
        expect(res.statusCode).toBe(201);
        expect(res.body.nome).toBe("Lab Test");
    });

    it("POST /api/laboratorio/novo, criar com token válido e foto", async () => {
        const res = await request(app)
            .post("/api/laboratorio/novo")
            .set("Authorization", `Bearer ${token}`)
            .attach("foto", Buffer.from("imagem de teste"), "foto.jpg")
            .field("nome", "Lab Test")
            .field("descricao", "desc")
            .field("capacidade", 20);
        expect(res.statusCode).toBe(201);
        expect(res.body.nome).toBe("Lab Test");
    });

    it("GET /api/laboratorio/relatorio, falhar fora dos dias úteis", async () => {
        const originalDate = Date;
        global.Date = class extends Date {
            constructor() {
                super();
                return new originalDate("2024-05-12");
            }
        };

        const res = await request(app)
            .get("/api/laboratorio/relatorio")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(403);
        global.Date = originalDate;
    });

    it("GET /api/laboratorio/relatorio deve retornar status 200 em dia útil", async () => {
        const originalDate = Date;
        global.Date = class extends Date {
            constructor() {
                super();
                return new originalDate("2024-05-10"); // Sexta-feira
            }
        };

        const res = await request(app)
            .get("/api/laboratorio/relatorio")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        global.Date = originalDate;
    });
});
