const express = require("express");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const controller = require("../controllers/photos.controller");

const router = express.Router();

const photoBodySchema = z.object({
  body: z.object({
    title: z.string().min(2, "title moet minstens 2 karakters hebben"),
    url: z.string().url("url moet een geldige URL zijn"),
    cameraModel: z.string().max(100).optional(),
    takenAt: z
      .string()
      .datetime("takenAt moet ISO datetime zijn (bv. 2025-12-01T10:00:00Z)")
      .optional(),
    albumId: z.coerce
      .number()
      .int()
      .positive("albumId moet een positief getal zijn"),
  }),
  params: z.any(),
  query: z.any(),
});

router.get("/", controller.listPhotos);
router.get("/:id", controller.getPhoto);
router.post("/", validate(photoBodySchema), controller.createPhoto);
router.put("/:id", validate(photoBodySchema), controller.updatePhoto);
router.delete("/:id", controller.deletePhoto);

module.exports = router;
