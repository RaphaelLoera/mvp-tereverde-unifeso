import express, { type Request, type Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { connection, prisma } from "./src/db.js";

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(express.static("public"));
connection();


app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const match = await bcrypt.compare(password, user.senha);
    if (!match) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email and password are required" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user?.email) {
      res.status(409).json({ error: "Email already exists" });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        senha: hash,
        isAdmin: false,
      },
    });

    console.log(`✅ Usuário cadastrado com sucesso: ${newUser.email}`);
    res.status(201).json({
      message: "Cadastrado com sucesso!",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

app.get("/usuarios", async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.user.findMany({
      orderBy: [{ isAdmin: "desc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      },
    });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/usuarios/:id/admin", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;

    if (typeof isAdmin !== "boolean") {
      res.status(400).json({ error: "isAdmin must be a boolean" });
      return;
    }

    const usuario = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isAdmin,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      },
    });

    res.status(200).json({
      message: isAdmin
        ? "Usuário promovido para admin"
        : "Admin removido com sucesso",
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/trilhas", async (req: Request, res: Response) => {
  try {
    const trilhas = await prisma.trilha.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(trilhas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/trilhas", async (req: Request, res: Response) => {
  try {
    const {
      titulo,
      descricao,
      nivel,
      distanciaKm,
      diasDaTrilha,
      tempoAproximado,
      imagemNome,
      imagemBase64,
    } = req.body;

    if (
      !titulo ||
      !descricao ||
      !nivel ||
      !distanciaKm ||
      !diasDaTrilha ||
      !tempoAproximado ||
      !imagemBase64
    ) {
      res.status(400).json({
        error:
          "Titulo, descricao, nivel, distancia, dias, tempo aproximado e imagem sao obrigatorios",
      });
      return;
    }

    const trilha = await prisma.trilha.create({
      data: {
        titulo,
        descricao,
        nivel,
        distanciaKm: Number(distanciaKm),
        diasDaTrilha: Number(diasDaTrilha),
        tempoAproximado,
        imagemNome: imagemNome || null,
        imagemBase64,
      },
    });

    res.status(201).json({ message: "Trilha cadastrada com sucesso", trilha });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/trilhas/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      descricao,
      nivel,
      distanciaKm,
      diasDaTrilha,
      tempoAproximado,
      imagemNome,
      imagemBase64,
    } = req.body;

    if (
      !titulo ||
      !descricao ||
      !nivel ||
      !distanciaKm ||
      !diasDaTrilha ||
      !tempoAproximado ||
      !imagemBase64
    ) {
      res.status(400).json({
        error:
          "Titulo, descricao, nivel, distancia, dias, tempo aproximado e imagem sao obrigatorios",
      });
      return;
    }

    const trilha = await prisma.trilha.update({
      where: {
        id,
      },
      data: {
        titulo,
        descricao,
        nivel,
        distanciaKm: Number(distanciaKm),
        diasDaTrilha: Number(diasDaTrilha),
        tempoAproximado,
        imagemNome: imagemNome || null,
        imagemBase64,
      },
    });

    res.status(200).json({ message: "Trilha atualizada com sucesso", trilha });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/trilhas/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await prisma.trilha.deleteMany({
      where: {
        id,
      },
    });

    if (result.count === 0) {
      res.status(404).json({ error: "Trilha não encontrada" });
      return;
    }

    res.status(200).json({ message: "Trilha excluída com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/eventos", async (req: Request, res: Response) => {
  try {
    const eventos = await prisma.evento.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const eventosComStatus = eventos.map((evento) => ({
      ...evento,
      encerrado:
        evento.encerrado ||
        (evento.fimEm ? new Date(evento.fimEm) < new Date() : false),
    }));

    res.status(200).json(eventosComStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/eventos", async (req: Request, res: Response) => {
  try {
    const {
      titulo,
      descricao,
      endereco,
      inicioEm,
      fimEm,
      imagemNome,
      imagemBase64,
    } = req.body;

    if (
      !titulo ||
      !descricao ||
      !endereco ||
      !inicioEm ||
      !fimEm ||
      !imagemBase64
    ) {
      res.status(400).json({
        error:
          "Titulo, descricao, endereco, inicio, fim e imagem sao obrigatorios",
      });
      return;
    }

    const inicioDate = new Date(inicioEm);
    const fimDate = new Date(fimEm);

    if (Number.isNaN(inicioDate.getTime()) || Number.isNaN(fimDate.getTime())) {
      res.status(400).json({ error: "Datas invalidas" });
      return;
    }

    const evento = await prisma.evento.create({
      data: {
        titulo,
        descricao,
        endereco,
        inicioEm: inicioDate,
        fimEm: fimDate,
        encerrado: fimDate < new Date(),
        imagemNome: imagemNome || null,
        imagemBase64,
      },
    });

    res.status(201).json({ message: "Evento cadastrado com sucesso", evento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/eventos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      descricao,
      endereco,
      inicioEm,
      fimEm,
      imagemNome,
      imagemBase64,
    } = req.body;

    if (
      !titulo ||
      !descricao ||
      !endereco ||
      !inicioEm ||
      !fimEm ||
      !imagemBase64
    ) {
      res.status(400).json({
        error:
          "Titulo, descricao, endereco, inicio, fim e imagem sao obrigatorios",
      });
      return;
    }

    const inicioDate = new Date(inicioEm);
    const fimDate = new Date(fimEm);

    if (Number.isNaN(inicioDate.getTime()) || Number.isNaN(fimDate.getTime())) {
      res.status(400).json({ error: "Datas invalidas" });
      return;
    }

    const evento = await prisma.evento.update({
      where: {
        id,
      },
      data: {
        titulo,
        descricao,
        endereco,
        inicioEm: inicioDate,
        fimEm: fimDate,
        encerrado: fimDate < new Date(),
        imagemNome: imagemNome || null,
        imagemBase64,
      },
    });

    res.status(200).json({ message: "Evento atualizado com sucesso", evento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/eventos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await prisma.evento.deleteMany({
      where: {
        id,
      },
    });

    if (result.count === 0) {
      res.status(404).json({ error: "Evento não encontrado" });
      return;
    }

    res.status(200).json({ message: "Evento excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
