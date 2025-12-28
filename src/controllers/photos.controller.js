const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { HttpError } = require("../middleware/httpError");

const PHOTO_SORT_FIELDS = new Set(["createdAt", "title", "id"]);

function parseSort(sort, order) {
  const safeSort = PHOTO_SORT_FIELDS.has(sort) ? sort : "createdAt";
  const safeOrder = order === "asc" ? "asc" : "desc";
  return { [safeSort]: safeOrder };
}

async function listPhotos(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit ?? 10), 50);
    const offset = Math.max(Number(req.query.offset ?? 0), 0);
    const search = (req.query.search ?? "").toString().trim();
    const sort = (req.query.sort ?? "createdAt").toString();
    const order = (req.query.order ?? "desc").toString();
    const albumId = req.query.albumId ? Number(req.query.albumId) : null;

    const where = {};

    if (albumId) where.albumId = albumId;

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { cameraModel: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.photo.findMany({
        where,
        include: { album: true },
        orderBy: parseSort(sort, order),
        take: limit,
        skip: offset,
      }),
      prisma.photo.count({ where }),
    ]);

    res.json({ total, limit, offset, items });
  } catch (err) {
    next(err);
  }
}

async function getPhoto(req, res, next) {
  try {
    const id = Number(req.params.id);

    const photo = await prisma.photo.findUnique({
      where: { id },
      include: { album: true },
    });

    if (!photo) throw new HttpError(404, "Foto niet gevonden");
    res.json(photo);
  } catch (err) {
    next(err);
  }
}

async function createPhoto(req, res, next) {
  try {
    const { title, url, cameraModel, takenAt, albumId } = req.validated.body;

    const album = await prisma.album.findUnique({ where: { id: albumId } });
    if (!album) throw new HttpError(400, "albumId bestaat niet");

    const photo = await prisma.photo.create({
      data: {
        title,
        url,
        cameraModel: cameraModel ?? null,
        takenAt: takenAt ? new Date(takenAt) : null,
        albumId,
      },
      include: { album: true },
    });

    res.status(201).json(photo);
  } catch (err) {
    next(err);
  }
}

async function updatePhoto(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, url, cameraModel, takenAt, albumId } = req.validated.body;

    const exists = await prisma.photo.findUnique({ where: { id } });
    if (!exists) throw new HttpError(404, "Foto niet gevonden");

    const album = await prisma.album.findUnique({ where: { id: albumId } });
    if (!album) throw new HttpError(400, "albumId bestaat niet");

    const photo = await prisma.photo.update({
      where: { id },
      data: {
        title,
        url,
        cameraModel: cameraModel ?? null,
        takenAt: takenAt ? new Date(takenAt) : null,
        albumId,
      },
      include: { album: true },
    });

    res.json(photo);
  } catch (err) {
    next(err);
  }
}

async function deletePhoto(req, res, next) {
  try {
    const id = Number(req.params.id);

    const exists = await prisma.photo.findUnique({ where: { id } });
    if (!exists) throw new HttpError(404, "Foto niet gevonden");

    await prisma.photo.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
