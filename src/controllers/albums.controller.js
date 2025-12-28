const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { HttpError } = require("../middleware/httpError");

const ALBUM_SORT_FIELDS = new Set(["createdAt", "title", "id"]);

function parseSort(sort, order) {
  const safeSort = ALBUM_SORT_FIELDS.has(sort) ? sort : "createdAt";
  const safeOrder = order === "asc" ? "asc" : "desc";
  return { [safeSort]: safeOrder };
}

async function listAlbums(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit ?? 20), 50);
    const offset = Math.max(Number(req.query.offset ?? 0), 0);
    const search = (req.query.search ?? "").toString().trim();
    const sort = (req.query.sort ?? "createdAt").toString();
    const order = (req.query.order ?? "desc").toString();

    const where = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.album.findMany({
        where,
        orderBy: parseSort(sort, order),
        take: limit,
        skip: offset,
      }),
      prisma.album.count({ where }),
    ]);

    res.json({ total, limit, offset, items });
  } catch (err) {
    next(err);
  }
}

async function getAlbum(req, res, next) {
  try {
    const id = Number(req.params.id);

    const album = await prisma.album.findUnique({
      where: { id },
      include: { photos: true },
    });

    if (!album) throw new HttpError(404, "Album niet gevonden");
    res.json(album);
  } catch (err) {
    next(err);
  }
}

async function createAlbum(req, res, next) {
  try {
    const { title, description } = req.validated.body;

    const album = await prisma.album.create({
      data: { title, description: description ?? null },
    });

    res.status(201).json(album);
  } catch (err) {
    next(err);
  }
}

async function updateAlbum(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, description } = req.validated.body;

    const exists = await prisma.album.findUnique({ where: { id } });
    if (!exists) throw new HttpError(404, "Album niet gevonden");

    const album = await prisma.album.update({
      where: { id },
      data: { title, description: description ?? null },
    });

    res.json(album);
  } catch (err) {
    next(err);
  }
}

async function deleteAlbum(req, res, next) {
  try {
    const id = Number(req.params.id);

    const exists = await prisma.album.findUnique({ where: { id } });
    if (!exists) throw new HttpError(404, "Album niet gevonden");

    await prisma.album.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
